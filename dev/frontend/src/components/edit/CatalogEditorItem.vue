<!-- =================================================
 Vue Template
================================================== -->
<template>
  <table :style="getTableStyle">
    <tr class="item-order">
      <td>
        <p>
          Item Order:
        </p>
      </td>
      <td>
        <p>
          {{ item.item_id }}
        </p>
        <div class="icon-wrapper-right" @click="showRemoveItemModal">
          <icon name="trash"></icon>
        </div>
      </td>
    </tr>
    <tr class="item-image">
      <td>
        <p>
          Item Image:
        </p>
      </td>
      <td class="choose-file">
        <button
          type="button"
          @click="showMediaGalleryWindow('item_image_filename')">
          Choose from gallery
        </button>
        {{ item.item_image_filename }}
      </td>
    </tr>
    <tr class="item-title">
      <td>
        <p>
          Item Title:
        </p>
      </td>
      <td>
        <input
          v-model="itemTitle"
          type="text"
          name="item-title"
          v-validate="{ rules: { required: true, max: 50 }}"
          size="35"/>
      </td>
    </tr>
    <tr class="item-caption">
      <td>
        <p>
          Item Caption:
        </p>
      </td>
      <td>
        <input
          v-model="itemCaption"
          type="text"
          name="item-caption"
          v-validate="{ rules: { required: true, max: 50 }}"
          size="35"/>
      </td>
    </tr>
    <tr>
      <td>
        <p>
          Item Description:
        </p>
      </td>
      <td>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <textarea v-model="itemDescription" rows="2">
        </textarea>
      </td>
    </tr>
  </table>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'catalog-editor-item',
  props: {
    item: {
      type: Object
    },
    content: {
      type: Object
    },
    activity: {
      type: Object
    }
  },
  computed: {
    itemTitle: {
      get () {
        return this.item.item_title
      },
      set (value) {
        let data = {
          target: 'item',
          act_id: this.activity.activity_id,
          tab_id: this.content.subnav_id,
          itm_id: this.item.item_id,
          param: 'item_title',
          newVal: value
        }
        this.$store.commit('updateActivityParam', data)
      }
    },
    itemCaption: {
      get () {
        return this.item.item_image_caption
      },
      set (value) {
        let data = {
          target: 'item',
          act_id: this.activity.activity_id,
          tab_id: this.content.subnav_id,
          itm_id: this.item.item_id,
          param: 'item_image_caption',
          newVal: value
        }
        this.$store.commit('updateActivityParam', data)
      }
    },
    itemDescription: {
      get () {
        return this.item.item_description
      },
      set (value) {
        let data = {
          target: 'item',
          act_id: this.activity.activity_id,
          tab_id: this.content.subnav_id,
          itm_id: this.item.item_id,
          param: 'item_description',
          newVal: value
        }
        this.$store.commit('updateActivityParam', data)
      }
    },
    getTableStyle () {
      if (this.item.item_id !== 1) {
        return {
          'padding-top': '20px',
          'border-top-width': '1px',
          'border-top-style': 'solid',
          'order-top-color': 'lightgrey'
        }
      }
    }
  },
  methods: {
    showMediaGalleryWindow (param) {
      let data = {
        target: 'item',
        act_id: this.activity.activity_id,
        tab_id: this.content.subnav_id,
        itm_id: this.item.item_id,
        param: param,
        newVal: null
      }

      // temporarily keep the data object for media gallery
      this.$store.commit('updateTempDataForMediaGallery', data)

      // open the media gallery window
      this.$store.commit('updateModals', {key: 'mediaGallery', value: true})
    },
    showRemoveItemModal () {
      // open the remove item modal window
      this.$store.commit('updateModals', {key: 'removeItem', value: true})

      // store temp data to remove the item
      let tempData = {}
      tempData.act_id = this.activity.activity_id
      tempData.tab_id = this.content.subnav_id
      tempData.itm_id = this.item.item_id
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

.item-order p {
  float: left;
  margin-right: 20px;
}

.item-order div.order-icon-wrapper {
  float: left;
  margin-right: 8px;
  cursor: pointer;
}

.item-order div.icon-wrapper-right {
  float: right;
  margin-right: 40px;
  cursor: pointer;
}

.item-order .fa-icon:active {
  color: #FFD12A;
}
</style>
