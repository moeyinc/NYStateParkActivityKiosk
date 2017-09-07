<!-- =================================================
 Vue Template
================================================== -->
<template>
  <article class="general-info">
    <div class="general-top-images" v-if="content.number_of_images === 2">
      <div class="left-image image-frame" :style="setBGImage(getImageStaticFilePath(content.left_image_uri))">
      </div>
      <div class="right-image image-frame" :style="setBGImage(getImageStaticFilePath(content.right_image_uri))">
      </div>
    </div>
    <div class="general-top-images" v-if="content.number_of_images === 1">
      <div class="one-image image-frame" :style="setBGImage(getImageStaticFilePath(content.left_image_uri))">
      </div>
    </div>
    <div class="general-text">
      <section>
        <p v-html="content.raw_html_text">
        </p>
      </section>
    </div>
  </article>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'general-info-article',
  props: {
    content: {
      type: Object
    }
  }
}
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style>
article.general-info {
  font-size: 24px;
  line-height: 40px;
}

article.general-info ol, article.general-info ul {
  -webkit-margin-start: 2em;
}

article.general-info .ql-size-small {
  font-size: 18px;
  line-height: 32px;
}

article.general-info .ql-size-large {
  font-size: 32px;
  line-height: 54px;
}

article.general-info .ql-size-huge {
  font-size: 48px;
  line-height: 72px;
}

</style>

<style scoped>
article {
  height: auto;
  background-color: white;
  padding: 20px 20px 20px 20px;
}

figcaption {
  text-align: center;
  font-size: 20px;
}

div.general-top-images {
  height: 480px;
}

div.general-top-images .left-image {
  height: 100%;
  width: 960px;
  float: left;
  /*margin: 0 20px 0 20px;*/
}

div.general-top-images .right-image {
  height: 100%;
  width: 480px;
  float: right;
}

div.general-top-images .one-image {
  height: 100%;
  width: 100%;
}

div.general-text {
  padding: 40px 20px 20px 20px;
}
</style>
