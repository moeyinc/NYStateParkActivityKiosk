<!-- =================================================
 Vue Template
================================================== -->
<template>
  <table :style="getTableStyle">
    <tr class="section-item-order">
      <td>
        <p>
          Section Order:
        </p>
      </td>
      <td>
        <p>
          {{section.section_id}}
        </p>
        <div class="icon-wrapper-right" @click="showRemoveSectionModal">
          <icon name="trash"></icon>
        </div>
      </td>
    </tr>
    <tr class="section-title">
      <td>
        <p>
          Section Title:
        </p>
      </td>
      <td>
        <input
          v-model="sectionTitle"
          type="text"
          :name="'section-title-' + section.section_id"
          v-validate="{ rules: { required: true, max: 30 }}"
          size="25"/>
      </td>
    </tr>
    <tr>
      <td>
        <p>
          Number of Images:
        </p>
      </td>
      <td>
        <select v-model="numberOfImages">
          <option disabled selected="selected">Please select one</option>
          <option value="0">None</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </td>
    </tr>
    <tr>
      <td>
        <p>
          Map Image:
        </p>
      </td>
      <td class="choose-file">
        <button
          type="button"
          @click="showMediaGalleryWindow('map_image_filename')">
          Choose from gallery
        </button>
        {{ section.map_image_filename }}
      </td>
    </tr>
    <tr>
      <td>
        <p>
          Ref Image 1:
        </p>
      </td>
      <td class="choose-file">
        <button
          type="button"
          @click="showMediaGalleryWindow('ref_1_image_filename')">
          Choose from gallery
        </button>
        {{ section.ref_1_image_filename }}
      </td>
    </tr>
    <tr>
      <td>
        <p>
          Ref Image 2:
        </p>
      </td>
      <td class="choose-file">
        <button
          type="button"
          @click="showMediaGalleryWindow('ref_2_image_filename')">
          Choose from gallery
        </button>
        {{ section.ref_2_image_filename }}
      </td>
    </tr>
    <tr>
      <td>
        <p>
          Text:
        </p>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <quill-editor v-model="sectionText"
          ref="myQuillEditor"
          :options="editorOption">
        </quill-editor>
      </td>
    </tr>
  </table>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'locations-editor-item',
  data() {
    return {
      editorOption: {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'size': ['small', false, 'large', 'huge']}],
            [{'color': []}, {'background': []}],
          ],
        },
      },
    };
  },
  props: {
    section: {
      type: Object,
    },
    content: {
      type: Object,
    },
    activity: {
      type: Object,
    },
  },
  computed: {
    sectionTitle: {
      get() {
        return this.section.section_title;
      },
      set(value) {
        let data = {
          target: 'section',
          act_id: this.activity.activity_id,
          tab_id: this.content.subnav_id,
          sec_id: this.section.section_id,
          param: 'section_title',
          newVal: value,
        };
        this.$store.commit('updateActivityParam', data);
      },
    },
    sectionText: {
      get() {
        return this.section.raw_html_text;
      },
      set(value) {
        let data = {
          target: 'section',
          act_id: this.activity.activity_id,
          tab_id: this.content.subnav_id,
          sec_id: this.section.section_id,
          param: 'raw_html_text',
          newVal: value,
        };
        this.$store.commit('updateActivityParam', data);
      },
    },
    numberOfImages: {
      get() {
        return this.section.number_of_images;
      },
      set(value) {
        let data = {
          target: 'section',
          act_id: this.activity.activity_id,
          tab_id: this.content.subnav_id,
          sec_id: this.section.section_id,
          param: 'number_of_images',
          newVal: parseInt(value),
        };
        this.$store.commit('updateActivityParam', data);
      },
    },
    getTableStyle() {
      if (this.section.section_id !== 1) {
        return {
          'padding-top': '20px',
          'border-top-width': '1px',
          'border-top-style': 'solid',
          'order-top-color': 'lightgrey',
        };
      }
    },
  },
  methods: {
    showMediaGalleryWindow(param) {
      let data = {
        target: 'section',
        act_id: this.activity.activity_id,
        tab_id: this.content.subnav_id,
        sec_id: this.section.section_id,
        param: param,
        newVal: null,
      };

      // temporarily keep the data object for media gallery
      this.$store.commit('updateTempDataForMediaGallery', data);

      // open the media gallery window
      this.$store.commit('updateModals', {key: 'mediaGallery', value: true});
    },
    showRemoveSectionModal() {
      // open the remove tab modal window
      this.$store.commit('updateModals', {key: 'removeSection', value: true});

      // store temp data to remove the tab
      let tempData = {};
      tempData.act_id = this.activity.activity_id;
      tempData.tab_id = this.content.subnav_id;
      tempData.sec_id = this.section.section_id;
      this.$store.commit('updateTempDataForRemoving', tempData);
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
  margin-bottom: 20px;
}

table td:first-child {
  width: 30%;
}

table td {
  padding: 2px 0;
}

textarea {
  width: 100%;
  font-size: 14px;
  padding: 10px;
}

.quill-editor {
  background-color: white;
  color: black;
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
  color: black;
  font-size: 11px;
  margin-top: 5px;
}

.choose-file {
  font-size: 10px;
}

.section-item-order p {
  float: left;
  margin-right: 20px;
}

.section-item-order div.order-icon-wrapper {
  float: left;
  margin-right: 8px;
  cursor: pointer;
}

.section-item-order div.icon-wrapper-right {
  float: right;
  margin-right: 40px;
  cursor: pointer;
}

.section-item-order .fa-icon:active {
  color: #FFD12A;
}
</style>
