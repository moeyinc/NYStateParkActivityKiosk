<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div>
    <div
      class="right-wrapper"
      :style="[getBGColor, getSize]">
      <detail-header></detail-header>
      <detail-main />
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
      return {
        left: '290px',
        width: '1610px',
      };
    },
    getBGColor() {
      return {
        'background-color': '',
      };
    },
  },
};
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped lang='stylus'>
div.right-wrapper
  position: fixed
  top: 20px
  height: 1040px
  padding: 20px
  border-radius: 20px 20px 20px 20px
  z-index: 200

div.topleft-edge-curve
  position: absolute
  left: 270px
  width: 20px
  height: 20px
  z-index: 100
</style>
