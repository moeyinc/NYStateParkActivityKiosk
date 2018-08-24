<!-- =================================================
 Vue Template
================================================== -->
<template>
  <article class="gallery">
    <div class="clearfix gallery-container">
      <ul>
        <gallery-article-item
          v-for="galleryItem in content.items"
          :key="galleryItem.item_id"
          :gallery-item="galleryItem">
        </gallery-article-item>
      </ul>
    </div>
  </article>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import GalleryArticleItem from './GalleryArticleItem';

export default {
  name: 'gallery-article',
  components: {
    'gallery-article-item': GalleryArticleItem,
  },
  props: {
    content: {
      type: Object,
      // ex)
      // {"activity_id" : 1,
      // "subnav_id" : 1,
      // "subnav_label" :
      // "GENERAL INFO",
      // "template_type" : "GENERAL INFO",
      // "articles": [
      // {"article_id": 1,
      // "left_image_uri" : "",
      // "right_image_uri" : "",
      // "raw_html_text" : "</p>......</p>"}]}
    },
  },
};
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
article {
  height: auto;
  background-color: white;
  padding: 20px;
}

figcaption {
  text-align: center;
  font-size: 20px;
}
</style>
