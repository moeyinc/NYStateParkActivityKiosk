<!-- =================================================
 Vue Template
================================================== -->
<template>
  <main role="main" :style="getPadding">
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
import HomeGridMenuItem from './HomeGridMenuItem.vue'

export default {
  name: 'home-grid-menu',
  components: {
    'home-grid-menu-item': HomeGridMenuItem
  },
  computed: {
    getPadding () {
      let total = this.$store.state.activities.length
      if (total === 4) {
        return {
          padding: '67px 360px'
        }
      } else if (total >= 5 && total <= 6) {
        return {
          padding: '67px 210px'
        }
      } else if (total >= 7 && total <= 8) {
        return {
          padding: '67px 70px'
        }
      } else if (total === 9) {
        return {
          padding: '31px 210px'
        }
      } else if (total >= 10 && total <= 12) {
        return {
          padding: '31px 70px'
        }
      } else if (total >= 13 && total <= 15) {
        return {
          padding: '31px 35px'
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
main {
  position: absolute;
  top: 226px;
  /*padding: 25px 70px 37px 70px;*/
  height: 854px;
}
</style>
