<!-- =================================================
 Vue Template
================================================== -->
<template>
  <header :style="getHeaderStyle">
    <div class="title">
      <h1 :style="getH1Style">
        {{ $store.state.generalSettings.kiosk_title }}
      </h1>
    </div>
    <div
      class="statepark-logo"
      v-if="showLogo">
      <img :src="getImageStaticFilePath(
        $store.state.generalSettings.park_logo_uri)">
    </div>
  </header>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'home-header',
  computed: {
    getHeaderStyle() {
      return {
        'height': '226px',
      };
    },
    getH1Style() {
      return {
        'font-family': 'Avenir-Heavy',
        'margin': '58px 0px',
        'line-height': '100px',
        'font-size': '128px',
      };
    },
    showLogo() {
      if (!this.$store.state.generalSettings) return;
      if (this.$store.state.generalSettings.show_logo === 'on') {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped lang='stylus'>
header
  border: 0
  width: 1920px
  position: absolute
  top: 0
  left: 0
  padding: 20px 20px 0 55px

div.title
  height: 100%
  width: 1800px
  float: left

div.statepark-logo
  height: 100%
  margin: 0px
  position: absolute
  right: 20px

div.statepark-logo img
  width: 500px
</style>
