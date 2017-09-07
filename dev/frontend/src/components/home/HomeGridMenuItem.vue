<!-- =================================================
 Vue Template
================================================== -->
<template>
  <li>
    <div
      class="activity-button"
      :id="'activity-' + activity.activity_id"
      :style="[getBGColor, getSize]"
      @mousedown="changeColor"
      @mouseup="changeColor"
      @mouseleave="resetClick"
      @click="transitPage">

      <img :src="getImgSrc" :style="getImgSize">

      <p
        :class="{ long: isLong }"
        :style="[getColor, getTextSize]">
        {{ activity.button_label }}
      </p>
    </div>
    </li>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'home-grid-menu-item',
  data () {
    return {
      clicked: false // whether this button is clicked
    }
  },
  props: {
    activity: {
      type: Object
    },
    total: {
      type: Number
    }
  },
  computed: {
    // check if the activity name is too long to fit the button
    isLong () {
      if (this.activity.button_label.length > 17) {
        return true
      } else {
        return false
      }
    },
    getBGColor () {
      return this.clicked ? {'background-color': 'white'} : {'background-color': this.getColorInString(this.activity.main_color)}
    },
    getColor () {
      return this.clicked ? {'color': this.getColorInString(this.activity.main_color)} : {'color': 'white'}
    },
    getSize () {
      if (this.total === 4) {
        return {
          width: '560px',
          height: '330px',
          margin: '15px 20px',
          padding: '40px 10px'
        }
      } else if (this.total >= 5 && this.total <= 6) {
        return {
          width: '460px',
          height: '330px',
          margin: '15px 20px',
          padding: '40px 10px'
        }
      } else if (this.total >= 7 && this.total <= 8) {
        return {
          width: '405px',
          height: '330px',
          margin: '15px 20px',
          padding: '40px 10px'
        }
      } else if (this.total === 9) {
        return {
          width: '460px',
          height: '234px',
          margin: '15px 20px',
          padding: '20px 10px'
        }
      } else if (this.total >= 10 && this.total <= 12) {
        return {
          width: '405px',
          height: '234px',
          margin: '15px 20px',
          padding: '20px 10px'
        }
      } else if (this.total >= 13 && this.total <= 15) {
        return {
          width: '342px',
          height: '234px',
          margin: '15px 14px',
          padding: '20px 10px'
        }
      }
    },
    getTextSize () {
      if (this.total === 4) {
        return {
          'margin-top': '10px',
          'font-size': '32px'
        }
      } else if (this.total >= 5 && this.total <= 6) {
        return {
          'margin-top': '10px',
          'font-size': '32px'
        }
      } else if (this.total >= 7 && this.total <= 8) {
        return {
          'margin-top': '10px',
          'font-size': '32px'
        }
      } else if (this.total === 9) {
        return {
          'margin-top': '10px',
          'font-size': '32px'
        }
      } else if (this.total >= 10 && this.total <= 12) {
        return {
          'margin-top': '10px',
          'font-size': '28px'
        }
      } else if (this.total >= 13 && this.total <= 15) {
        return {
          'margin-top': '10px',
          'font-size': '28px'
        }
      }
    },
    getImgSrc () {
      return this.clicked ? this.getImageStaticFilePath(this.activity.color_icon_uri) : this.getImageStaticFilePath(this.activity.white_icon_uri)
    },
    getImgSize () {
      if (this.total === 4) {
        return {
          height: '200px'
        }
      } else if (this.total >= 5 && this.total <= 6) {
        return {
          height: '200px'
        }
      } else if (this.total >= 7 && this.total <= 8) {
        return {
          height: '200px'
        }
      } else if (this.total === 9) {
        return {
          height: '150px'
        }
      } else if (this.total >= 10 && this.total <= 12) {
        return {
          height: '150px'
        }
      } else if (this.total >= 13 && this.total <= 15) {
        return {
          height: '150px'
        }
      }
    }
  },
  methods: {
    changeColor () {
      this.clicked = !this.clicked
    },
    resetClick () {
      this.clicked = false
    },
    transitPage () {
      // change the path based on whether you are editing
      if (this.$store.state.isEditing) {
        // if you are editing, disable the link
        // this.$router.push({ name: 'edit-detail', params: { id: this.activity.activity_id } })
      } else {
        this.$router.push({ name: 'detail', params: { id: this.activity.activity_id } })
      }
    }
  }
}
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
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: relative;
}

div.activity-button img {
  /*height: 150px;*/
}

div.activity-button p {
  color: white;
  margin-top: 10px;
  font-size: 32px;
}

div.activity-button p.long {
  margin-top: 17px;
  font-size: 0.75em;
}

div.activity-button:active {
  background-color: white !important;
  top: 5px;
  left: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
}
</style>
