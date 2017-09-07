<!-- =================================================
 Vue Template
================================================== -->
<template>
  <section class="general-settings-wrapper">
    <h2>
      General Settings:
    </h2>
    <div class="table-wrapper">
      <table>
        <tr class="page-title">
          <td>
            <p>
              Kiosk Title:
            </p>
          </td>
          <td>
            <input
              v-model="kioskTitle"
              type="text"
              name="kiosk-title"
              v-validate="{ rules: { required: true, alpha_spaces: true, max: 30 }}"
              size="20"
              placeholder="THINGS TO DO" />
          </td>
        </tr>
        <tr v-show="errors.has('kiosk-title')" class="error-message">
          <td></td><td>{{ errors.first('kiosk-title')}}</td>
        </tr>
        <tr class="background-color">
          <td>
            <p>
              BG Color:
            </p>
          </td>
          <td>
            <span class="color-rect" :style="{'background-color': getColorInString(bgColor)}"></span>
            <div class="icon-wrapper" @click="showBgColorPicker" id="background-color-picker-origin">
              <icon name="eyedropper"></icon>
            </div>
          </td>
        </tr>
        <tr class="text-color">
          <td>
            <p>
              Text Color:
            </p>
          </td>
          <td>
            <span class="color-rect" :style="{'background-color': getColorInString(textColor)}"></span>
            <div class="icon-wrapper" @click="showTextColorPicker" id="text-color-picker-origin">
              <icon name="eyedropper"></icon>
            </div>
          </td>
        </tr>
        <tr class="time-out">
          <td>
            <p>
              Screen Timeout:
            </p>
          </td>
          <td>
            <select v-model="screenTimeout">
              <option disabled selected="selected">Please select one</option>
              <option value="60">1 minute</option>
              <option value="120">2 minutes</option>
              <option value="180">3 minutes</option>
              <option value="240">4 minutes</option>
              <option value="300">5 minutes</option>
            </select>
          </td>
        </tr>
      </table>
    </div>
    <color-picker
      :color-object="bgColor"
      :modal-position="getBgColorPickerPos"
      @update-color="updateBgColor"
      @close-modal="closeBgColorPicker"
      v-if="isBgColorPickerVisible">
    </color-picker>
    <color-picker
      :color-object="textColor"
      :modal-position="getTextColorPickerPos"
      @update-color="updateTextColor"
      @close-modal="closeTextColorPicker"
      v-if="isTextColorPickerVisible">
    </color-picker>
  </section>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import ColorPicker from '@/components/ColorPicker.vue'

export default {
  name: 'general-settings',
  components: {
    'color-picker': ColorPicker
  },
  data () {
    return {
      isBgColorPickerVisible: false,
      isTextColorPickerVisible: false
    }
  },
  computed: {
    kioskTitle: {
      get () {
        return this.$store.state.generalSettings.kiosk_title
      },
      set (value) {
        let data = {
          param: 'kiosk_title',
          newVal: value
        }
        this.$store.commit('updateGeneralSettingsParam', data)
      }
    },
    screenTimeout: {
      get () {
        return this.$store.state.generalSettings.timeout_in_second
      },
      set (value) {
        let data = {
          param: 'timeout_in_second',
          newVal: parseInt(value)
        }
        this.$store.commit('updateGeneralSettingsParam', data)
      }
    },
    bgColor () {
      return this.$store.state.generalSettings.background_color
    },
    textColor () {
      return this.$store.state.generalSettings.text_color
    },
    getBgColorPickerPos () {
      const el = document.getElementById('background-color-picker-origin')
      const rect = el.getBoundingClientRect()
      return rect
    },
    getTextColorPickerPos () {
      const el = document.getElementById('text-color-picker-origin')
      const rect = el.getBoundingClientRect()
      return rect
    }
  },
  methods: {
    showBgColorPicker () {
      this.isBgColorPickerVisible = true
    },
    showTextColorPicker () {
      this.isTextColorPickerVisible = true
    },
    closeBgColorPicker () {
      this.isBgColorPickerVisible = false
    },
    closeTextColorPicker () {
      this.isTextColorPickerVisible = false
    },
    updateBgColor (value) {
      let data = {
        param: 'background_color',
        newVal: value
      }
      this.$store.commit('updateGeneralSettingsParam', data)
    },
    updateTextColor (value) {
      let data = {
        param: 'text_color',
        newVal: value
      }
      this.$store.commit('updateGeneralSettingsParam', data)
    }
  }
}
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
section.general-settings-wrapper {
  margin-bottom: 20px;
}

section.general-settings-wrapper h2 {
  font-size: 24px;
  margin: 10px 0;
}

.table-wrapper {
  padding: 5px;
}

table {
  width: 100%;
  color: white;
  padding: 15px 25px;
  background-color: dimgrey;
}

table td {
  padding: 5px 0;
  vertical-align: middle;
}

table td:first-child {
  width: 30%;
}

input {
  font-size: 18px;
}

.background-color input, .text-color input {
  float: left;
  margin-right: 8px;
}

::-webkit-input-placeholder {
	color: lightgrey;
}

.error-message {
  color: #FFD12A;
  font-size: 11px;
  margin-top: 5px;
}

.icon-wrapper {
  display: inline-block;
  cursor: pointer;
  height: 20px;
}

.vue-color__sketch {
  position: absolute;
  z-index: 1200;
}

.color-rect {
  height: 20px;
  width: 26px;
  margin-right: 5px;
  display: inline-block;
  margin-top: 5px;
}

.fa-icon {
  width: auto;
  height: 1em; /* or any other relative font sizes */
}
</style>
