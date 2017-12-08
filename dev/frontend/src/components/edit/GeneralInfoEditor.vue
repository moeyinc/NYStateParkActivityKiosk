<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div class="general-info-editor-wrapper">
    <div class="show-icon" v-show="!showThis">
      <div class="show-icon-label">Show more</div>
      <div class="show-icon-wrapper" @click="showMore">
        <icon name="caret-down"></icon>
      </div>
    </div>
    <div class="show-icon" v-show="showThis">
      <div class="show-icon-wrapper" @click="showMore">
        <div class="show-icon-label">Show less</div>
        <icon name="caret-up"></icon>
      </div>
    </div>
    <transition name="fade">
    <table v-show="showThis">
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
          </select>
        </td>
      </tr>
      <tr>
        <td>
          <p>
            Left Image:
          </p>
        </td>
        <td class="choose-file">
          <button type="button" @click="showMediaGalleryWindow('left_image_uri')">Choose from gallery</button>
          {{ content.left_image_uri }}
        </td>
      </tr>
      <tr>
        <td>
          <p>
            Right Image:
          </p>
        </td>
        <td class="choose-file">
          <button type="button" @click="showMediaGalleryWindow('right_image_uri')">Choose from gallery</button>
          {{ content.right_image_uri }}
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
          <quill-editor v-model="contentText"
            ref="myQuillEditor"
            :options="editorOption">
          </quill-editor>
        </td>
      </tr>
    </table>
    </transition>
  </div>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
// import Quill from 'quill'
// import { ImageResize } from 'quill-image-resize-module'
// Quill.register('modules/imageResize', ImageResize)

export default {
  name: 'general-info-editor',
  data () {
    return {
      showThis: false,
      editorOption: {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'size': ['small', false, 'large', 'huge']}],
            [{'color': []}, {'background': []}]
          ]
        }
      }
    }
  },
  props: {
    content: {
      type: Object
    },
    activity: {
      type: Object
    }
  },
  computed: {
    contentText: {
      get () {
        return this.content.raw_html_text
      },
      set (value) {
        let data = {
          target: 'content',
          act_id: this.activity.activity_id,
          tab_id: this.content.subnav_id,
          param: 'raw_html_text',
          newVal: value
        }
        this.$store.commit('updateActivityParam', data)
      }
    },
    numberOfImages: {
      get () {
        return this.content.number_of_images
      },
      set (value) {
        let data = {
          target: 'content',
          act_id: this.activity.activity_id,
          tab_id: this.content.subnav_id,
          param: 'number_of_images',
          newVal: parseInt(value)
        }
        this.$store.commit('updateActivityParam', data)
      }
    }
  },
  methods: {
    showMore () {
      this.showThis = !this.showThis
    },
    showMediaGalleryWindow (param) {
      let data = {
        target: 'content',
        act_id: this.activity.activity_id,
        tab_id: this.content.subnav_id,
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
table {
  width: 100%;
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

.show-icon {
  width: 100%;
  text-align: center;
  margin-top: 10px;
  color: #cccccc;
}
.show-icon div.show-icon-wrapper {
  cursor: pointer;
}
.show-icon div.show-icon-wrapper .fa-icon {
  width: auto;
  height: 1.5em;
}
.show-icon-label {
  font-size: 12px;
  color: #cccccc;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}

.choose-file {
  font-size: 10px;
}
</style>
