<!-- =================================================
 Vue Template
================================================== -->
<template>
  <transition name="modal">
    <div class="modal-mask" @click.self="closeModal">
      <sketch-picker v-model="color" id="color-picker" />
    </div>
  </transition>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import { Sketch } from 'vue-color'

export default {
  name: 'color-picker',
  components: {
    'sketch-picker': Sketch
  },
  props: {
    colorObject: Object,
    modalPosition: ClientRect
  },
  mounted () {
    this.setPos()
  },
  computed: {
    color: {
      get () {
        return this.colorObject
      },
      set (value) {
        this.$emit('update-color', value)
      }
    }
  },
  methods: {
    setPos () {
      const el = document.getElementById('color-picker')
      el.style.top = this.modalPosition.top + 'px'
      el.style.left = this.modalPosition.right + 20 + 'px'
    },
    closeModal () {
      this.$emit('close-modal')
    }
  }
}
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 1199;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  transition: opacity .3s ease;
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
