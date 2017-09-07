<!-- =================================================
 Vue Template
================================================== -->
<template>
  <header>

    <div
      class="titlebar"
      :style="{'background-color': getColorInString($store.getters.getSelectedActivity.main_color)}">
      <div class="titlebar-text">
        <h1>{{ $store.getters.getSelectedActivity.page_title }}</h1>
      </div>
      <div class="icon-wrapper">
        <img :src="getImageStaticFilePath($store.getters.getSelectedActivity.white_icon_uri)" />
      </div>
    </div>

  </header>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'detail-header',
  computed: {
    isFirstItemSelected () {
      if (this.$store.getters.getSelectedActivity.activity_id === 1) {
        return true
      } else {
        false
      }
    },
    setTopLeftCurve () {
      if (this.isFirstItemSelected) {
        return {
          'border-radius': '0 0 0 0'
        }
      } else {
        return {
          'border-radius': '20px 0 0 0'
        }
      }
    }
  }
}
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
header {
  position: relative;
  z-index: 200;
}

div.titlebar {
  height: 176px;
  width: 1590px;
  color: white;
  z-index: 400;
  font-family: "Avenir-Heavy";
}

div.titlebar-text {
  height: 100%;
  width: 85%;
  float: left;
}

div.titlebar-text h1 {
  margin: 38px 0 58px 0;
  padding-left: 40px;
  line-height: 80px;
  font-size: 120px;
}

div.titlebar .icon-wrapper {
  float: right;
  width: 15%;
  height: 100%;
  padding: 10px 30px 30px 30px;
  text-align: center;
}

div.titlebar .icon-wrapper img {
  height: 100%;
}
</style>
