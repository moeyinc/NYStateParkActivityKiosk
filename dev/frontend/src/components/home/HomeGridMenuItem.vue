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

      <img :src="getImgSrc" :style="getImgSize">
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
    getShadow () {
      let theme = this.$store.state.generalSettings.design_theme
      if (theme === 'basic') {
        if (this.clicked) {
          return {
            'top': '5px',
            'left': '5px',
            'box-shadow': '5px 5px 5px 0px rgba(0, 0, 0, 0.2)'
          }
        } else {
          return {
            'box-shadow': '0px 0px 5px 0px rgba(0, 0, 0, 0.2)'
          }
        }
      } else if (theme === 'image') {
        return {
          'box-shadow': 'none'
        }
      }
    },
    getSize () {
      let total = this.$store.state.activities.length
      let theme = this.$store.state.generalSettings.design_theme
      let width, height, margin, padding

      if (theme === 'basic') {
        switch (total) {
          case 3:
            width = '460px'
            height = '460px'
            margin = '15px 20px'
            padding = '80px 10px 20px 10px'
            break
          case 4:
            width = '560px'
            height = '330px'
            margin = '15px 20px'
            padding = '40px 10px'
            break
          case 5:
          case 6:
            width = '460px'
            height = '330px'
            margin = '15px 20px'
            padding = '40px 10px'
            break
          case 7:
          case 8:
            width = '405px'
            height = '330px'
            margin = '15px 20px'
            padding = '40px 10px'
            break
          case 9:
            width = '460px'
            height = '234px'
            margin = '15px 20px'
            padding = '20px 10px'
            break
          case 10:
          case 11:
          case 12:
            width = '405px'
            height = '234px'
            margin = '15px 20px'
            padding = '20px 10px'
            break
          case 13:
          case 14:
          case 15:
            width = '342px'
            height = '234px'
            margin = '15px 14px'
            padding = '20px 10px'
            break
        }
      } else if (theme === 'image') {
        switch (total) {
          case 3:
          case 4: //
            width = '405px'
            height = '330px'
            margin = '15px 20px'
            padding = '50px 20px 30px 20px'
            break
          case 5:
          case 6: //
            width = '405px'
            height = '260px'
            margin = '15px 20px'
            padding = '30px 20px'
            break
          case 7:
          case 8: //
            width = '405px'
            height = '260px'
            margin = '15px 20px'
            padding = '30px 20px'
            break
        }
      }

      return {
        width: width,
        height: height,
        margin: margin,
        padding: padding
      }
    },
    getTextSize () {
      let total = this.$store.state.activities.length
      let theme = this.$store.state.generalSettings.design_theme
      let fontSize, lineHeight

      if (theme === 'basic') {
        switch (total) {
          case 3:
            fontSize =  '48px'
            break
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
            fontSize =  '32px'
            break
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
            fontSize =  '28px'
            break
        }
      } else if (theme === 'image') {
        switch (total) {
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8: //
            fontSize =  '30px'
            lineHeight = '33px'
            break
        }
      }

      return {
        'font-size': fontSize,
        'line-height': lineHeight
      }
    },
    getFont () {
      if (this.$store.state.generalSettings.design_theme === 'basic') {
        return {
          'font-family': 'Avenir-Medium'
        }
      } else if (this.$store.state.generalSettings.design_theme === 'image') {
        return {
          'font-family': 'Futura-Bold'
        }
      }
    },
    getImgSrc () {
      return this.clicked ? this.getImageStaticFilePath(this.activity.color_icon_uri) : this.getImageStaticFilePath(this.activity.white_icon_uri)
    },
    getImgSize () {
      let total = this.$store.state.activities.length
      let theme = this.$store.state.generalSettings.design_theme
      let height

      if (theme === 'basic') {
        switch (total) {
          case 3:
            height = '240px'
            break
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            height = '200px'
            break
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
            height = '150px'
            break
        }
      } else if (theme === 'image') {
        switch (total) {
          case 3:
          case 4:
            height = '160px'
            break
          case 5:
          case 6:
          case 7:
          case 8:
            height = '130px'
            break
        }
      }

      return {
        height: height
      }
    },
    getLabelHeight () {
      let total = this.$store.state.activities.length
      let theme = this.$store.state.generalSettings.design_theme
      let height

      if (theme === 'basic') {
        switch (total) {
          case 3:
            height = '240px'
            break
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            height = '200px'
            break
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
            height = '150px'
            break
        }
      } else if (theme === 'image') {
        switch (total) {
          case 3:
          case 4:
            height = '110px'
            break
          case 5:
          case 6:
          case 7:
          case 8:
            height = '90px'
            break
        }
      }

      return {
        height: height
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
