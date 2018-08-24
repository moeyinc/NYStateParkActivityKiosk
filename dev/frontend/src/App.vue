<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="app">
    <router-view name="page"/>
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
require('@/assets/css/ripple.css');

export default {
  name: 'app',
  mounted() {
    this.resizeComponents();
    window.addEventListener('resize', this.resizeComponents);
  },
  methods: {
    resizeComponents() {
      // calc zoom value
      let zoom;
      const monitorWidth = 1920;
      const monitorHeight = 1080;
      let ratioW = window.innerWidth / monitorWidth;
      let ratioH = window.innerHeight / monitorHeight;
      ratioW < ratioH ? zoom = ratioW : zoom = ratioH;

      // set size object for store.js
      let size = {
        zoom: zoom,
        monitor: {w: monitorWidth, h: monitorHeight},
        window: {w: window.innerWidth, h: window.innerHeight},
        page: {w: window.innerWidth * zoom, h: window.innerHeight * zoom},
      };
      console.log('updating UI size data from app');
      this.$store.commit('updateSize', size);
    },
  },
};
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style lang='stylus'>
@import '../node_modules/reset-css/reset.css'
@import '/stylus/reset-additional'
@import '/stylus/fonts'
@import '/stylus/global-styles'
</style>
