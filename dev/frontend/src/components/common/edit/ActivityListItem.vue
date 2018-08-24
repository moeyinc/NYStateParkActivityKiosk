<!-- =================================================
 Vue Template
================================================== -->
<template>
  <li>
    <div class="in-li clearfix">
      <table>
        <tr class="activity-order">
          <td>
            <p>
              Order:
            </p>
          </td>
          <td>
            <p>
              {{activity.activity_id}}
            </p>
            <div class="icon-wrapper" @click="changeOrder(-1)">
              <icon name="arrow-circle-up"></icon>
            </div>
            <div class="icon-wrapper" @click="changeOrder(1)">
              <icon name="arrow-circle-down"></icon>
            </div>
            <div
              class="icon-wrapper-right"
              @click="showRemoveActivityModal"
              v-show="$store.state.moey">
              <icon name="trash"></icon>
            </div>
          </td>
        </tr>
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
        <tr
          v-show="errors.has('button-label-' + activity.activity_id)"
          class="error-message">
          <td></td>
          <td>{{ errors.first('button-label-' + activity.activity_id)}}</td>
        </tr>
        <tr
          v-show="errors.has('page-title-' + activity.activity_id)"
          class="error-message">
          <td></td>
          <td>{{ errors.first('page-title-' + activity.activity_id)}}</td>
        </tr>
        <tr class="activity-main-color" v-show="$store.state.moey">
          <td>
            <p>
              Main Color:
            </p>
          </td>
          <td>
            <span
              class="color-rect"
              :style="{
                'background-color': getColorInString(activity.main_color)}">
              </span>
            <div
              class="icon-wrapper"
              @click="showMainColorPicker"
              :id="'main-color-picker-origin-' + activity.activity_id">
              <icon name="eyedropper"></icon>
            </div>
          </td>
        </tr>
        <tr class="activity-icon" v-show="$store.state.moey">
          <td>
            <p>
              Icon (.svg):
            </p>
          </td>
          <td class="icon-uri">
            <button
              type="button"
              @click="showMediaGalleryWindow('icon_uri')">
              Choose from gallery
            </button>
            {{ activity.icon_uri }}
          </td>
        </tr>
      </table>
    </div>
    <color-picker
      :color-object="activity.main_color"
      :modal-position="getMainColorPickerPos"
      :palette="[
        '#B74F59',
        '#AB5360',
        '#90586E',
        '#6C5E80',
        '#40638F',
        '#35738C',
        '#2D8287',
        '#1E9580',
        '#08A775',
        '#74AA61',
        '#A2AA50',
        '#C7A83E',
        '#EEA424',
        '#CE7024',
        '#AF4324']"
      :theme="$store.state.generalSettings.design_theme"
      @update-color="updateMainColor"
      @close-modal="closeMainColorPicker"
      v-if="isMainColorPickerVisible">
    </color-picker>
    <color-picker
      :color-object="activity.sub_color"
      :modal-position="getSubColorPickerPos"
      :palette="[
        '#C3878C',
        '#BB8A90',
        '#AB8C99',
        '#968FA4',
        '#7E92AE',
        '#7B9CAD',
        '#79A6AA',
        '#76B3A6',
        '#70BEA0',
        '#A6C295',
        '#BFC38C',
        '#D4C282',
        '#EBC074',
        '#D39D6E',
        '#BD7E6A']"
      :theme="$store.state.generalSettings.design_theme"
      @update-color="updateSubColor"
      @close-modal="closeSubColorPicker"
      v-if="isSubColorPickerVisible">
    </color-picker>
  </li>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import ColorPicker from '../ColorPicker.vue';

export default {
  name: 'activity-list-item',
  components: {
    'color-picker': ColorPicker,
  },
  data() {
    return {
      isMainColorPickerVisible: false,
      isSubColorPickerVisible: false,
    };
  },
  props: {
    activity: {
      type: Object,
    },
  },
  computed: {
    activityButtonLabel: {
      get() {
        return this.activity.button_label;
      },
      set(value) {
        let data = {
          target: 'activity',
          act_id: this.activity.activity_id,
          param: 'button_label',
          newVal: value,
        };
        this.$store.commit('updateActivityParam', data);
      },
    },
    activityPageTitle: {
      get() {
        return this.activity.page_title;
      },
      set(value) {
        let data = {
          target: 'activity',
          act_id: this.activity.activity_id,
          param: 'page_title',
          newVal: value,
        };
        this.$store.commit('updateActivityParam', data);
      },
    },
    getMainColorPickerPos() {
      const el = document.getElementById('main-color-picker-origin-' +
        this.activity.activity_id);
      const rect = this.getBoundingClientRect(el);
      // const rect = el.getBoundingClientRect()
      return rect;
    },
    getSubColorPickerPos() {
      const el = document.getElementById('sub-color-picker-origin-' +
        this.activity.activity_id);
      const rect = this.getBoundingClientRect(el);
      // const rect = el.getBoundingClientRect()
      return rect;
    },
  },
  methods: {
    changeOrder(value) {
      this.$emit('change-order', this.activity.activity_id, value);
    },
    showMediaGalleryWindow(param) {
      let data = {
        target: 'activity',
        act_id: this.activity.activity_id,
        param: param,
        newVal: null,
      };

      // temporarily keep the data object for media gallery
      this.$store.commit('updateTempDataForMediaGallery', data);

      // open the media gallery window
      this.$store.commit('updateModals', {key: 'mediaGallery', value: true});
    },
    showRemoveActivityModal() {
      // open the remove activity modal window
      this.$store.commit('updateModals', {key: 'removeActivity', value: true});

      // store temp data to remove the activity
      let tempData = {};
      tempData.act_id = this.activity.activity_id;
      this.$store.commit('updateTempDataForRemoving', tempData);
    },
    showMainColorPicker() {
      this.isMainColorPickerVisible = true;
    },
    showSubColorPicker() {
      this.isSubColorPickerVisible = true;
    },
    closeMainColorPicker() {
      this.isMainColorPickerVisible = false;
    },
    closeSubColorPicker() {
      this.isSubColorPickerVisible = false;
    },
    updateMainColor(value) {
      let data = {
        target: 'activity',
        act_id: this.activity.activity_id,
        param: 'main_color',
        newVal: value,
      };
      this.$store.commit('updateActivityParam', data);
    },
    updateSubColor(value) {
      let data = {
        target: 'activity',
        act_id: this.activity.activity_id,
        param: 'sub_color',
        newVal: value,
      };
      this.$store.commit('updateActivityParam', data);
    },
  },
};
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
table {
  width: 100%;
}

table td:first-child {
  width: 30%;
}

table td {
  padding: 5px 0;
}

li {
  list-style: none;
  padding: 5px 0;
}

li div.in-li {
  width: 100%;
  color: white;
  padding: 15px 25px;
  /*border-radius: 10px;*/
  background-color: dimgrey;
  border-radius: 3px;
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

.activity-order p {
  float: left;
  margin-right: 20px;
}

.activity-order div.icon-wrapper {
  float: left;
  margin-right: 8px;
  cursor: pointer;
}

.activity-order div.icon-wrapper-right {
  float: right;
  /*margin-right: 8px;*/
  cursor: pointer;
}

.activity-order .fa-icon:active {
  color: #FFD12A;
}

td.icon-uri {
  font-size: 10px;
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
