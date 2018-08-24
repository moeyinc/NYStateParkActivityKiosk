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
      return {
        'box-shadow': 'none',
      };
    },
    getSize() {
      let total = this.$store.state.activities.length;
      let width; let height; let margin; let padding;

      switch (total) {
        case 3:
        case 4: //
          width = '405px';
          height = '330px';
          margin = '15px 20px';
          padding = '50px 20px 30px 20px';
          break;
        case 5:
        case 6: //
          width = '405px';
          height = '260px';
          margin = '15px 20px';
          padding = '30px 20px';
          break;
        case 7:
        case 8: //
          width = '405px';
          height = '260px';
          margin = '15px 20px';
          padding = '30px 20px';
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
        case 4:
        case 5:
        case 6:
        case 7:
        case 8: //
          fontSize = '30px';
          lineHeight = '33px';
          break;
      }

      return {
        'font-size': fontSize,
        'line-height': lineHeight,
      };
    },
    getFont() {
      return {
        'font-family': 'Futura-Bold',
      };
    },
    getSVGImgSize() {
      let total = this.$store.state.activities.length;
      let height;

      switch (total) {
        case 3:
        case 4:
          height = '160px';
          break;
        case 5:
        case 6:
        case 7:
        case 8:
          height = '130px';
          break;
      }

      return height;
    },
    getLabelHeight() {
      let total = this.$store.state.activities.length;
      let height;

      switch (total) {
        case 3:
        case 4:
          height = '110px';
          break;
        case 5:
        case 6:
        case 7:
        case 8:
          height = '90px';
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
<style scoped lang='stylus'>
li
  display: inline

div.activity-button
  float: left
  border-radius: 50px
  text-align: center
  position: relative

div.label
  display: table
  text-align: center
  width: 100%

div.label p
  display: table-cell
  vertical-align: middle
</style>
