<!-- =================================================
 Vue Template
================================================== -->
<template>
  <nav :style="getNavStyle">
    <ul>
      <detail-left-nav-menu-item
        v-for="activity in sortActivities($store.state.activities)"
        :activity="activity"
        :key="activity.activity_id"
        :relative-position-to-active-tab="getRelativePositionToActiveTab(
          activity.activity_id)">
      </detail-left-nav-menu-item>
    </ul>
    <div
      class="back-to-home-wrapper"
      :style="getMainMenuPos"
      @click="transitPage">
        <div class="triangle-left" :style="getTriangleBGColor"></div>
        <p :style="getMainMenuColor">MAIN MENU</p>
    </div>
  </nav>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import DetailLeftNavMenuItem from './DetailLeftNavMenuItem.vue';
require('@/assets/css/triangle-left.css');

export default {
  name: 'detail-left-nav-menu',
  components: {
    'detail-left-nav-menu-item': DetailLeftNavMenuItem,
  },
  computed: {
    getNavStyle() {
      return {
        'width': '250px',
        'height': '1040px',
        'left': '20px',
        'top': '20px',
        'font-family': 'Avenir-Heavy',
      };
    },
    getTriangleBGColor() {
      return {
        'background-color': this.getColorInString(
          this.$store.state.generalSettings.text_color, false),
      };
    },
    getMainMenuColor() {
      return {
        'color': this.getColorInString(
          this.$store.state.generalSettings.text_color),
      };
    },
    getMainMenuPos() {
      return {
        'margin-left': '22px',
      };
    },
  },
  methods: {
    // check the relative position of a tab to the selected tab
    // to set a rounded corner
    getRelativePositionToActiveTab(tabId) {
      let diff = parseInt(this.$route.params.id) - tabId;
      if (diff === 0) {
        return 'selected';
      } else if (diff === 1) {
        return 'top';
      } else if (diff === -1) {
        return 'bottom';
      } else {
        return 'else';
      }
    },
    transitPage() {
      // change the path based on whether you are editing
      if (this.$store.state.isEditing) {
        // if you are editing, disable the link
        // this.$router.push({ name: 'edit-home' })
      } else {
        this.$router.push({name: 'home'});
      }
    },
  },
};
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
nav {
  position: fixed;
  z-index: 100;
}

div.back-to-home-wrapper {
  width: 100%;
  position: absolute;
  bottom: 20px;
}

div.back-to-home-wrapper p {
  font-size: 20px;
  line-height: 24px;
  margin-left: 30px;
}

.triangle-left {
  float: left;
  margin-top: 5px;
}
</style>
