<!-- =================================================
 Vue Template
================================================== -->
<template>
  <section class="activity-settings-wrapper">
    <h2>
      Activity Settings:
    </h2>
    <div class="table-wrapper">
      <table>
        <tr class="activity-button-label">
          <td>
            <p>
              Button Label:
            </p>
          </td>
          <td>
            <input
              v-model="activityButtonLabel"
              type="text"
              :name="'button-label-' + activity.activity_id"
              v-validate="{ rules: { required: true, max: 30 }}"
              size="25"/>
          </td>
        </tr>
        <tr v-show="errors.has('button-label-' + activity.activity_id)" class="error-message">
          <td></td><td>{{ errors.first('button-label-' + activity.activity_id)}}</td>
        </tr>
        <tr class="activity-page-title">
          <td>
            <p>
              Page Title:
            </p>
          </td>
          <td>
            <input
              v-model="activityPageTitle"
              type="text"
              :name="'page-title-' + activity.activity_id"
              v-validate="{ rules: { required: true, max: 30 }}"
              size="25"/>
          </td>
        </tr>
        <tr v-show="errors.has('page-title-' + activity.activity_id)" class="error-message">
          <td></td><td>{{ errors.first('page-title-' + activity.activity_id)}}</td>
        </tr>
        <tr class="activity-main-color">
          <td>
            <p>
              Main Color:
            </p>
          </td>
          <td>
            <span class="color-rect" :style="{'background-color': getColorInString(activity.main_color)}"></span>
            <div class="icon-wrapper" @click="showMainColorPicker" id="main-color-picker-origin">
              <icon name="eyedropper"></icon>
            </div>
          </td>
        </tr>
        <tr class="activity-sub-color">
          <td>
            <p>
              Sub Color:
            </p>
          </td>
          <td>
            <span class="color-rect" :style="{'background-color': getColorInString(activity.sub_color)}"></span>
            <div class="icon-wrapper" @click="showSubColorPicker" id="sub-color-picker-origin">
              <icon name="eyedropper"></icon>
            </div>
          </td>
        </tr>
        <tr class="activity-white-icon">
          <td>
            <p>
              Icon (white):
            </p>
          </td>
          <td class="icon-uri">
            <button type="button" @click="showMediaGalleryWindow('white_icon_uri')">Choose from gallery</button>
            {{ activity.white_icon_uri }}
          </td>
        </tr>
        <tr class="activity-color-icon">
          <td>
            <p>
              Icon (color):
            </p>
          </td>
          <td class="icon-uri">
            <button type="button" @click="showMediaGalleryWindow('color_icon_uri')">Choose from gallery</button>
            {{ activity.white_icon_uri }}
          </td>
        </tr>
      </table>
    </div>
    <color-picker
      :color-object="activity.main_color"
      :modal-position="getMainColorPickerPos"
      @update-color="updateMainColor"
      @close-modal="closeMainColorPicker"
      v-if="isMainColorPickerVisible">
    </color-picker>
    <color-picker
      :color-object="activity.sub_color"
      :modal-position="getSubColorPickerPos"
      @update-color="updateSubColor"
      @close-modal="closeSubColorPicker"
      v-if="isSubColorPickerVisible">
    </color-picker>
  </section>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import ColorPicker from '@/components/ColorPicker.vue'

export default {
  name: 'activity-settings',
  components: {
    'color-picker': ColorPicker
  },
  data () {
    return {
      isMainColorPickerVisible: false,
      isSubColorPickerVisible: false
    }
  },
  computed: {
    activity () {
      return this.$store.getters.getSelectedActivity
    },
    activityButtonLabel: {
      get () {
        return this.activity.button_label
      },
      set (value) {
        let data = {
          target: 'activity',
          act_id: this.activity.activity_id,
          param: 'button_label',
          newVal: value
        }
        this.$store.commit('updateActivityParam', data)
      }
    },
    activityPageTitle: {
      get () {
        return this.activity.page_title
      },
      set (value) {
        let data = {
          target: 'activity',
          act_id: this.activity.activity_id,
          param: 'page_title',
          newVal: value
        }
        this.$store.commit('updateActivityParam', data)
      }
    },
    // activityMainColor: {
    //   get () {
    //     return this.activity.main_color
    //   },
    //   set (value) {
    //     let data = {
    //       target: 'activity',
    //       act_id: this.activity.activity_id,
    //       param: 'main_color',
    //       newVal: value
    //     }
    //     this.$store.commit('updateActivityParam', data)
    //   }
    // },
    // activitySubColor: {
    //   get () {
    //     return this.activity.sub_color
    //   },
    //   set (value) {
    //     let data = {
    //       target: 'activity',
    //       act_id: this.activity.activity_id,
    //       param: 'sub_color',
    //       newVal: value
    //     }
    //     this.$store.commit('updateActivityParam', data)
    //   }
    // },
    getMainColorPickerPos () {
      const el = document.getElementById('main-color-picker-origin')
      const rect = el.getBoundingClientRect()
      return rect
    },
    getSubColorPickerPos () {
      const el = document.getElementById('sub-color-picker-origin')
      const rect = el.getBoundingClientRect()
      return rect
    }
  },
  methods: {
    showMediaGalleryWindow (param) {
      let data = {
        target: 'activity',
        act_id: this.activity.activity_id,
        param: param,
        newVal: null
      }

      // temporarily keep the data object for media gallery
      this.$store.commit('updateTempDataForMediaGallery', data)

      // open the media gallery window
      this.$store.commit('updateModals', {key: 'mediaGallery', value: true})
    },
    showMainColorPicker () {
      this.isMainColorPickerVisible = true
    },
    showSubColorPicker () {
      this.isSubColorPickerVisible = true
    },
    closeMainColorPicker () {
      this.isMainColorPickerVisible = false
    },
    closeSubColorPicker () {
      this.isSubColorPickerVisible = false
    },
    updateMainColor (value) {
      let data = {
        target: 'activity',
        act_id: this.activity.activity_id,
        param: 'main_color',
        newVal: value
      }
      this.$store.commit('updateActivityParam', data)
    },
    updateSubColor (value) {
      let data = {
        target: 'activity',
        act_id: this.activity.activity_id,
        param: 'sub_color',
        newVal: value
      }
      this.$store.commit('updateActivityParam', data)
    }
  }
}
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
section.activity-settings-wrapper {
  margin-bottom: 20px;
}

section.activity-settings-wrapper h2 {
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
}

table td:first-child {
  width: 30%;
}

input {
  font-size: 18px;
}

input[type=file] {
  /*max-width: 280px;*/
  font-size: 11px;
}

::-webkit-input-placeholder {
	color: lightgrey;
}

.error-message {
  color: #FFD12A;
  font-size: 11px;
  margin-top: 5px;
}

td.icon-uri {
  font-size: 10px;
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
