<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div class="locations-editor-wrapper">
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
        <transition-group name="change-order" tag="ul">
          <location-editor-item
            v-for="section in sortSections(content.sections)"
            :section="section"
            :content="content"
            :activity="activity"
            :key="section.section_id">
          </location-editor-item>
        </transition-group>
        <div class="add-section" @click="addSection">
          <p>
            ADD A NEW SECTION
          </p>
        </div>
      </div>
    </transition>
    <confirm-modal
      v-if="$store.state.modals.removeSection"
      @close-modal="closeRemoveSectionModal"
      @execute-command="removeSection"
      id="remove-section-modal"
      >
      <h3 slot="header">Removing A Section</h3>
      <p slot="body">The section will be removed from the list with its content. To undo it, reload the page before submitting changes.</p>
      <p slot="cancel-button">CANCEL</p>
      <p slot="execute-button">REMOVE</p>
    </confirm-modal>
  </div>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
import LocationEditorItem from './LocationEditorItem.vue'
import ConfirmModal        from '@/components/ConfirmModal.vue'

export default {
  name: 'locations-editor',
  components: {
    'location-editor-item': LocationEditorItem,
    'confirm-modal': ConfirmModal
  },
  data () {
    return {
      showThis: false
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
    }
  },
  methods: {
    showMore () {
      this.showThis = !this.showThis
    },
    addSection () {
      let data = {}
      data.act_id = this.activity.activity_id
      data.tab_id = this.content.subnav_id
      data.sec_id = this.content.sections.length + 1
      data.templateType = this.content.template_type

      this.$store.commit('addSection', data)
    },
    closeRemoveSectionModal () {
      // close the remove section modal window
      this.$store.commit('updateModals', {key: 'removeSection', value: false})
    },
    removeSection () {
      this.$store.commit('removeSection')

      // close the remove section modal window
      this.$store.commit('updateModals', {key: 'removeSection', value: false})
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
  width: 35%;
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

#remove-section-modal {
  color: black;
}


.change-order-enter-active, .change-order-leave-active {
  transition: all 1s;
}
.change-order-enter, .change-order-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  /*transform: translateY(30px);*/
}

.add-section {
  background-color: black;
  color: white;
  text-align: center;
  /*margin-left: 30px;
  margin-right: 10px;*/
  cursor: pointer;
  padding: 20px 0;
  border-radius: 3px;
}

.add-section:hover {
  background-color: #FFD12A;
}
</style>
