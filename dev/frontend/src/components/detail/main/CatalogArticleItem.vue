<!-- =================================================
 Vue Template
================================================== -->
<template>
  <li class="catalog-item">
    <lightbox
      :src="getImageStaticFilePath(catalogItem.item_image_filename)"
      :caption="catalogItem.item_image_caption"
      album="albumCatalog">
      <div
        class="catalog-item-image image-frame"
        :style="setBGImage(getImageStaticFilePath(catalogItem.item_image_filename))">
      </div>
    </lightbox>
    <div class="catalog-item-text">
      <p class="item-title">{{ catalogItem.item_title }}</p>
      <p class="item-detail">{{ catalogItem.item_description }}</p>
    </div>
  </li>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import VueLightbox from 'vue-lightbox'

export default {
  name: 'catalog-article-item',
  components: {
    'lightbox': VueLightbox
  },
  props: {
    catalogItem: {
      type: Object
    }
  }
}
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
li {
  display: inline;
}

li.catalog-item {
  padding-left: 20px;
  padding-right: 20px;
  width: 33.33333%;
  float: left;
  margin-bottom: 20px;
}

li.catalog-item .catalog-item-image {
  overflow: hidden;
  position: relative;
  height: 300px;
}

li.catalog-item .catalog-item-text {
  text-align: center;
  text-align: left;
  margin-top: 10px;
  padding: 0 10px;
}

li.catalog-item .catalog-item-text p.item-title {
  margin-bottom: 5px;
}

li.catalog-item .catalog-item-text p.item-detail {
  height: 94px;
  overflow: hidden;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: 1.5px;
}
</style>
