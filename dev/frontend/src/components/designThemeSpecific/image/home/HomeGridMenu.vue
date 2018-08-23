<!-- =================================================
 Vue Template
================================================== -->
<template>
  <main role="main" :style="getMainStyle">
    <ul>
      <home-grid-menu-item
        v-for="activity in sortActivities($store.state.activities)"
        :activity="activity"
        :key="activity._id"
        :total="$store.state.activities.length">
      </home-grid-menu-item>
    </ul>
  </main>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import HomeGridMenuItem from './HomeGridMenuItem.vue';

export default {
  name: 'home-grid-menu',
  components: {
    'home-grid-menu-item': HomeGridMenuItem,
  },
  computed: {
    getMainStyle() {
      let total = this.$store.state.activities.length;
      let theme = this.$store.state.generalSettings.design_theme;
      let top; let height; let padding;

      if (theme === 'basic') {
        top = '226px';
        height = '854px';

        switch (total) {
          case 3:
            padding = '139px 210px';
            break;
          case 4:
            padding = '67px 360px';
            break;
          case 5:
          case 6:
            padding = '67px 210px';
            break;
          case 7:
          case 8:
            padding = '67px 70px';
            break;
          case 9:
            padding = '31px 210px';
            break;
          case 10:
          case 11:
          case 12:
            padding = '31px 70px';
            break;
          case 13:
          case 14:
          case 15:
            padding = '31px 35px';
            break;
        }
      } else if (theme === 'image') {
        top = '400px';
        height = '680px';

        switch (total) {
          case 3:
            padding = '139px 292.5px';
            break;
          case 4:
            padding = '139px 66px';
            break;
          case 5:
          case 6: //
            padding = '38.5px 292.5px';
            break;
          case 7:
          case 8: //
            padding = '38.5px 66px';
            break;
          case 9:
            padding = '31px 210px';
            break;
          case 10:
          case 11:
          case 12:
            padding = '31px 70px';
            break;
          case 13:
          case 14:
          case 15:
            padding = '31px 35px';
            break;
        }
      }

      return {
        top: top,
        height: height,
        padding: padding,
      };
    },
  },
};
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
main {
  position: absolute;
  /*top: 226px;*/
  /*padding: 25px 70px 37px 70px;*/
  /*height: 854px;*/
}
</style>
