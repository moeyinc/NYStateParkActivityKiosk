<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div id="app">
    <edit-header v-if="this.$store.state.isEditing"></edit-header>
    <edit-panel v-if="this.$store.state.isEditing"></edit-panel>
    <router-view name="page"></router-view>
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
  created () {
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
  src: local("fonts/Avenir-Medium.ttf");
}

@font-face {
  font-family: "Avenir-Heavy";
  src: local("fonts/Avenir-Heavy.ttf");
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

</style>
