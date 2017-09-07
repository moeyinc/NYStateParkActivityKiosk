<!-- =================================================
 Vue Template
================================================== -->
<template>
  <section class="activity-list-wrapper">
    <h2>
      Activities:
    </h2>
    <div class="activity-list-container">
      <transition-group name="change-order" tag="ul" class="activity-list">
        <activity-list-item
          v-for="activity in sortActivities($store.state.activities)"
          :activity="activity"
          :key="activity._id"
          @change-order="changeOrder">
        </activity-list-item>
      </transition-group>
      <div class="add-activity" @click="addActivity" v-if="withinLimitNum">
        <p>
          ADD A NEW ACTIVITY
        </p>
      </div>
    </div>
    <confirm-modal
      v-if="$store.state.modals.removeActivity"
      @close-modal="closeRemoveActivityModal"
      @execute-command="removeActivity"
      >
      <h3 slot="header">Removing An Activity</h3>
      <p slot="body">The activity will be removed from the list with its content. To undo it, reload the page before submitting changes.</p>
      <p slot="cancel-button">CANCEL</p>
      <p slot="execute-button">REMOVE</p>
    </confirm-modal>
  </section>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import ActivityListItem from './ActivityListItem.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

export default {
  name: 'activity-list',
  components: {
    'activity-list-item': ActivityListItem,
    'confirm-modal': ConfirmModal
  },
  created () {
  },
  computed: {
    withinLimitNum () {
      let total = this.$store.state.activities.length
      if (total >= 15) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    changeOrder (id, value) {
      // check the index and value
      const minIndex = 1
      const maxIndex = this.$store.state.activities.length
      if (id <= minIndex && value === -1) {
        console.log('canceled decreasing order because it is at the top of the list')
        return
      } else if (id >= maxIndex && value === 1) {
        console.log('canceled increasing order because it is at the bottom of the list')
        return
      }

      this.$store.commit('changeActivityOrder', {act_id: id, value: value})
    },
    addActivity () {
      this.$store.commit('addActivity')
    },
    closeRemoveActivityModal () {
      // close the remove activity modal window
      this.$store.commit('updateModals', {key: 'removeActivity', value: false})
    },
    removeActivity () {
      this.$store.commit('removeActivity')

      // close the remove activity modal window
      this.$store.commit('updateModals', {key: 'removeActivity', value: false})
    }
  }
}
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
section.activity-list-wrapper {
  margin-bottom: 20px;
}

section.activity-list-wrapper h2 {
  font-size: 24px;
  margin: 10px 0;
}

section.activity-list-wrapper {
  padding: 5px 0;
  width: 100%;
}

.activity-list-container {
  padding: 5px;
}

.change-order-move {
  transition: transform 1s;
}

/*.change-order-enter, .change-order-leave-to {
  transition: transform 1s;
}*/

.change-order-enter-active, .change-order-leave-active {
  transition: all 1s;
}
.change-order-enter, .change-order-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  /*transform: translateY(30px);*/
}


.add-activity {
  background-color: black;
  color: white;
  text-align: center;
  /*margin-left: 30px;
  margin-right: 10px;*/
  cursor: pointer;
  padding: 20px 0;
}

.add-activity:hover {
  background-color: #FFD12A;
}
</style>
