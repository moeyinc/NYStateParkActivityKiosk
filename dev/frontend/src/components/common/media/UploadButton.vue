<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div class="upload-button-container">
    <input
      v-if="$store.state.tempDataForMediaGallery.param==='icon_uri'"
      class="upload-button"
      type="file"
      accept=".svg"
      name="image"
      id="image-upload-button"
      @change="uploadImage($event)"
      />
    <input
      v-else
      class="upload-button"
      type="file"
      accept="image/*"
      name="image"
      id="image-upload-button"
      @change="uploadImage($event)"
      />
    <label for="image-upload-button">
      <icon name="upload"></icon><br />
      UPLOAD IMAGE
    </label>
  </div>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'upload-button',
  methods: {
    uploadImage(e) {
      let fileToUpload = e.target.files[0];
      if (fileToUpload) {
        console.log('uploading an image: ', fileToUpload);
        this.$store.dispatch('uploadImage', fileToUpload);
      }
    },
  },
};
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
.upload-button-container {
  height: 100%;
  background-color: black;
  text-align: center;
  border-style: solid;
  border-width: 3px;
  border-color: white;
}

.upload-button-container:hover {
  background-color: #FFD12A;
}

input.upload-button {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

label {
  font-family: Helvetica;
  font-size: 1em;
  font-weight: 700;
  color: white;
  display: inline-block;
  width: 100%;
  height: 100%;
  padding-top: 26%;
  cursor: pointer;
}

.fa-icon {
  width: auto;
  height: 4em;
  margin-bottom: 10px;
}
</style>
