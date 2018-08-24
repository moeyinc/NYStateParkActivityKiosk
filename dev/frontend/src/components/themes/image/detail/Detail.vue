<!-- //////////////////////////
Detail page's Component Tree Structure

root (this)
├ DetailLeftNavMenu
│ ├ DetailLeftNavMenuItem
│ ├ DetailLeftNavMenuItem
│ └ ...
└ DetailRightContentArea
  ├ DetailHeader
  ├ DetailSubNavMenu
  │ ├ DetailSubNavMenuItem
  │ ├ DetailSubNavMenuItem
  │ └ ...
  └ DetailMain
    ├ VueScrollBar
    ├ GeneralInfoArticle
    ├ LocationsArticle
    ├ CatalogArticle
    │ ├ CatalogArticleItem
    │ ├ CatalogArticleItem
    │ └ ...
    └ GalleryArticle
      ├ CatalogArticleItem
      ├ CatalogArticleItem
      └ ...

////////////////////////// -->


<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div
    id="detail-wrapper"
    @click="[displayRipple($event), resetTimer()]"
    :style="getStyle">

    <detail-left-nav-menu
      v-if="$store.state.generalSettings && $store.state.activities"/>
    <detail-right-content-area
      v-if="$store.state.generalSettings && $store.state.activities"/>

  </div>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import DetailLeftNavMenu from './DetailLeftNavMenu.vue';
import DetailRightContentArea from './DetailRightContentArea.vue';

export default {
  name: 'detail',
  components: {
    'detail-left-nav-menu': DetailLeftNavMenu,
    'detail-right-content-area': DetailRightContentArea,
  },
  data() {
    return {
      screenTimer: null,
    };
  },
  watch: {
    '$route'(to, from) {
      // when the route changes
      // console.log('route changed!!')

      // update selected activity id in the store.js
      this.$store.commit('updateSelectedActivityId', parseInt(to.params.id));

      // update active tab id in the store.js
      this.$store.commit('updateActiveTabId', 1);
    },
  },
  created() {
    // update selected activity id in the store.js
    this.$store.commit(
      'updateSelectedActivityId', parseInt(this.$route.params.id));

    // update active tab id in the store.js
    this.$store.commit('updateActiveTabId', 1);

    // update general settings in the store.js
    this.$store.dispatch('updateGeneralSettings').then(
      () => {
        this.resetTimer();
      }
    );

    // update activities in the store.js
    this.$store.dispatch('updateActivities');
  },
  mounted() {
    // resize this component
    this.resizeWrapper(this.$store.state.size);

    // watch resizing action
    this.$store.watch(this.$store.getters.getSize, (size) => {
      console.log('resizing detail wrapper');
      this.resizeWrapper(size);
    });
  },
  computed: {
    getStyle() {
      if (!this.$store.state.generalSettings) return;
      return {
        'background-image': 'url(' + this.getImageStaticFilePath(
          this.$store.state.generalSettings.bg_image_detail_uri) + ')',
        'background-repeat': 'no-repeat',
        'background-size': '1920px 1080px',
        'color': this.getColorInString(
          this.$store.state.generalSettings.text_color),
      };
    },
  },
  methods: {
    resizeWrapper(size) {
      const el = document.getElementById('detail-wrapper');
      let zoom; let translate;

      if (this.$store.state.isEditing) {
        // if this is a component embedded into Edit
        zoom = size.previewPanel.w / size.monitor.w;
        el.style.left = size.editPanel.w + 'px';
        el.style.top = '47%';

        translate = ' translateY(-50%)';
        console.log(translate);
      } else {
        // if this is a standalone component
        zoom = size.zoom;
        translate = '';
      }

      el.style.transformOrigin = '0 0';
      el.style.transform = 'scale(' + zoom + ')' + translate;
    },
    resetTimer() {
      console.log('resetting timer');
      clearTimeout(this.screenTimer);
      this.screenTimer = setTimeout(this.goHomeScreen,
        this.$store.state.generalSettings.timeout_in_second * 1000);
    },
    goHomeScreen() {
      // change the path based on whether you are editing
      if (this.$store.state.isEditing) {
        // if you are editing, disable the link
      } else {
        this.$router.push({name: 'home'});
      }
    },
  },
};
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
#detail-wrapper {
  position: relative;
  height: 100%;
  padding: 20px;
  width: 1920px;
  height: 1080px;
}
</style>
