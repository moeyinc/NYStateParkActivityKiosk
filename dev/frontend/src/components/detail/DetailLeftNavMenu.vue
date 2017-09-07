<!-- =================================================
 Vue Template
================================================== -->
<template>
  <nav>
    <ul>
      <detail-left-nav-menu-item
        v-for="activity in sortActivities($store.state.activities)"
        :activity="activity"
        :key="activity.activity_id"
        :relative-position-to-active-tab="getRelativePositionToActiveTab(activity.activity_id)">
      </detail-left-nav-menu-item>
    </ul>
    <div
      class="back-to-home-wrapper"
      @click="transitPage">
        <div class="triangle-left" :style="{'background-color': getColorInString($store.state.generalSettings.text_color, false)}"></div>
        <p :style="{'color': getColorInString($store.state.generalSettings.text_color)}">MAIN MENU</p>
    </div>
  </nav>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import DetailLeftNavMenuItem from './DetailLeftNavMenuItem.vue'
require('@/assets/css/triangle-left.css')

export default {
  name: 'detail-left-nav-menu',
  components: {
    'detail-left-nav-menu-item': DetailLeftNavMenuItem
  },
  methods: {
    // check the relative position of a tab to the selected tab to set a rounded corner
    getRelativePositionToActiveTab (tabId) {
      let diff = parseInt(this.$route.params.id) - tabId
      if (diff === 0) {
        return 'selected'
      } else if (diff === 1) {
        return 'top'
      } else if (diff === -1) {
        return 'bottom'
      } else {
        return 'else'
      }
    },
    transitPage () {
      // change the path based on whether you are editing
      if (this.$store.state.isEditing) {
        // if you are editing, disable the link
        // this.$router.push({ name: 'edit-home' })
      } else {
        this.$router.push({ name: 'home' })
      }
    }
  }
}
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
nav {
  width: 250px;
  height: 1040px;
  position: fixed;
  left: 20;
  top: 20;
  z-index: 100;
  font-family: "Avenir-Heavy";
}

div.back-to-home-wrapper {
  width: 100%;
  position: absolute;
  bottom: 20px;
  margin-left: 22px;
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
