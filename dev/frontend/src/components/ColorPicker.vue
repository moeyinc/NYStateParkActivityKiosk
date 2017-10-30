<!-- =================================================
 Vue Template
================================================== -->
<template>
  <transition name="modal">
    <div class="modal-mask" @click.self="closeModal">
      <compact-picker
        v-if="theme==='basic'"
        v-model="color"
        id="color-picker"
        :palette="palette"
      />
      <sketch-picker
        v-if="theme==='image'"
        v-model="color"
        id="color-picker"
      />
    </div>
  </transition>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
// import { Sketch, Compact } from 'vue-color'
import { Sketch, Compact } from '@/../node_modules/vue-color/dist/vue-color.js'
import tinycolor from 'tinycolor2'

export default {
  name: 'color-picker',
  components: {
    'sketch-picker': Sketch,
    'compact-picker': Compact
  },
  props: {
    colorObject: Object,
    modalPosition: Object,
    palette: Array,
    theme: String
  },
  mounted () {
    this.setPos()
  },
  computed: {
    color: {
      get () {
        let colorObject = this._colorChange(this.colorObject)
        console.log(colorObject)
        return colorObject
        // return this.colorObject
      },
      set (value) {
        this.$emit('update-color', value)
      }
    }
  },
  methods: {
    setPos () {
      console.log(this.modalPosition)
      const el = document.getElementById('color-picker')
      el.style.top = this.modalPosition.top + 'px'
      el.style.left = this.modalPosition.right + 20 + 'px'
    },
    closeModal () {
      this.$emit('close-modal')
    },
    _colorChange (data, oldHue) {
      var alpha = data && data.a
      var color

      // hsl is better than hex between conversions
      if (data && data.hsl) {
        color = tinycolor(data.hsl)
      } else if (data && data.hex && data.hex.length > 0) {
        color = tinycolor(data.hex)
      } else {
        color = tinycolor(data)
      }

      if (color && (color._a === undefined || color._a === null)) {
        color.setAlpha(alpha || 1)
      }

      var hsl = color.toHsl()
      var hsv = color.toHsv()

      if (hsl.s === 0) {
        hsv.h = hsl.h = data.h || (data.hsl && data.hsl.h) || oldHue || 0
      }

      // when the hsv.v is less than 0.0164 (base on test)
      // because of possible loss of precision
      // the result of hue and saturation would be miscalculated
      if (hsv.v < 0.0164) {
        hsv.h = data.h || (data.hsv && data.hsv.h) || 0
        hsv.s = data.s || (data.hsv && data.hsv.s) || 0
      }

      if (hsl.l < 0.01) {
        hsl.h = data.h || (data.hsl && data.hsl.h) || 0
        hsl.s = data.s || (data.hsl && data.hsl.s) || 0
      }

      return {
        hsl: hsl,
        hex: color.toHexString().toUpperCase(),
        rgba: color.toRgb(),
        hsv: hsv,
        oldHue: data.h || oldHue || hsl.h,
        source: data.source,
        a: data.a || color.getAlpha()
      }
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

#color-picker {
  position: absolute;
  z-index: 1200;
}
</style>
