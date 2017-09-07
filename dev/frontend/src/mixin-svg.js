import jQuery from 'jquery'

export default {
  methods: {
    generateInlineSVG (el) {
      // remove the existing svg tag
      this.removeImgTag(el)

      // append a new img tag
      this.appendImgTag(el)

      // replace the image tag with a inline svg
      this.replaceImgTag(el)
    },
    // remove the existing svg tag
    removeImgTag (el) {
      let svg = el.getElementsByClassName('svg')[0]
      if (svg) {
        el.removeChild(svg)
      }
    },
    // append a new img tag
    appendImgTag (el) {
      let img = document.createElement('img')
      img.src = this.getImageAssetFilePath(this.img)
      img.style.width = this.width - this.padding * 2 + 'px'
      img.style.height = this.height - this.padding * 2 + 'px'
      img.classList.add('svg')
      el.appendChild(img)
    },
    // replace the image tag with a inline svg
    replaceImgTag (el) {
      let img = el.getElementsByClassName('svg')[0]
      img.style.fill = this.regularFillColor
      let w   = this.width  - this.padding * 2
      let h   = this.height - this.padding * 2
      this.replaceWithSVG(img, w, h)
    },
    replaceWithSVG (img, imgWidth, imgHeight) {
      let $img     = jQuery(img)
      let imgID    = $img.attr('id')
      let imgClass = $img.attr('class')
      let imgStyle = $img.attr('style')
      let imgURL   = $img.attr('src')

      jQuery.get(imgURL, function (data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg')

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID)
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg')
        }
        // Add replaced image's style to the new SVG
        if (typeof imgStyle !== 'undefined') {
          $svg = $svg.attr('style', imgStyle)
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a')

        // Check if the viewport is set, if the viewport is not set the SVG won't scale.
        if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
          $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }

        $svg.attr('width', imgWidth + 'px')
        $svg.attr('height', imgHeight + 'px')

        // Replace image with new SVG
        $img.replaceWith($svg)
      }, 'xml')
    }
  }
}
