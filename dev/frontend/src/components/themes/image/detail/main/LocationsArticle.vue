<!-- =================================================
 Vue Template
================================================== -->
<template>
  <article class="locations">
    <section
      v-for="section in content.sections"
      :key="section.section_id"
      class="clearfix">
        <div class="clearfix course-title">
          <h2
            :style="{'color': getColorInString(
              $store.getters.getSelectedActivity.main_color)}">
              {{section.section_title}}
            </h2>
        </div>
        <div class="clearfix course-content">
          <div
            :class="{
              'left-text': section.number_of_images >= 1,
              'only-text': section.number_of_images === 0}"
            v-html="section.raw_html_text">
          </div>
          <div class="right-image" v-if="section.number_of_images >= 1">
            <lightbox
              :src="getImageStaticFilePath(section.map_image_filename)"
              :caption="section.section_title"
              :album="section.section_title">
              <div
                class="clearfix course-map-image image-frame"
                :style="setBGImage(getImageStaticFilePath(
                  section.map_image_filename))">
              </div>
            </lightbox>
            <div
              class="clearfix course-photo"
              v-if="section.number_of_images >= 2">
              <div
                :class="{
                  'center': section.number_of_images === 2,
                  'left': section.number_of_images === 3}">
                <lightbox
                  :src="getImageStaticFilePath(section.ref_1_image_filename)"
                  :caption="section.section_title"
                  :album="section.section_title">
                  <div
                    class="image-frame course-photo-item"
                    :style="setBGImage(getImageStaticFilePath(
                      section.ref_1_image_filename))">
                  </div>
                </lightbox>
              </div>
              <div class="right" v-if="section.number_of_images === 3">
                <lightbox
                  :src="getImageStaticFilePath(section.ref_2_image_filename)"
                  :caption="section.section_title"
                  :album="section.section_title">
                  <div
                    class="image-frame course-photo-item"
                    :style="setBGImage(getImageStaticFilePath(
                      section.ref_2_image_filename))">
                  </div>
                </lightbox>
              </div>
            </div>
          </div>
        </div>
    </section>
  </article>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import VueLightbox from 'vue-lightbox';

export default {
  name: 'location-article',
  components: {
    'lightbox': VueLightbox,
  },
  props: {
    content: {
      type: Object,
    },
  },
};
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style>
article.locations {
  font-size: 24px;
  line-height: 40px;
}

article.locations .course-content ol, article.locations .course-content ul {
  -webkit-margin-start: 2em;
}

article.locations .ql-size-small {
  font-size: 18px;
  line-height: 32px;
}

article.locations .ql-size-large {
  font-size: 32px;
  line-height: 54px;
}

article.locations .ql-size-huge {
  font-size: 48px;
  line-height: 72px;
}
</style>
<style scoped>
article {
  height: auto;
  background-color: white;
}

h2 {
  margin-top: 20px;
  margin-bottom: 10px;
}

figcaption {
  text-align: center;
  font-size: 20px;
}

section {
  padding: 0 20px 20px 20px;
}

div.course-title {
  padding-left: 20px;
}

div.course-title h2 {
  font-size: 36px;
  font-family: "Avenir-Heavy";
}

div.course-content .left-text {
  padding: 20px;
  width: 60%;
  float: left;
}

div.course-content .only-text {
  padding: 20px;
  width: 100%;
}

div.course-content .right-image {
  padding: 20px 0 20px 20px;
  width: 40%;
  float: left;
}

div.course-content .right-image .course-map-image {
  margin-bottom: 20px;
  height: 360px;
}

div.course-content .right-image .course-photo div.center {
  width: 100%;
  height: 360px;
}

div.course-content .right-image .course-photo div.left {
  padding-right: 10px;
  width: 50%;
  float: left;
  height: 180px;
}

div.course-content .right-image .course-photo div.right {
  padding-left: 10px;
  width: 50%;
  float: right;
  height: 180px;
}

div.course-content .right-image .course-photo .course-photo-item {
  height: 100%;
}

</style>
