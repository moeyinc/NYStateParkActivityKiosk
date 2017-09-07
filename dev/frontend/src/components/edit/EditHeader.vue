<!-- =================================================
 Vue Template
================================================== -->
<template>
  <header v-if="this.$store.state.isEditing">
    <div class="edit-header-container">
      <p class="edit-header-title">
        EDIT MODE
      </p>
      <div class="refresh-button icon-wrapper" @click="refreshPage">
        <icon name="refresh"></icon>
      </div>
      <router-link to="/edit">
        <p class="edit-header-link">
          HOME
        </p>
      </router-link>
      <router-link to="/edit/detail/1">
        <p class="edit-header-link">
          DETAIL
        </p>
      </router-link>
      <!-- <a>
        <p class="logout">
        LOG OUT
        </p>
      </a> -->
    </div>
  </header>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'edit-header',
  methods: {
    refreshPage () {
      window.location.reload(true)
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

header .edit-header-container {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}

p {
  font-family: "Helvetica";
  color: white;
}

p.edit-header-title {
  margin-left: 40px;
  float: left;
  font-weight: bold;
  font-size: 32px;
  margin-right: 20px;
}

p.edit-header-link {
  float: left;
  padding-top: 8px;
  margin-left: 20px;
  font-size: 20px;
}

div.refresh-button {
  float: left;
  padding-top: 8px;
  margin-left: 20px;
  /*font-size: 20px;*/
}

.icon-wrapper {
  display: inline-block;
  cursor: pointer;
  height: 20px;
}

.fa-icon {
  width: auto;
  height: 1.5em; /* or any other relative font sizes */
  color: white;
}

p.logout {
  float: right;
  padding-top: 8px;
  font-size: 20px;
  margin-right: 40px;
}

p.edit-header-link:hover, p.logout:hover {
  text-decoration: underline;
}

a:link, a:visited {
  color: white;
  text-decoration: none;
}
</style>
