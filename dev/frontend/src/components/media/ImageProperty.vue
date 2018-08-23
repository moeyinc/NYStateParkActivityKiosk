<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div class="image-property-wrapper">
    <h3>Image Information</h3>
    <div class="block">
      <h5>File Name:</h5>
      <p>{{$store.state.selectedMediaItem.filename}}</p>
    </div>
    <div class="block">
      <h5>Date Uploaded:</h5>
      <p >{{getFormattedTime}}</p>
    </div>
    <div class="block">
      <h5>Dimensions:</h5>
      <p>{{imageInfo.width}} × {{imageInfo.height}}</p>
    </div>
    <div class="block">
      <h5>File Size:</h5>
      <p>{{getFileSizeInKB}} KB</p>
    </div>
    <div class="select-button" @click="selectMediaItem">
      SELECT THIS IMAGE
    </div>
    <div class="delete-button" @click="deleteMediaItem">
      <p>
        REMOVE THIS IMAGE
      </p>
    </div>
  </div>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'image-property',
  data() {
    return {
      imageInfo: null,
    };
  },
  created() {
    this.getImageInfo();
  },
  watch: {
    '$store.state.selectedMediaItem'() {
      this.getImageInfo();
    },
  },
  computed: {
    getFormattedTime() {
      let d = new Date(this.$store.state.selectedMediaItem.timestamp * 1000);
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let date = d.getDate();
      let hour = d.getHours();
      let minute = d.getMinutes();
      let second = d.getSeconds();

      month = '0' + month;
      minute = '0' + minute;
      second = '0' + second;
      month = month.slice(-2);
      minute = minute.slice(-2);
      second = second.slice(-2);

      let formattedTime
        = year + '/' + month + '/' + date + ' ' + hour +
        ':' + minute + ':' + second;
      console.log(formattedTime);

      return formattedTime;
    },
    getFileSizeInKB() {
      return Math.floor(this.$store.state.selectedMediaItem.filesize / 1000);
    },
  },
  methods: {
    getImageInfo() {
      let image = new Image();
      image.src = this.getImageStaticFilePath(
        this.$store.state.selectedMediaItem.filename);

      this.imageInfo = {};
      this.imageInfo.width = image.width;
      this.imageInfo.height = image.height;
    },
    selectMediaItem() {
      let data = this.$store.state.tempDataForMediaGallery;
      data.newVal = this.$store.state.selectedMediaItem.filename;

      if (data.target === 'general_settings') {
        // update general settings param with the selected media item
        this.$store.commit('updateGeneralSettingsParam', data);
      } else {
        // update activity params with the selected media item
        this.$store.commit('updateActivityParam', data);
      }

      // close the window
      this.$store.commit('updateModals', {key: 'mediaGallery', value: false});

      // reset the selected media item
      this.$store.commit('updateSelectedMediaItem', null);
    },
    deleteMediaItem() {
      this.$store.commit('updateModals', {key: 'deleteMediaItem', value: true});
    },
  },

};
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
.image-property-wrapper {
  height: 100%;
  font-family: Helvetica;
  font-size: 18px;
}

h3 {
  margin: 10px 0 20px 0;
  font-size: 24px;
}

.block {
  margin: 10px;
}

.block h5 {
  text-decoration: underline;
}

.block p {
  margin-left: 10px;
  word-wrap: break-word;
}

.select-button {
  background-color: black;
  color: white;
  text-align: center;
  padding: 20px 0;
  margin-top: 40px;
  cursor: pointer;
}

.select-button:hover {
  background-color: #FFD12A;
}

.delete-button {
  color: dimgrey;
  text-align: center;
  /*padding: 20px 0;*/
  margin-top: 20px;
  cursor: pointer;
}

.delete-button p {
  font-size: 12px;
}

.delete-button:hover {
  color: #FFD12A;
}
</style>
