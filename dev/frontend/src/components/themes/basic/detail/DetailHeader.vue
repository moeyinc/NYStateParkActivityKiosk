<!-- =================================================
 Vue Template
================================================== -->
<template>
  <header>

    <div
      class="titlebar">
      <div class="titlebar-text">
        <h1 :style="getH1Style">
          {{ $store.getters.getSelectedActivity.page_title }}
        </h1>
      </div>
      <div class="icon-wrapper">
        <simple-svg
          :filepath="getImageStaticFilePath(
            $store.getters.getSelectedActivity.icon_uri)"
          :fill="'white'"
          :width="'auto'"
          :height="'100%'"
        />
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
    getH1Style() {
      return {
        'font-family': 'Avenir-Heavy',
        'margin': '38px 0 58px 0',
        'line-height': '80px',
        'font-size': '120px',
      };
    },
    isFirstItemSelected() {
      if (this.$store.getters.getSelectedActivity.activity_id === 1) {
        return true;
      } else {
        false;
      }
    },
    setTopLeftCurve() {
      if (this.isFirstItemSelected) {
        return {
          'border-radius': '0 0 0 0',
        };
      } else {
        return {
          'border-radius': '20px 0 0 0',
        };
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
  position: relative
  z-index: 200

div.titlebar
  height: 176px
  width: 100%
  color: white
  z-index: 400

div.titlebar-text
  height: 100%
  width: 85%
  float: left

div.titlebar .icon-wrapper
  float: right
  width: 15%
  height: 100%
  padding: 10px 30px 30px 30px
  text-align: center

div.titlebar .icon-wrapper svg
  height: 100%
  max-width: 200px
</style>
