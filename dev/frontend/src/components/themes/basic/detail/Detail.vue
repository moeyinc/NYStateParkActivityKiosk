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
        'background-color': this.getColorInString(
          this.$store.state.generalSettings.background_color),
        'color': this.getColorInString(
          this.$store.state.generalSettings.text_color),
      };
    },
  },
  methods: {
    resizeWrapper(size) {
      const el = document.getElementById('detail-wrapper');
      let zoom; let translate;

      // if this is a standalone component
      zoom = size.zoom;
      translate = '';

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
      this.$router.push({name: 'home'});
    },
  },
};
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped lang='stylus'>
#detail-wrapper
  position: relative
  height: 100%
  padding: 20px
  width: 1920px
  height: 1080px
</style>
