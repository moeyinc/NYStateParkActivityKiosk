<!-- =================================================
 Vue Template
================================================== -->
<template>
  <article class="catalog">
    <div class="clearfix catalog-description">
      <div class="clearfix catalog-title">
        <h2 :style="{'color': getColorInString(
          $store.getters.getSelectedActivity.main_color)}">
          {{ content.page_title }}
        </h2>
      </div>
      <div class="clearfix catalog-text" v-html="content.page_description">
      </div>
    </div>
    <div class="clearfix catalog-images">
      <ul>
        <catalog-article-item
          v-for="catalogItem in content.items"
          :key="catalogItem.item_id"
          :catalog-item="catalogItem">
        </catalog-article-item>
      </ul>
    </div>
  </article>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import CatalogArticleItem from './CatalogArticleItem';

export default {
  name: 'catalog-article',
  components: {
    'catalog-article-item': CatalogArticleItem,
  },
  props: {
    content: {
      type: Object,
      // ex)
      // {"activity_id" : 1,
      // "subnav_id" : 1,
      // "subnav_label" : "GENERAL INFO",
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
<style lang="stylus">
article.catalog
  font-size: 24px
  line-height: 40px

article.catalog .catalog-description ol,
article.catalog .catalog-description ul
  -webkit-margin-start: 2em

article.catalog .ql-size-small
  font-size: 18px
  line-height: 32px

article.catalog .ql-size-large
  font-size: 32px
  line-height: 54px

article.catalog .ql-size-huge
  font-size: 48px
  line-height: 72px

article.catalog div.catalog-text p
  padding: 20px 20px 0 20px
</style>

<style scoped lang="stylus">
article
  height: auto
  background-color: white

figcaption
  text-align: center
  font-size: 20px

div.clearfix.catalog-description
  padding: 0 20px 20px 20px

div.catalog-title
  padding-left: 20px

div.catalog-title h2
  font-size: 36px
  font-family: "Avenir-Heavy"
  margin-top: 20px
  margin-bottom: 10px

div.catalog-images
  margin: 20px
  padding-bottom: 20px
</style>
