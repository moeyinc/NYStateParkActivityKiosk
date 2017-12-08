<!-- =================================================
 Vue Template
================================================== -->
<template>
  <header v-if="$store.state.isEditing">
      <p v-if="$store.state.generalSettings" class="edit-header-title">
        {{$store.state.generalSettings.cms_title}}
      </p>
      <div class="edit-header-link-wrapper">
        <router-link to="/edit">
          <p class="edit-header-link home" :class="selectedIfThisPageIsEditHome">
            EDIT HOME
          </p>
        </router-link>
        <router-link to="/edit/detail/1">
          <p class="edit-header-link detail" :class="selectedIfThisPageIsEditDetail">
            EDIT DETAIL
          </p>
        </router-link>
      </div>
      <a class="refresh-wrapper">
        <p class="refresh" @click="resetState()">
        REFRESH
        </p>
      </a>
      <a class="logout-wrapper">
        <p class="logout" @click="logout()">
        LOGOUT
        </p>
      </a>
  </header>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'edit-header',
  computed: {
    selectedIfThisPageIsEditHome () {
      if (this.$route.name === 'edit-home') {
        return 'selected'
      }
    },
    selectedIfThisPageIsEditDetail () {
      if (this.$route.name === 'edit-detail') {
        return 'selected'
      }
    }
  },
  methods: {
    refreshPage () {
      window.location.reload(true)
    },
    resetState () {
      console.log('re-download data from db')
      this.$store.dispatch('updateGeneralSettings')
      this.$store.dispatch('updateActivities')
      this.$store.commit('resetState')
    },
    logout () {
      // force logout
      this.$store.commit('updateAuthentication', false)
      this.$store.commit('updateIsEditing', false)
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
header {
  height: 60px;
  width: 100%;
  background: black;
  position: relative;
}

p {
  font-family: "Helvetica";
  color: white;
}

/*header .edit-header-container {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}*/


p.edit-header-title {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  margin-left: 40px;
  float: left;
  font-weight: bold;
  font-size: 32px;
  margin-right: 20px;
}

.edit-header-link-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  border-color: white;
  /*border-style: solid;*/
  /*border-width: 2px;*/
  border-radius: 5px;
  background-color: whitesmoke;
  padding: 2px;
}

p.edit-header-link {
  float: left;
  font-size: 20px;
  padding: 7px 60px;
  border-radius: 5px;

  background-color: whitesmoke;
  color: black;
}

/*p.edit-header-link.home {
  background-color: #FFD12A;
  color: black;

}

p.edit-header-link.detail {
  background-color: whitesmoke;
  color: grey;
}*/

.edit-header-link-wrapper .selected {
  background-color: #FFD12A;
  /*background-color: white;*/
  color: black;
}

div.refresh-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 250px;

  float: left;
}

.icon-wrapper {
  display: inline-block;
  cursor: pointer;
  /*height: 20px;*/
  float: left;
}

.fa-icon {
  width: auto;
  height: 1.5em; /* or any other relative font sizes */
  color: white;
}

.refresh-wrapper {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 200px;
}

.logout-wrapper {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 40px;
}

p.logout, p.refresh {
  font-size: 20px;
  /*margin-right: 40px;*/
}

p.logout:hover, p.refresh:hover {
  text-decoration: underline;
  cursor: pointer;
}

p.edit-header-link:hover {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}


</style>
