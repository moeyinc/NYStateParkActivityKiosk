<!-- =================================================
 Vue Template
================================================== -->
<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click.self="closeModal">
        <div class="modal-container" id="media-gallery-window-container">
          <div class="modal-container-inside">
            <media></media>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import Media from './Media.vue';

export default {
  name: 'media-gallery-window',
  components: {
    'media': Media,
  },
  mounted() {
    // resize this component
    this.resizeWrapper(this.$store.state.size);

    // watch resizing action
    this.$store.watch(this.$store.getters.getSize, (size) => {
      console.log('resizing media gallery window wrapper');
      this.resizeWrapper(size);
    });
  },
  methods: {
    closeModal() {
      this.$store.commit('updateModals', {key: 'mediaGallery', value: false});
    },
    resizeWrapper(size) {
      const el = document.getElementById('media-gallery-window-container');
      el.style.height = size.window.h * 0.8 + 'px';
    },
  },
};
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  position: relative;
  width: 90%;
  margin: 0px auto;
  /*padding: 20px 30px;*/
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  overflow: hidden;
}

.modal-header h3 {
  margin-top: 0;
  /*color: #42b983;*/
}

.modal-container-inside {
  padding: 20px 30px;
  height: 100%;
}

.modal-body {
  margin-top: 20px;
}

.modal-footer {
  /*height: 40px;*/
  /*padding: 20px 0;*/
}

.modal-cancel-button {
  float: left;
  width: 50%;
  padding: 15px 20px;
  text-align: center;
  background-color: darkgrey;
  color: white;
}

.modal-submit-button {
  float: left;
  width: 50%;
  padding: 15px 20px;
  text-align: center;
  background-color: black;
  color: white;
}

.modal-cancel-button:hover {
  background-color: #FFD12A;
  color: black;
}

.modal-submit-button:hover {
  background-color: #FFD12A;
  color: black;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
