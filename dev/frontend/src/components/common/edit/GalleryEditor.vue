<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div class="gallery-editor-wrapper">
    <div class="show-icon" v-show="!showThis">
      <div class="show-icon-label">Show more</div>
      <div class="show-icon-wrapper" @click="showMore">
        <icon name="caret-down"></icon>
      </div>
    </div>
    <div class="show-icon" v-show="showThis">
      <div class="show-icon-label">Show less</div>
      <div class="show-icon-wrapper" @click="showMore">
        <icon name="caret-up"></icon>
      </div>
    </div>
    <transition name="fade">
      <div v-show="showThis">
        <ul>
          <gallery-editor-item
            v-for="item in content.items"
            :key="item.item_id"
            :item="item"
            :content="content"
            :activity="activity"
            >
          </gallery-editor-item>
        </ul>
        <div class="add-item" @click="addItem">
          <p>
            ADD A NEW ITEM
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import GalleryEditorItem from './GalleryEditorItem';
import ConfirmModal from '../ConfirmModal.vue';

export default {
  name: 'gallery-editor',
  components: {
    'gallery-editor-item': GalleryEditorItem,
    'confirm-modal': ConfirmModal,
  },
  data() {
    return {
      showThis: false,
    };
  },
  props: {
    content: {
      type: Object,
    },
    activity: {
      type: Object,
    },
  },
  methods: {
    showMore() {
      this.showThis = !this.showThis;
    },
    addItem() {
      let data = {};
      data.act_id = this.activity.activity_id;
      data.tab_id = this.content.subnav_id;
      data.itm_id = this.content.items.length + 1;
      data.templateType = this.content.template_type;

      this.$store.commit('addItem', data);
    },
    closeRemoveItemModal() {
      // close the remove item modal window
      this.$store.commit('updateModals', {key: 'removeItem', value: false});
    },
    removeItem() {
      this.$store.commit('removeItem');

      // close the remove item modal window
      this.$store.commit('updateModals', {key: 'removeItem', value: false});
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

#remove-item-modal {
  color: black;
}

.change-order-enter-active, .change-order-leave-active {
  transition: all 1s;
}
.change-order-enter, .change-order-leave-to {
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
  border-radius: 3px;
}

.add-item:hover {
  background-color: #FFD12A;
}
</style>
