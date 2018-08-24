<!-- //////////////////////////
Home page's Component Tree Structure

root (this)
├ HomeHeader
└ HomeGridMenu
     ├ HomeGridMenuItem
     ├ HomeGridMenuItem
     ├ HomeGridMenuItem
     └ ...

////////////////////////// -->


<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="home-wrapper" @click="displayRipple($event)" :style="getStyle">

    <home-header
      v-if="$store.state.generalSettings && $store.state.activities"/>
    <home-grid-menu
      v-if="$store.state.generalSettings && $store.state.activities"/>

  </div>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import HomeHeader from './HomeHeader.vue';
import HomeGridMenu from './HomeGridMenu.vue';

export default {
  name: 'home',
  components: {
    'home-header': HomeHeader,
    'home-grid-menu': HomeGridMenu,
  },
  created() {
    // load general settings and activity list data from database
    this.$store.dispatch('updateGeneralSettings');

    this.$store.dispatch('updateActivities');
  },
  mounted() {
    // resize this component
    this.resizeWrapper(this.$store.state.size);

    // watch resizing action
    this.$store.watch(this.$store.getters.getSize, (size) => {
      console.log('resizing home wrapper');
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
      const el = document.getElementById('home-wrapper');
      let zoom; let translate;

      if (this.$store.state.isEditing) {
        // if this is a component embedded into Edit
        zoom = size.previewPanel.w / size.monitor.w;
        el.style.left = size.editPanel.w + 'px';
        el.style.top = '47%';

        translate = ' translateY(-50%)';
      } else {
        // if this is a standalone component
        zoom = size.zoom;
        translate = '';
      }

      el.style.transformOrigin = '0 0';
      el.style.transform = 'scale(' + zoom + ')' + translate;
    },
  },
};
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
#home-wrapper {
  position: relative;
  height: 100%;
  letter-spacing: 1px;
  width: 1920px;
  height: 1080px;
}
</style>
