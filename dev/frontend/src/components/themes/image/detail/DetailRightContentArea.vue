<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div>
    <div
      class="right-wrapper"
      :style="[getBGColor, getSize]">
      <detail-header></detail-header>
      <detail-sub-nav-menu
        v-if="$store.state.generalSettings.design_theme === 'basic'" />
      <detail-main />
    </div>
    <div
      v-if="$store.state.generalSettings.design_theme === 'basic'"
      class="topleft-edge-curve"
      :style="$store.state.isFirstActivityClicked ?
        {'background-color': 'white'} :
        {'background-color': getColorInString(
            $store.state.activities[0].main_color)}">
    </div>
  </div>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import DetailHeader from './DetailHeader.vue';
import DetailSubNavMenu from './DetailSubNavMenu.vue';
import DetailMain from './main/DetailMain.vue';

export default {
  name: 'detail-right-content-area',
  components: {
    'detail-header': DetailHeader,
    'detail-sub-nav-menu': DetailSubNavMenu,
    'detail-main': DetailMain,
  },
  computed: {
    getSize() {
      let theme = this.$store.state.generalSettings.design_theme;
      if (theme === 'basic') {
        return {
          left: '270px',
          width: '1630px',
        };
      } else if (theme === 'image') {
        return {
          left: '290px',
          width: '1610px',
        };
      }
    },
    getBGColor() {
      let theme = this.$store.state.generalSettings.design_theme;
      if (theme === 'basic') {
        return {
          'background-color': this.getColorInString(
            this.$store.getters.getSelectedActivity.main_color),
        };
      } else if (theme === 'image') {
        return {
          'background-color': '',
        };
      }
    },
  },
};
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
div.right-wrapper {
  position: fixed;
  top: 20px;
  /*left: 270px;
  width: 1630px;*/
  height: 1040px;
  padding: 20px;
  border-radius: 20px 20px 20px 20px;
  z-index: 200;
}

div.topleft-edge-curve {
  position: absolute;
  left: 270px;
  width: 20px;
  height: 20px;
  z-index: 100;
}
</style>
