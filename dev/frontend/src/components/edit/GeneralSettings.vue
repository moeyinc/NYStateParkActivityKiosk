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
        <!-- <tr class="design-theme">
          <td>
            <p>
              Design Theme:
            </p>
          </td>
          <td>
            <select v-model="designTheme">
              <option disabled selected="selected">Please select one</option>
              <option value="basic">Basic</option>
              <option value="image">Background Image</option>
            </select>
          </td>
        </tr> -->
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
              v-validate="{ rules: { required: true, alpha_spaces: true, max: 40 }}"
              size="30"
              placeholder="THINGS TO DO" />
          </td>
        </tr>
        <tr class="page-title-2" v-if="$store.state.generalSettings.design_theme==='image'">
          <td>
            <p>
              (2nd Line)
            </p>
          </td>
          <td>
            <input
              v-model="kioskTitle2"
              type="text"
              name="kiosk-title-2"
              v-validate="{ rules: { required: true, alpha_spaces: true, max: 40 }}"
              size="30"
              placeholder="THINGS TO DO" />
          </td>
        </tr>
        <tr v-show="errors.has('kiosk-title')" class="error-message">
          <td></td><td>{{ errors.first('kiosk-title')}}</td>
        </tr>
        <!-- <tr class="background-color" v-if="$store.state.generalSettings.design_theme==='basic'">
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
        </tr> -->
        <tr class="background-image-home" v-if="$store.state.generalSettings.design_theme==='image'">
          <td>
            <p>
              BG Image (Home):
            </p>
          </td>
          <td class="bg-image-uri">
            <button type="button" @click="showMediaGalleryWindow('bg_image_home_uri')">Choose from gallery</button>
            {{ this.$store.state.generalSettings.bg_image_home_uri }}
          </td>
        </tr>
        <tr class="background-image-detail" v-if="$store.state.generalSettings.design_theme==='image'">
          <td>
            <p>
              BG Image (Detail):
            </p>
          </td>
          <td class="bg-image-uri">
            <button type="button" @click="showMediaGalleryWindow('bg_image_detail_uri')">Choose from gallery</button>
            {{ this.$store.state.generalSettings.bg_image_detail_uri }}
          </td>
        </tr>
        <!-- <tr class="text-color">
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
        </tr> -->
        <!-- <tr class="state-park-logo">
          <td>
            <p>
              State Park Logo:
            </p>
          </td>
          <td class="park-logo-uri">
            <select v-model="showParkLogo" class="show-logo">
              <option disabled selected="selected">Please select one</option>
              <option value="on">On</option>
              <option value="off">Off</option>
            </select>
            <button type="button" @click="showMediaGalleryWindow('park_logo_uri')">Choose from gallery</button>
            {{ this.$store.state.generalSettings.park_logo_uri }}
          </td>
        </tr> -->
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
      :theme="$store.state.generalSettings.design_theme"
      @update-color="updateBgColor"
      @close-modal="closeBgColorPicker"
      v-if="isBgColorPickerVisible">
    </color-picker>
    <color-picker
      :color-object="textColor"
      :modal-position="getTextColorPickerPos"
      :theme="$store.state.generalSettings.design_theme"
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
    designTheme: {
      get () {
        return this.$store.state.generalSettings.design_theme
      },
      set (value) {
        let data = {
          param: 'design_theme',
          newVal: value
        }
        this.$store.commit('updateGeneralSettingsParam', data)
      }
    },
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
    kioskTitle2: {
      get () {
        return this.$store.state.generalSettings.kiosk_title_2
      },
      set (value) {
        let data = {
          param: 'kiosk_title_2',
          newVal: value
        }
        this.$store.commit('updateGeneralSettingsParam', data)
      }
    },
    showParkLogo: {
      get () {
        return this.$store.state.generalSettings.show_logo
      },
      set (value) {
        let data = {
          param: 'show_logo',
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
      const rect = this.getBoundingClientRect(el)
      // const rect = el.getBoundingClientRect()
      return rect
    },
    getTextColorPickerPos () {
      const el = document.getElementById('text-color-picker-origin')
      const rect = this.getBoundingClientRect(el)
      // const rect = el.getBoundingClientRect()
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
    },
    showMediaGalleryWindow (param) {
      let data = {
        target: 'general_settings',
        param: param,
        newVal: null
      }

      // temporarily keep the data object for media gallery
      this.$store.commit('updateTempDataForMediaGallery', data)

      // open the media gallery window
      this.$store.commit('updateModals', {key: 'mediaGallery', value: true})
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
  width: 35%;
}

input {
  font-size: 18px;
}

td.park-logo-uri {
  font-size: 10px;
}

td.bg-image-uri {
  font-size: 10px;
}

select.show-logo {
  width: 50px;
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

/*.vue-color__sketch {
  position: absolute;
  z-index: 1200;
}*/

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
