<!-- =================================================
 Vue Template
================================================== -->
<template>
  <nav :style="{'background-color': getColorInString(
    $store.getters.getSelectedActivity.main_color)}">
    <ul :style="{'background-color': getColorInString(
      $store.getters.getSelectedActivity.main_color)}">
      <detail-sub-nav-menu-item
        v-for="content in sortContents(
          $store.getters.getSelectedActivity.contents)"
        :content="content"
        :key="content.subnav_id"
        :relative-position-to-active-tab="getRelativePositionToActiveTab(
          content.subnav_id)"
        @switch-tab="switchTab">
      </detail-sub-nav-menu-item>
    </ul>
  </nav>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import DetailSubNavMenuItem from './DetailSubNavMenuItem';

export default {
  name: 'detail-sub-nav-menu',
  components: {
    'detail-sub-nav-menu-item': DetailSubNavMenuItem,
  },
  computed: {
    isFirstTabActive() {
      if (this.$store.state.activeTabId === 1) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    // check the relative position of a tab to the selected tab
    getRelativePositionToActiveTab(tabId) {
      let diff = this.$store.state.activeTabId - tabId;
      if (diff === 0) {
        return 'selected';
      } else if (diff === 1) {
        return 'left';
      } else if (diff === -1) {
        return 'right';
      } else {
        return 'else';
      }
    },
    switchTab(tabId) {
      // update active tab id in the store.js
      this.$store.commit('updateActiveTabId', tabId);
    },
  },
};
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
nav {
  position: relative;
  height: 72px;
  width: 1590px;
  z-index: 300;
  font-family: "Avenir-Heavy";
}

ul {
  list-style: none;
}
</style>
