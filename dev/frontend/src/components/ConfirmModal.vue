<!-- =================================================
 Vue Template
================================================== -->
<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click.self="$emit('closeModal', purpose)">
        <div class="modal-container">
          <div class="modal-container-inside">
            <div class="modal-header">
              <slot name="header">
                default header
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                default body
              </slot>
            </div>
          </div>
          <div class="modal-footer">
            <div class="modal-cancel-button"
              @click="$emit('close-modal', purpose)">
              <slot name="cancel-button">
              </slot>
            </div>
            <div class="modal-execute-button"
              @click="$emit('execute-command', purpose)">
              <slot name="execute-button">
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'confirm-modal',
  props: {
    purpose: {
      type: String,
    },
  },
};
</script>


<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  /*padding: 20px 30px;*/
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  /*color: #42b983;*/
}

.modal-container-inside {
  padding: 20px 30px;
}

.modal-body {
  margin-top: 20px;
}

.modal-footer {
  /*height: 40px;*/
  /*padding: 20px 0;*/
}

.modal-cancel-button {
  float: left;
  width: 50%;
  padding: 15px 20px;
  text-align: center;
  background-color: darkgrey;
  color: white;
  cursor: pointer;
}

.modal-execute-button {
  float: left;
  width: 50%;
  padding: 15px 20px;
  text-align: center;
  background-color: black;
  color: white;
  cursor: pointer;
}

.modal-cancel-button:hover {
  background-color: #FFD12A;
  color: black;
}

.modal-execute-button:hover {
  background-color: #FFD12A;
  color: black;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
