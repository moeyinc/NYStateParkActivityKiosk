export default {
  methods: {
    // generate a filepath for webpack
    getImageAssetFilePath (filename) {
      return require('@/assets/imgs/' + filename)
    },
    // generate a filepath for webpack
    getImageStaticFilePath (filename) {
      return '/static/imgs/' + filename
    },
    // check if the data is already set
    isDataSet (key, value, componentName) {
      console.log('---- in isDataSet() -----------------------')
      console.log('* called by a component named \'' + componentName + '\'')
      console.log('* key: ' + key)
      console.log('* value: ' + value)
      if (value !== undefined && value !== null) {
        console.log('* true returned')
        console.log('-------------------------------------------')
        return true
      }
      console.log('* false returned')
      console.log('-------------------------------------------')
      return false
    },
    getColorInString (colorObject, opacity) {
      let colorString = 'rgba('
      colorString += colorObject.rgba.r
      colorString += ', '
      colorString += colorObject.rgba.g
      colorString += ', '
      colorString += colorObject.rgba.b
      colorString += ', '
      if (opacity === false) {
        colorString += 1.0
      } else {
        colorString += colorObject.rgba.a
      }
      colorString += ')'
      return colorString
    },
    sortActivities (_activities) {
      // sort activities in ascending order
      let activities = _activities.slice(0)
      activities.sort(function (a, b) {
        if (a.activity_id < b.activity_id) return -1
        if (a.activity_id > b.activity_id) return 1
        return 0
      })
      return activities
    },
    sortContents (_contents) {
      // sort contents in ascending order
      let contents = _contents.slice(0)
      contents.sort(function (a, b) {
        if (a.subnav_id < b.subnav_id) return -1
        if (a.subnav_id > b.subnav_id) return 1
        return 0
      })
      return contents
    },
    sortSections (_sections) {
      // sort sections in ascending order
      let sections = _sections.slice(0)
      sections.sort(function (a, b) {
        if (a.section_id < b.section_id) return -1
        if (a.section_id > b.section_id) return 1
        return 0
      })
      return sections
    },
    sortItems (_items) {
      // sort items in ascending order
      let items = _items.slice(0)
      items.sort(function (a, b) {
        if (a.item_id < b.item_id) return -1
        if (a.item_id > b.item_id) return 1
        return 0
      })
      return items
    },
    sortMediaItems (_items) {
      // sort media items in decending order
      let items = _items.slice(0)
      items.sort(function (a, b) {
        if (a.timestamp < b.timestamp) return 1
        if (a.timestamp > b.timestamp) return -1
        return 0
      })
      return items
    },
    setBGImage (uri) {
      return {
        'background-image': 'url("' + uri + '")',
        'background-repeat': 'no-repeat',
        'background-position': 'center center',
        'background-size': 'cover'
      }
    },
    // display ripple effect at mouse-clicked position
    displayRipple (event) {
      if (window !== window.top) {
        // invalid if it's called from an embedded page in iframe
        return
      }

      // remove old repple element
      const oldRippleElement = document.getElementById('ripple')
      if (oldRippleElement) {
        oldRippleElement.parentNode.removeChild(oldRippleElement)
      }

      // calc ripple position
      const rippleRadius = 15
      let posX = event.clientX - rippleRadius
      let posY = event.clientY - rippleRadius
      // console.log('window width: ' + window.innerWidth + ', mouse X: ' + event.clientX + ', posX: ' + posX)
      // console.log('window height: ' + window.innerHeight + ', mouse Y: ' + event.clientY + ', posY: ' + posY)

      // create new ripple element
      const newRippleElement = document.createElement('span')
      newRippleElement.id           = 'ripple'
      newRippleElement.style.width  = (rippleRadius * 2) + 'px'
      newRippleElement.style.height = (rippleRadius * 2) + 'px'
      newRippleElement.style.left   = posX + 'px'
      newRippleElement.style.top    = posY + 'px'

      const appElement = document.getElementById('app')
      appElement.appendChild(newRippleElement)

      newRippleElement.classList.add('rippleEffect')
    }
  }
}
