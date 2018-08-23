<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="edit-panel-wrapper">
    <form autocomplete="off">
      <div id="edit-panel-input-area">
        <router-view
          name="section-top"
          v-if="$store.state.generalSettings && $store.state.activities"/>
        <router-view
          name="section-bottom"
          v-if="$store.state.generalSettings && $store.state.activities"/>
      </div>
      <footer
        id="edit-panel-submit-bar"
        @click="showSubmitChangesModal">
        <div class="submit-bar-title">SUBMIT CHANGES</div>
      </footer>
    </form>
    <confirm-modal
      v-if="$store.state.modals.submitChanges"
      @close-modal="closeSubmitChangesModal"
      @execute-command="submitChanges"
      >
      <h3 slot="header">Submitting Content</h3>
      <p slot="body">The previous content will be lost.</p>
      <p slot="cancel-button">CANCEL</p>
      <p slot="execute-button">SUBMIT</p>
    </confirm-modal>
    <media-gallery-window v-if="$store.state.modals.mediaGallery"/>
  </div>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import ConfirmModal from '@/components/ConfirmModal.vue';
import MediaGalleryWindow from '@/components/media/MediaGalleryWindow.vue';

export default {
  name: 'editor-panel',
  components: {
    'confirm-modal': ConfirmModal,
    'media-gallery-window': MediaGalleryWindow,
  },
  created() {
  },
  mounted() {
    // resize this component
    this.resizeWrapper(this.$store.state.size);

    // watch resizing action
    this.$store.watch(this.$store.getters.getSize, (size) => {
      console.log('resizing edit panel wrapper');
      this.resizeWrapper(size);
    });
  },
  methods: {
    resizeWrapper(size) {
      const panelWrapper = document.getElementById('edit-panel-wrapper');
      panelWrapper.style.width = size.editPanel.w + 'px';
      panelWrapper.style.height = size.editPanel.h + 'px';

      const submitBarHeight = 60;
      const inputArea = document.getElementById('edit-panel-input-area');
      inputArea.style.height = size.editPanel.h - submitBarHeight + 'px';

      const submitBar = document.getElementById('edit-panel-submit-bar');
      submitBar.style.width = size.editPanel.w + 'px';
      submitBar.style.height = submitBarHeight + 'px';
    },
    showSubmitChangesModal() {
      this.$store.commit('updateModals', {key: 'submitChanges', value: true});
    },
    closeSubmitChangesModal() {
      this.$store.commit('updateModals', {key: 'submitChanges', value: false});
    },
    submitChanges() {
      this.$store.commit('updateModals', {key: 'submitChanges', value: false});
      this.$store.dispatch('submitGeneralSettings').then(() => {
        console.log('general settings submitted');
      });
      this.$store.dispatch('submitActivities').then(() => {
        console.log('activities submitted');
      });
    },
  },
};
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
#edit-panel-wrapper {
  background-color: lightgrey;
  position: relative;
  float: left;
  overflow-x: hidden;
  font-family: "Helvetica";
  letter-spacing: 1px;
  user-select: text;
  font-size: 18px;
}

#edit-panel-input-area {
  overflow-y: scroll;
  padding: 20px;
}

footer {
  position: fixed;
  left: 0;
  bottom: 0;
  background: black;
  cursor: pointer;
}

footer .submit-bar-title {
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
}

footer:hover {
  background-color: #FFD12A;
}

footer:hover .submit-bar-title {
  color: black;
}
</style>
