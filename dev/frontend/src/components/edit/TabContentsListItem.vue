<!-- =================================================
 Vue Template
================================================== -->
<template>
  <li>
    <div class="in-li clearfix">
        <table>
          <tr class="tab-item-order">
            <td>
              <p>
                Order:
              </p>
            </td>
            <td>
              <p>
                {{content.subnav_id}}
              </p>
              <div class="order-icon-wrapper" @click="changeOrder(-1)">
                <icon name="arrow-circle-up"></icon>
              </div>
              <div class="order-icon-wrapper" @click="changeOrder(1)">
                <icon name="arrow-circle-down"></icon>
              </div>
              <div class="icon-wrapper-right" @click="showRemoveTabModal">
                <icon name="trash"></icon>
              </div>
            </td>
          </tr>
          <tr class="tab-label">
            <td>
              <p>
                Tab Label:
              </p>
            </td>
            <td>
              <input
                v-model="tabLabel"
                type="text"
                :name="'tab-label-' + content.subnav_id"
                v-validate="{ rules: { required: true, max: 15 }}"
                size="15"/>
            </td>
          </tr>
          <tr v-show="errors.has('tab-label-' + content.subnav_id)" class="error-message">
            <td></td><td>{{ errors.first('tab-label-' + content.subnav_id)}}</td>
          </tr>
          <tr class="tab-template-type">
            <td>
              <p>
                Template Type:
              </p>
            </td>
            <td>
              <!-- <select v-model="tabTemplateType">
                <option value="GENERAL INFO">GENERAL INFO</option>
                <option value="LOCATIONS">LOCATIONS</option>
                <option value="CATALOG">CATALOG</option>
                <option value="GALLERY">GALLERY</option>
              </select> -->
              <p>
                {{ content.template_type }}
              </p>
            </td>
          </tr>
        </table>
        <general-info-editor
          v-if="tabTemplateType === 'GENERAL INFO'"
          :content="content"
          :activity="activity">
        </general-info-editor>
        <locations-editor
          v-if="tabTemplateType === 'LOCATIONS'"
          :content="content"
          :activity="activity">
        </locations-editor>
        <catalog-editor
          v-if="tabTemplateType === 'CATALOG'"
          :content="content"
          :activity="activity">
        </catalog-editor>
        <gallery-editor
          v-if="tabTemplateType === 'GALLERY'"
          :content="content"
          :activity="activity">
        </gallery-editor>
    </div>
  </li>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import GeneralInfoEditor from './GeneralInfoEditor.vue'
import LocationsEditor   from './LocationsEditor.vue'
import CatalogEditor     from './CatalogEditor.vue'
import GalleryEditor     from './GalleryEditor.vue'

export default {
  name: 'tab-contents-list-item',
  components: {
    'general-info-editor': GeneralInfoEditor,
    'locations-editor'   : LocationsEditor,
    'catalog-editor'     : CatalogEditor,
    'gallery-editor'     : GalleryEditor
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
    tabLabel: {
      get () {
        return this.content.subnav_label
      },
      set (value) {
        let data = {
          target: 'content',
          act_id: this.activity.activity_id,
          tab_id: this.content.subnav_id,
          param: 'subnav_label',
          newVal: value
        }
        this.$store.commit('updateActivityParam', data)
      }
    },
    tabTemplateType: {
      get () {
        return this.content.template_type
      },
      set (value) {
        let data = {
          target: 'content',
          act_id: this.activity.activity_id,
          tab_id: this.content.subnav_id,
          param: 'template_type',
          newVal: value
        }
        this.$store.commit('updateActivityParam', data)
      }
    },
    getBGColor () {
      return {
        'background': this.activity.sub_color
      }
    }
  },
  methods: {
    changeOrder (value) {
      let actId = this.activity.activity_id
      let tabId = this.content.subnav_id

      // check the index and value
      const minIndex = 1
      const maxIndex = this.activity.contents.length
      if (tabId <= minIndex && value === -1) {
        console.log('canceled decreasing order because it is at the top of the list')
        return
      } else if (tabId >= maxIndex && value === 1) {
        console.log('canceled increasing order because it is at the bottom of the list')
        return
      }

      this.$store.commit('changeContentOrder', {act_id: actId, tab_id: tabId, value: value})
    },
    showRemoveTabModal () {
      // open the remove tab modal window
      this.$store.commit('updateModals', {key: 'removeTab', value: true})

      // store temp data to remove the tab
      let tempData = {}
      tempData.act_id = this.activity.activity_id
      tempData.tab_id = this.content.subnav_id
      this.$store.commit('updateTempDataForRemoving', tempData)
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
  color: black;
  font-size: 11px;
  margin-top: 5px;
}

.tab-item-order p {
  float: left;
  margin-right: 20px;
}

.tab-item-order div.order-icon-wrapper {
  float: left;
  margin-right: 8px;
  cursor: pointer;
}

.tab-item-order div.icon-wrapper-right {
  float: right;
  /*margin-right: 8px;*/
  cursor: pointer;
}

.tab-item-order .fa-icon:active {
  color: #FFD12A;
}

</style>
