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
        v-for="item in getMediaItems"
        :key="item.timestamp"
        class="media-item-wrapper">
        <media-list-item
          :item="item"
          />
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
  },
  computed: {
    getMediaItems () {
      // if the media gallery is opend for SVG icon, select only .svg files
      // else if the media gallery is opened for other images, select only non-svg files
      let param = this.$store.state.tempDataForMediaGallery.param
      const mediaItems = this.$store.state.mediaItems
      let newItems = []
      if (param === 'icon_uri') {
        for (let i = 0; i < mediaItems.length; i++) {
          const filename = mediaItems[i].filename
          let ext = filename.substring(filename.length - 3)
          if (ext === 'svg') {
            newItems.push(mediaItems[i])
          }
        }
      } else {
        for (let i = 0; i < mediaItems.length; i++) {
          const filename = mediaItems[i].filename
          let ext = filename.substring(filename.length - 3)
          if (ext !== 'svg') {
            newItems.push(mediaItems[i])
          }
        }
      }

      let sortedItems = this.sortMediaItems(newItems)
      return sortedItems
    }
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
