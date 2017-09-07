<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div class="catalog-editor-wrapper">
    <div class="show-icon" v-show="!showThis">
      <div class="show-icon-wrapper" @click="showMore">
        <icon name="caret-down"></icon>
      </div>
    </div>
    <div class="show-icon" v-show="showThis">
      <div class="show-icon-wrapper" @click="showMore">
        <icon name="caret-up"></icon>
      </div>
    </div>
    <transition name="fade">
      <div v-show="showThis">
        <table>
          <tr>
            <td>
              <p>
                Header Title:
              </p>
            </td>
            <td>
              <input
                v-model="headerTitle"
                type="text"
                name="header-title"
                v-validate="{ rules: { required: true, max: 50 }}"
                size="35"/>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                Description:
              </p>
            </td>
            <td>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <quill-editor v-model="pageDescription"
                ref="myQuillEditor"
                :options="editorOption">
              </quill-editor>
            </td>
          </tr>
        </table>
        <ul>
          <catalog-editor-item
            v-for="item in sortItems(content.items)"
            :key="item.item_id"
            :item="item"
            :content="content"
            :activity="activity"
            >
          </catalog-editor-item>
        </ul>
        <div class="add-item" @click="addItem">
          <p>
            ADD A NEW ITEM
          </p>
        </div>
      </div>
    </transition>
    <confirm-modal
      v-if="$store.state.modals.removeItem"
      @close-modal="closeRemoveItemModal"
      @execute-command="removeItem"
      id="remove-item-modal"
      >
      <h3 slot="header">Removing An Item</h3>
      <p slot="body">The item will be removed from the list with its content. To undo it, reload the page before submitting changes.</p>
      <p slot="cancel-button">CANCEL</p>
      <p slot="execute-button">REMOVE</p>
    </confirm-modal>
  </div>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import CatalogEditorItem from './CatalogEditorItem'
import ConfirmModal        from '@/components/ConfirmModal.vue'

export default {
  name: 'catalog-editor',
  components: {
    'catalog-editor-item': CatalogEditorItem,
    'confirm-modal': ConfirmModal
  },
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
    headerTitle: {
      get () {
        return this.content.page_title
      },
      set (value) {
        let data = {
          target: 'content',
          act_id: this.activity.activity_id,
          tab_id: this.content.subnav_id,
          param: 'page_title',
          newVal: value
        }
        this.$store.commit('updateActivityParam', data)
      }
    },
    pageDescription: {
      get () {
        return this.content.page_description
      },
      set (value) {
        let data = {
          target: 'content',
          act_id: this.activity.activity_id,
          tab_id: this.content.subnav_id,
          param: 'page_description',
          newVal: value
        }
        this.$store.commit('updateActivityParam', data)
      }
    }
  },
  methods: {
    showMore () {
      this.showThis = !this.showThis
    },
    addItem () {
      let data = {}
      data.act_id = this.activity.activity_id
      data.tab_id = this.content.subnav_id
      data.itm_id = this.content.items.length + 1
      data.templateType = this.content.template_type

      this.$store.commit('addItem', data)
    },
    closeRemoveItemModal () {
      // close the remove item modal window
      this.$store.commit('updateModals', {key: 'removeItem', value: false})
    },
    removeItem () {
      this.$store.commit('removeItem')

      // close the remove item modal window
      this.$store.commit('updateModals', {key: 'removeItem', value: false})
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
}
.show-icon div.show-icon-wrapper {
  cursor: pointer;
}
.show-icon div.show-icon-wrapper .fa-icon {
  width: auto;
  height: 1.5em;
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

#remove-item-modal {
  color: black;
}

.change-order-enter-active, .change-order-leave-active {
  transition: all 1s;
}
.change-order-enter, .change-order-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  /*transform: translateY(30px);*/
}

.add-item {
  background-color: black;
  color: white;
  text-align: center;
  /*margin-left: 30px;
  margin-right: 10px;*/
  cursor: pointer;
  padding: 20px 0;
}

.add-item:hover {
  background-color: #FFD12A;
}
</style>
