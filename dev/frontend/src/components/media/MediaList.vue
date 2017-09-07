<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="media-list-wrapper">
    <div class="upload-button-wrapper">
      <upload-button></upload-button>
    </div>
    <ul>
      <li
        v-for="item in sortMediaItems($store.state.mediaItems)"
        :key="item.timestamp"
        class="media-item-wrapper">
        <media-list-item
          :item="item"
          ></media-list-item>
      </li>
    </ul>
    </div>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import UploadButton  from './UploadButton.vue'
import MediaListItem from './MediaListItem.vue'

export default {
  name: 'media-list',
  components: {
    'upload-button'   : UploadButton,
    'media-list-item' : MediaListItem
  }
}
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
#media-list-wrapper {
  width: 100%;
  height: 100%;
  /*background-color: lightblue;*/
  background-color: white;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 0 20px 20px 0;
}

.upload-button-wrapper {
  float: left;
  width: 200px;
  height: 200px;
}

li.media-item-wrapper {
  list-style: none;
  background-color: lightgrey;
  float: left;
  width: 200px;
  height: 200px;
}

</style>
