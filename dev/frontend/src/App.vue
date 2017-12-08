<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="app" @click="resetCMSTimer()" @mousemove="resetCMSTimer()">
    <edit-header v-if="this.$store.state.isEditing"></edit-header>
    <edit-panel v-if="this.$store.state.isEditing"></edit-panel>
    <router-view name="page"></router-view>
    <p class="footer-notes" v-if="this.$store.state.isEditing">
      *We recommend using Google Chrome browser because it’s the same browser used in the actual kiosk stands.
    </p>
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import EditHeader  from '@/components/edit/EditHeader.vue'
import EditPanel   from '@/components/edit/EditPanel.vue'
require('@/assets/css/normalize.css')
require('@/assets/css/ripple.css')

export default {
  name: 'app',
  components: {
    'edit-header' : EditHeader,
    'edit-panel'  : EditPanel
  },
  data () {
    return {
      CMSTimer: null
    }
  },
  created () {
    // CMS reset timer
    this.resetCMSTimer()
    // this.$session.set('test-key', 'test-value')
    console.log('session: ', this.$session.getAll())
    console.log('route information: ', this.$route)
    // get root path
    const rootPath = this.$route.path.substring(1, 5)
    if (rootPath === 'edit') {
      // turn edit mode on to display edit panel
      this.$store.commit('updateIsEditing', true)
    }
  },
  mounted () {
    this.resizeComponents()
    window.addEventListener('resize', this.resizeComponents)
  },
  methods: {
    resizeComponents () {
      // calc zoom value
      let zoom
      const monitorWidth  = 1920
      const monitorHeight = 1080
      let ratioW = window.innerWidth / monitorWidth
      let ratioH = window.innerHeight / monitorHeight
      ratioW < ratioH ? zoom = ratioW : zoom = ratioH

      const editHeaderHeight = 60
      const editPanelWidth   = 640

      // set size object for store.js
      let size = {
        zoom: zoom,
        monitor:      {w: monitorWidth,                       h: monitorHeight},
        window:       {w: window.innerWidth,                  h: window.innerHeight},
        page:         {w: window.innerWidth * zoom,           h: window.innerHeight * zoom},
        editHeader:   {w: window.innerWidth * zoom,           h: editHeaderHeight},
        editPanel:    {w: editPanelWidth,                     h: window.innerHeight - editHeaderHeight},
        previewPanel: {w: window.innerWidth - editPanelWidth, h: window.innerWidth - editHeaderHeight}
      }
      console.log('updating UI size data from app')
      this.$store.commit('updateSize', size)
    },
    resetCMSTimer () {
      // console.log('resetting timer')
      clearTimeout(this.CMSTimer)
      this.CMSTimer = setTimeout(this.goLoginScreen, 60 * 60 * 1000) // 1 hour
    },
    goLoginScreen () {
      if (this.$store.state.isEditing) {
        console.log('CMStimer is timeout!')
        // force logout
        this.$store.commit('updateAuthentication', false)
        this.$store.commit('updateIsEditing', false)
        this.$router.push({ name: 'login' })
      } else {
        // if you are not editing, do nothing
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeComponents)
  }
}
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style>
/*-------- for touch screens --------*/
html {
  /*cursor: none;*/
  user-select: none;
}

a {
  /*cursor: none;*/
}

/*-------- fonts --------*/
@font-face {
  font-family: "Avenir-Medium";
  src: url("./assets/fonts/Avenir-Medium.ttf");
}

@font-face {
  font-family: "Avenir-Heavy";
  src: url("./assets/fonts/Avenir-Heavy.ttf");
}

@font-face {
  font-family: "Agenda-Bold";
  src: url("./assets/fonts/AgendaBold.ttf");
}

@font-face {
  font-family: "Futura-Bold";
  src: url("./assets/fonts/FuturaBold.otf");
}

/*-------- common styles --------*/

body {
  letter-spacing: 2px;
  font-family: "Avenir-Medium";
}

.image-frame {
  border: 2px;
  border-style: solid;
  border-color: #0a3c5b;
  overflow: hidden;
}

img.image-center {
  width: 100%;
  display: block;
  margin: auto;
}

/* additional */
.footer-notes {
  position: absolute;
  width: 100%;
  bottom: 0;
  text-align: right;
  font-size: 12px;
  color: grey;
}
</style>
