<!-- =================================================
 Vue Template
================================================== -->
<template>
  <header :style="getHeaderStyle">
    <div class="title">
      <h1 :style="getH1Style">
        {{ $store.state.generalSettings.kiosk_title }}
        <br v-if="$store.state.generalSettings.design_theme==='image'" />
        <span v-if="$store.state.generalSettings.design_theme==='image'">
          {{ $store.state.generalSettings.kiosk_title_2 }}
        </span>
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
      if (this.$store.state.generalSettings.design_theme === 'basic') {
        return {
          'height': '226px',
        };
      } else if (this.$store.state.generalSettings.design_theme === 'image') {
        return {
          'height': '400px',
        };
      }
    },
    getH1Style() {
      if (this.$store.state.generalSettings.design_theme === 'basic') {
        return {
          'font-family': 'Avenir-Heavy',
          'margin': '58px 0px',
          'line-height': '100px',
          'font-size': '128px',
        };
      } else if (this.$store.state.generalSettings.design_theme === 'image') {
        return {
          'font-family': 'Agenda-Bold',
          'margin': '29px 0px 58px 0px',
          'line-height': '160px',
          'font-size': '180px',
          'letter-spacing': '-3px',
        };
      }
    },
    showLogo() {
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
<style scoped>
header {
  border: 0;
  /*height: 226px;*/
  width: 1920px;
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px 20px 0 55px;
}

div.title {
  height: 100%;
  /*width: 1345px;*/
  width: 1800px;
  float: left;
}

div.title h1 {
}

div.statepark-logo {
  height: 100%;
  margin: 0px;
  position: absolute;
  right: 20px;
}

div.statepark-logo img {
  width: 500px;
}
</style>
