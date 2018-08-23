<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="media-wrapper">
    <div class="left-gallery-area">
      <media-list v-if="isReady">
      </media-list>
    </div>
    <div
      class="right-property-area">
      <image-property
        v-if="$store.state.selectedMediaItem===null ? false : true"/>
    </div>
    <confirm-modal
      v-if="$store.state.modals.deleteMediaItem"
      @close-modal="closeDeleteMediaItemModal"
      @execute-command="deleteMediaItem"
      >
      <h3 slot="header">Deleting Media Item</h3>
      <p slot="body">The item will be completely deleted.</p>
      <p slot="cancel-button">CANCEL</p>
      <p slot="execute-button">DELETE</p>
    </confirm-modal>
  </div>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import MediaList from './MediaList.vue';
import ImageProperty from './ImageProperty.vue';
// import DeleteMediaItemModal from './DeleteMediaItemModal.vue'
import ConfirmModal from '@/components/ConfirmModal.vue';

export default {
  name: 'media',
  components: {
    'media-list': MediaList,
    'image-property': ImageProperty,
    // 'delete-media-item-modal': DeleteMediaItemModal
    'confirm-modal': ConfirmModal,
  },
  data() {
    return {
      isReady: false,
    };
  },
  created() {
    // reset
    this.isReady = false;

    this.$store.dispatch('updateMediaItems')
    .then(() => {
      this.isReady = true;
    });
  },
  methods: {
    closeDeleteMediaItemModal() {
      this.$store.commit('updateModals', {
        key: 'deleteMediaItem', value: false});
    },
    deleteMediaItem() {
      this.$store.commit('updateModals', {
        key: 'deleteMediaItem', value: false});
      let itemToDelete = this.$store.state.selectedMediaItem;
      // delete the item
      this.$store.dispatch('deleteImage', itemToDelete);
    },
  },
};
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
#media-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.left-gallery-area {
  width: 100%;
  height: 100%;
  padding: 20px 300px 0px 20px;
  float: left;
}

.right-property-area {
  width: 300px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: lightgrey;
  padding: 20px;
}
</style>
