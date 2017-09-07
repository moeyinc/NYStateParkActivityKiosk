<!-- =================================================
 Vue Template
================================================== -->
<template>
  <li>
    <div
      :id="'submenu-item-' + content.subnav_id"
      class="tab-item"
      :class="{ 'active': isActiveTab }"
      :style="isActiveTab ? {'color': getColorInString($store.state.generalSettings.text_color)} : {'background-color': getColorInString($store.getters.getSelectedActivity.sub_color)}"
      @click="switchTab">
      <div class="label-wrapper">
        <span>{{ content.subnav_label }}</span>
      </div>
      <div
        v-if="isFirstItem"
        :class="{ 'first-tab-shadow-box': !isActiveTab }">
      </div>
    </div>
    <div
      class="right-spacer"
      :class="{ 'edge-needed': isActiveTab || isLeftOfSelectedTab }">
      <div
        :style="{'background-color': getColorInString($store.getters.getSelectedActivity.main_color)}"
        :class="[{ 'right-edge': isActiveTab }, { 'left-edge': isLeftOfSelectedTab }]">
      </div>
    </div>
  </li>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'detail-sub-nav-menu-item',
  props: {
    content: {
      type: Object // ex) {"activity_id" : 1, "subnav_id" : 1, "subnav_label" : "GENERAL INFO", "template_type" : "top", "articles": [{"article_id": 1,"left_image_uri" : "","right_image_uri" : "","raw_html_text" : "</p>......</p>"}]}
    },
    relativePositionToActiveTab: {
      type: String // 'left' or 'selected' or 'right' or 'else'
    }
  },
  computed: {
    // check if this tab is the first one at left
    isFirstItem () {
      if (this.content.subnav_id === 1) {
        return true
      } else {
        return false
      }
    },
    // check if this tab is the selected tab
    isActiveTab () {
      if (this.relativePositionToActiveTab === 'selected') {
        return true
      } else {
        return false
      }
    },
    // check if this tab is at the left of the selected tab
    isLeftOfSelectedTab () {
      if (this.relativePositionToActiveTab === 'left') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    switchTab () {
      this.$emit('switch-tab', this.content.subnav_id)
    }
  }
}
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
div.tab-item, div.right-spacer {
	float: left;
  position: relative;
	display: block;
  color: white;
}

div.tab-item {
  height: 72px;
  width: 370px;
  text-align: center;
  padding-top: 18px;
  line-height: 40px;
  font-size: 40px;
  margin-bottom: -1px;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -5px 5px -2px rgba(0, 0, 0, 0.2) inset;
}

div.tab-item#submenu-item-1 {
  box-shadow: none;
}

div.tab-item#submenu-item-1 .label-wrapper {
  height: 54px;
}

div.tab-item#submenu-item-1 .first-tab-shadow-box {
  display: block;
  height: 20px;
  width: 370px;
  margin-left: 20px;
  box-shadow: 0 -5px 5px -2px rgba(0, 0, 0, 0.2);
}

div.right-spacer {
  height: 72px;
  width: 20px;
  margin-bottom: 0px;
}

div.right-spacer>div {
  height: 100%;
  width: 100%;
}

div.active {
  background-color: white;
  opacity: 1.0;
  box-shadow: none;
}

div.right-spacer.edge-needed {
  background-color: white;
  opacity: 1.0;
}

div.right-spacer.edge-needed div.right-edge {
  border-radius: 0 0 0 20px;
}

div.right-spacer.edge-needed div.left-edge {
  border-radius: 0 0 20px 0;
}
</style>
