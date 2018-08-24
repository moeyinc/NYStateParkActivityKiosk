<!-- =================================================
 Vue Template
================================================== -->
<template>
  <li class="gallery-item">
    <div class="image-wrapper image-frame">
      <lightbox
        :src="getImageStaticFilePath(galleryItem.item_image_filename)"
        :caption="galleryItem.item_caption"
        album="albumGallery">
        <img :src="getImageStaticFilePath(galleryItem.item_image_filename)" />
      </lightbox>
    </div>
  </li>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import VueLightbox from 'vue-lightbox';

export default {
  name: 'gallery-article-item',
  components: {
    'lightbox': VueLightbox,
  },
  props: {
    galleryItem: {
      type: Object,
    },
  },
};
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped lang="stylus">
li.gallery-item
  height: 440px
  text-align: center
  margin-bottom: 20px
  padding-left: 20px
  padding-right: 20px
  width: 33.33333%
  float: left
  list-style: none

.gallery-item .image-wrapper
  height: 100%

.gallery-item .image-wrapper img
  width: 100%
  height: 100%
  object-fit: cover
</style>
