<!-- =================================================
 Vue Template
================================================== -->
<template>
  <li>
    <div
      class="activity-button"
      :class="{ 'first-item': isFirstItem, 'selected': isActiveTab }"
      :id="'activity-' + activity.activity_id"
      :style="[getButtonBGColor, getButtonStyle, getButtonSize, getBoxShadow]"
      @mousedown="changeColor"
      @mouseup="changeColor"
      @mouseleave="resetClick"
      @click="transitPage">

      <div class="icon-wrapper">
        <simple-svg
          :filepath="getImageStaticFilePath(activity.icon_uri)"
          :fill="getSVGColor"
          :width="'auto'"
          :height="'100%'"
        />
      </div>
      <div class="label-wrapper">
        <p
          :class="{ 'two-lines': isLong }"
          :style="(clicked && !isActiveTab) ?
          {'color': getColorInString(activity.main_color)}
          : {'color': 'white'}">
          {{ activity.button_label }}
        </p>
      </div>
      <template
        v-if="isFirstItem">
        <div class="first-item-shadow-box">
          <div class="inner-box"></div>
        </div>
      </template>

    </div>
    <div>
      <div class="spacer" :style="getSpacerBGColor">
        <div
          class="inner-spacer"
          :style="[setCurve, getInnerSpacerBGColor]">
        </div>
      </div>
    </div>
  </li>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'detail-left-nav-menu-item',
  data() {
    return {
      clicked: false, // whether this button is clicked
    };
  },
  props: {
    activity: {
      type: Object,
      // ex)
      // { "activity_id": 1,
      // "main_color": "#b74f59",
      // "sub_color": "#c3878c",
      // "button_label": "HIKING",
      // "page_title": "HIKING",
      // "white_icon_uri": "",
      // "color_icon_uri": "" }
    },
    relativePositionToActiveTab: {
      type: String, // 'left' or 'selected' or 'right' or 'else'
    },
  },
  computed: {
    getButtonBGColor() {
      if (this.clicked && !this.isActiveTab) {
        return {
          'background-color': 'white',
        };
      } else {
        return {
          'background-color': this.getColorInString(this.activity.main_color),
        };
      }
    },
    getButtonStyle() {
      return {
        'border-radius': '27px 0 0 27px',
        'box-shadow': '-10px 0px 10px 0 rgba(0, 0, 0, 0.2) inset',
        'padding': '0px 10px 0px 15px',
      };
    },
    getBoxShadow() {
      if (!this.isFirstItem && !this.isActiveTab) {
        return {
          'box-shadow': '-10px 0px 10px 0 rgba(0, 0, 0, 0.2) inset',
        };
      } else {
        return {
          'box-shadow': 'none',
        };
      }
    },
    getButtonSize() {
      return {
        width: '250px',
        height: '55px',
      };
    },
    getSpacerBGColor() {
      return {
        'background-color': this.getColorInString(
          this.$store.getters.getSelectedActivity.main_color),
      };
    },
    getInnerSpacerBGColor() {
      if (!this.$store.state.generalSettings) return;
      return {
        'background-color': this.getColorInString(
          this.$store.state.generalSettings.background_color),
      };
    },
    isFirstItem: function() {
      if (this.activity.activity_id === 1) {
        return true;
      } else {
        return false;
      }
    },
    isActiveTab: function() {
      if (this.activity.activity_id === parseInt(this.$route.params.id)) {
        return true;
      } else {
        return false;
      }
    },
    // check if this tab is at the top of the selected tab
    isTopOfSelectedTab() {
      if (this.relativePositionToActiveTab === 'top') {
        return true;
      } else {
        return false;
      }
    },
    isLong: function() {
      if (this.activity.button_label.length > 14) {
        return true;
      } else {
        return false;
      }
    },
    setCurve() {
      if (this.isActiveTab) {
        return {
          'border-top-right-radius': '10px',
        };
      } else if (this.isTopOfSelectedTab) {
        return {
          'border-bottom-right-radius': '10px',
        };
      }
    },
    getSVGColor() {
      return this.clicked && !this.isActiveTab ?
        this.getColorInString(this.activity.main_color) : 'white';
    },
  },
  methods: {
    changeColor() {
      this.clicked = !this.clicked;

      // to change the color of the top left edge of detail header
      if (this.isFirstItem && !this.isActiveTab) {
        // update clicked state in the store.js
        this.$store.commit('updateIsFirstActivityClicked', this.clicked);
      }
    },
    resetClick() {
      this.clicked = false;

      // to change the color of the top left edge of detail header
      if (this.isFirstItem && !this.isActiveTab) {
        // update clicked state in the store.js
        this.$store.commit('updateIsFirstActivityClicked', false);
      }
    },
    transitPage() {
      // change the path based on whether you are editing
      if (this.$store.state.isEditing) {
        this.$router.push({
          name: 'edit-detail',
          params: {id: this.activity.activity_id},
        });
      } else {
        this.$router.push({
          name: 'detail',
          params: {id: this.activity.activity_id},
        });
      }
    },
  },
};
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
li {
  display: inline;
}

div.activity-button {
  /*width: 250px;
  height: 55px;
  border-radius: 27px 0 0 27px;
  box-shadow: -10px 0px 10px 0 rgba(0, 0, 0, 0.2) inset;
  padding: 0px 10px 0px 15px;*/
}

div.activity-button.selected {
  box-shadow: none;
}

div.activity-button.first-item {
  box-shadow: none;
  padding-right: 0px;
}

div.spacer {
  width: 250px;
  height: 10px;
}

div.spacer .inner-spacer {
  height: 100%;
  width: 100%;
}

div.icon-wrapper {
  float: left;
  width: 40px;
  height: 100%;
  margin-right: 5px;
  padding: 10px 0 10px 0;
}

div.icon-wrapper svg {
  height: 100%;
  max-width: 36px;
}

div.label-wrapper {
  float: left;
  height: 100%;
  width: 180px;
}

div.label-wrapper p {
  color: white;
  font-size: 20px;
  padding-top: 19px;
  line-height: 20px;
}

div.label-wrapper p.two-lines {
  font-size: 20px;
  padding-top: 9px;
}

div.first-item-shadow-box {
  position: absolute;
  left: 20px;
  height: 55px;
  width: 250px;
}

div.first-item.selected .first-item-shadow-box {
  display: none;
}

div.first-item-shadow-box .inner-box {
  height: 35px;
  width: 230px;
  margin-top: 20px;
  box-shadow: -10px 0 10px -6px rgba(0, 0, 0, 0.2) inset;
}
</style>
