<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div>
    <div
      class="content-foundation"
      :style="[getBorderRadius, getFoundationHeight]">
        <vue-scrollbar ref="Scrollbar" class="content-wrapper" :style="getWrapperHeight">
          <main role="main">
            <general-info-article
              v-if="isActiveContentTemplate('GENERAL INFO')"
              :content="$store.getters.getActiveTabContent">
            </general-info-article>
            <location-article
              v-if="isActiveContentTemplate('LOCATIONS')"
              :content="$store.getters.getActiveTabContent">
            </location-article>
            <catalog-article
              v-if="isActiveContentTemplate('CATALOG')"
              :content="$store.getters.getActiveTabContent">
            </catalog-article>
            <gallery-article
              v-if="isActiveContentTemplate('GALLERY')"
              :content="$store.getters.getActiveTabContent">
            </gallery-article>
            <span class="hidden-scroll-button up"></span>
            <span class="hidden-scroll-button down"></span>
          </main>
        </vue-scrollbar>
    </div>
    <div
      class="topleft-edge-curve"
      :style="{'background-color': getColorInString($store.getters.getSelectedActivity.sub_color)}">
    </div>
  </div>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import GeneralInfoArticle from './GeneralInfoArticle.vue'
import LocationsArticle   from './LocationsArticle.vue'
import CatalogArticle     from './CatalogArticle.vue'
import GalleryArticle     from './GalleryArticle.vue'
import VueScrollbar       from './scrollbar/vue-scrollbar.vue'
require('@/assets/css/vue2-scrollbar.css')

export default {
  name: 'detail-main',
  components: {
    'general-info-article': GeneralInfoArticle,
    'location-article'    : LocationsArticle,
    'catalog-article'     : CatalogArticle,
    'gallery-article'     : GalleryArticle,
    VueScrollbar
  },
  data () {
    return {
      position: {scrollTop: 0, scrollLeft: 0}
    }
  },
  computed: {
    getBorderRadius () {
      let theme = this.$store.state.generalSettings.design_theme
      if (theme === 'basic') {
        if (this.$store.state.activeTabId === 1) {
          return {
            'border-radius': '0px 20px 20px 20px'
          }
        } else {
          return {
            'border-radius': '20px 20px 20px 20px'
          }
        }
      } else if (theme === 'image') {
        return
      }
    },
    getFoundationHeight () {
      let theme = this.$store.state.generalSettings.design_theme
      if (theme === 'basic') {
        return {
          height: '752px'
        }
      } else if (theme === 'image') {
        return {
          height: '822px'
        }
      }
    },
    getWrapperHeight () {
      let theme = this.$store.state.generalSettings.design_theme
      if (theme === 'basic') {
        return {
          height: '712px'
        }
      } else if (theme === 'image') {
        return {
          height: '782px'
        }
      }
    }
  },
  methods: {
    isActiveContentTemplate (_type) {
      if (this.$store.getters.getActiveTabContent.template_type === _type) {
        return true
      }
      return false
    },
    resetScrollbarPos () {
      console.log('reset scrollbar position')
      this.$refs.Scrollbar.scrollToY(0)
      this.$refs.Scrollbar.calculateSize()
    }
  },
  updated () {
    this.$refs.Scrollbar.scrollToY(0)
    this.resetScrollbarPos()
  }
}
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
.content-foundation {
  padding: 20px;
  background-color: white;
  position: relative;
  z-index: 400;
}

.content-wrapper {
  margin-right: 20px;
  width: 100%;
}

main {
  padding-right: 30px;
}

div.topleft-edge-curve {
  position: absolute;
  top: 268px;
  width: 20px;
  height: 20px;
  z-index: 300;
}
</style>
