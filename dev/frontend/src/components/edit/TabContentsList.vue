<!-- =================================================
 Vue Template
================================================== -->
<template>
  <section class="tab-contents-list-wrapper">
    <h2>
      Tab Contents:
    </h2>
    <transition-group name="change-order" tag="ul" class="tab-list">
      <tab-contents-list-item
        v-for="content in sortContents(
          $store.getters.getSelectedActivity.contents)"
        :content="content"
        :activity="$store.getters.getSelectedActivity"
        :key="content._id">
      </tab-contents-list-item>
    </transition-group>
    <div class="add-content" v-if="checkTabNum" v-show="$store.state.moey">
      <p>
        ADD A NEW TAB
      </p>
      <select @change="addContent($event)" id="add-content-selector">
        <option value="" selected="selected">Please select one</option>
        <option value="GENERAL INFO">GENERAL INFO</option>
        <option value="LOCATIONS">LOCATIONS</option>
        <option value="CATALOG">CATALOG</option>
        <option value="GALLERY">GALLERY</option>
      </select>
    </div>
    <confirm-modal
      v-if="$store.state.modals.removeTab"
      @close-modal="closeRemoveTabModal"
      @execute-command="removeTab"
      >
      <h3 slot="header">Removing A Tab</h3>
      <p slot="body">The tab will be removed from the list with its content.
        To undo it, reload the page before submitting changes.</p>
      <p slot="cancel-button">CANCEL</p>
      <p slot="execute-button">REMOVE</p>
    </confirm-modal>
  </section>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import TabContentsListItem from './TabContentsListItem.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';

export default {
  name: 'tab-contents-list',
  components: {
    'tab-contents-list-item': TabContentsListItem,
    'confirm-modal': ConfirmModal,
  },
  created() {
  },
  computed: {
    checkTabNum() {
      let activity = this.$store.getters.getSelectedActivity;
      if (activity.contents.length < 4) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    addContent(e) {
      console.log(e.target.value);
      if (e.target.value === '') {
        return;
      }

      let data = {};
      let activity = this.$store.getters.getSelectedActivity;
      data.act_id = activity.activity_id;
      data.tab_id = activity.contents.length + 1;

      data.templateType = e.target.value;
      this.$store.commit('addContent', data);

      // reset the select tag's value to default
      this.resetOptionValue();
    },
    resetOptionValue() {
      const el = document.getElementById('add-content-selector');
      console.dir(el);
      el.value = '';
    },
    closeRemoveTabModal() {
      // close the remove activity modal window
      this.$store.commit('updateModals', {key: 'removeTab', value: false});
    },
    removeTab() {
      this.$store.commit('removeContent');

      // close the remove activity modal window
      this.$store.commit('updateModals', {key: 'removeTab', value: false});
    },
  },
};
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
section.tab-contents-list-wrapper {
  margin-bottom: 20px;
}

section.tab-contents-list-wrapper h2 {
  font-size: 24px;
  margin: 10px 0;
}

section.tab-contents-list-wrapper {
  padding: 5px 0;
  width: 100%;
}

.change-order-move {
  transition: transform 1s;
}

.add-content {
  background-color: black;
  color: white;
  text-align: center;
  /*margin-left: 30px;
  margin-right: 10px;*/
  /*cursor: pointer;*/
  padding: 20px 0;
}

.add-content:hover {
  background-color: #FFD12A;
}
</style>
