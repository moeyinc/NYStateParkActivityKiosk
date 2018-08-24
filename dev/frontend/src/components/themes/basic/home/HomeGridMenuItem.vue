<!-- =================================================
 Vue Template
================================================== -->
<template>
  <li>
    <div
      class="activity-button"
      :id="'activity-' + activity.activity_id"
      :style="[getBGColor, getShadow, getSize]"
      @mousedown="changeColor"
      @mouseup="changeColor"
      @mouseleave="resetClick"
      @click="transitPage">

      <simple-svg
        :filepath="getImageStaticFilePath(activity.icon_uri)"
        :fill="getSVGColor"
        :width="'auto'"
        :height="getSVGImgSize"
      />
      <div class="label" :style="getLabelHeight">
        <p
          :class="{ long: isLong }"
          :style="[getColor, getTextSize, getFont]">
          {{ activity.button_label }}
        </p>
      </div>
    </div>
    </li>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'home-grid-menu-item',
  data() {
    return {
      clicked: false, // whether this button is clicked
    };
  },
  props: {
    activity: {
      type: Object,
    },
    total: {
      type: Number,
    },
  },
  computed: {
    // check if the activity name is too long to fit the button
    isLong() {
      if (this.activity.button_label.length > 17) {
        return true;
      } else {
        return false;
      }
    },
    getBGColor() {
      return this.clicked ?
        {'background-color': 'white'} :
        {'background-color': this.getColorInString(this.activity.main_color)};
    },
    getColor() {
      return this.clicked ?
        {'color': this.getColorInString(this.activity.main_color)} :
        {'color': 'white'};
    },
    getSVGColor() {
      return this.clicked ?
        this.getColorInString(this.activity.main_color) :
        'white';
    },
    getShadow() {
      if (this.clicked) {
        return {
          'top': '5px',
          'left': '5px',
          'box-shadow': '0px 0px 5px 0px rgba(0, 0, 0, 0.2)',
        };
      } else {
        return {
          'box-shadow': '5px 5px 5px 0px rgba(0, 0, 0, 0.2)',
        };
      }
    },
    getSize() {
      let total = this.$store.state.activities.length;
      let width; let height; let margin; let padding;

      switch (total) {
        case 3:
          width = '460px';
          height = '460px';
          margin = '15px 20px';
          padding = '80px 10px 20px 10px';
          break;
        case 4:
          width = '560px';
          height = '330px';
          margin = '15px 20px';
          padding = '40px 10px';
          break;
        case 5:
        case 6:
          width = '460px';
          height = '330px';
          margin = '15px 20px';
          padding = '40px 10px';
          break;
        case 7:
        case 8:
          width = '405px';
          height = '330px';
          margin = '15px 20px';
          padding = '40px 10px';
          break;
        case 9:
          width = '460px';
          height = '234px';
          margin = '15px 20px';
          padding = '20px 10px';
          break;
        case 10:
        case 11:
        case 12:
          width = '405px';
          height = '234px';
          margin = '15px 20px';
          padding = '20px 10px';
          break;
        case 13:
        case 14:
        case 15:
          width = '342px';
          height = '234px';
          margin = '15px 14px';
          padding = '20px 10px';
          break;
      }

      return {
        width: width,
        height: height,
        margin: margin,
        padding: padding,
      };
    },
    getTextSize() {
      let total = this.$store.state.activities.length;
      let fontSize; let lineHeight;

      switch (total) {
        case 3:
          fontSize = '48px';
          break;
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
          fontSize = '32px';
          break;
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
          fontSize = '28px';
          break;
      }

      return {
        'font-size': fontSize,
        'line-height': lineHeight,
      };
    },
    getFont() {
      return {
        'font-family': 'Avenir-Medium',
      };
    },
    getSVGImgSize() {
      let total = this.$store.state.activities.length;
      let height;

      switch (total) {
        case 3:
          height = '240px';
          break;
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
          height = '200px';
          break;
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
          height = '150px';
          break;
      }

      return height;
    },
    getLabelHeight() {
      let total = this.$store.state.activities.length;
      let height;

      switch (total) {
        case 3:
          height = '136px';
          break;
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
          height = '84px';
          break;
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
          height = '60px';
          break;
      }

      return {
        height: height,
      };
    },
  },
  methods: {
    changeColor() {
      this.clicked = !this.clicked;
    },
    resetClick() {
      this.clicked = false;
    },
    transitPage() {
      // change the path based on whether you are editing
      if (this.$store.state.isEditing) {
        // if you are editing, disable the link
        // this.$router.push({ name: 'edit-detail',
        // params: { id: this.activity.activity_id } })
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
  float: left;
  /*width: 405px;
  height: 234px;
  margin: 15px 20px 15px 20px;
  padding: 20px 10px 20px 20px;*/
  border-radius: 50px;
  /*box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.2);*/
  text-align: center;
  position: relative;
}

div.label {
  display: table;
  text-align: center;
  width: 100%;
}

div.label p {
  display: table-cell;
  vertical-align: middle;
}
</style>
