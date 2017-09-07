<!-- =================================================
 Vue Template
================================================== -->
<template>
  <header class="clearfix">
    <div class="title">
      <h1>{{ $store.state.generalSettings.kiosk_title }}</h1>
    </div>
    <div class="statepark-logo">
      <img :src="getImageAssetFilePath('ParksLogoLockupIndigo.png')">
    </div>
  </header>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'home-header'
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
header {
  border: 0;
  height: 226px;
  width: 1920px;
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px 20px 0 55px;
}

div.title {
  height: 100%;
  width: 1345px;
  float: left;
}

div.title h1 {
  margin: 58px 0px;
  line-height: 100px;
  font-size: 128px;
  font-family: "Avenir-Heavy";
}

div.statepark-logo {
  height: 100%;
  float: right;
  margin: 0px;
}

div.statepark-logo img {
  width: 500px;
}
</style>
