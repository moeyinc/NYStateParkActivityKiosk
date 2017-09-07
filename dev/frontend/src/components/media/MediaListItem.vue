<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div
    class="media-item"
    :class="{'selected': isSelected}"
    :style="setBGImage(getImageStaticFilePath(item.filename))"
    @click="selectItem">
  </div>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'media-list-item',
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    isSelected () {
      if (!this.$store.state.selectedMediaItem) {
        return false
      } else {
        if (this.item.filename === this.$store.state.selectedMediaItem.filename) {
          console.log('selected item: ', this.item)
          return true
        }
      }
      return false
    }
  },
  methods: {
    selectItem () {
      this.$store.commit('updateSelectedMediaItem', this.item)
    }
  }
}
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
.media-item {
  width: 100%;
  height: 100%;
  border-style: solid;
  border-width: 3px;
  border-color: white;
}

.media-item:hover {
  border-style: solid;
  border-width: 3px;
  border-color: #FFD12A;
}

.media-item.selected {
  border-style: solid;
  border-width: 3px;
  border-color: #FFD12A;
}

</style>
