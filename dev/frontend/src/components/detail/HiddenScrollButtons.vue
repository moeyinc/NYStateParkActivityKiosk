<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div>
    <span class="hidden-scroll-button up"></span>
    <span class="hidden-scroll-button down"></span>
  </div>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'hidden-scroll-buttons',
};
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
span.hidden-scroll-button {
  position: absolute;
  opacity: 1;
  z-index: 3000;
}
</style>
