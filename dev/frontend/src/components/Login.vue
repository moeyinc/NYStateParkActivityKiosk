<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div class="page-wrapper">
    <div class="container">
      <h1>Activity Kiosk Login</h1>
      <form>
        <input
          id="password"
          type="password"
          placeholder="Enter Password"
          name="password"
          v-validate="{ rules: { required: true, alpha_dash: true }}"
          @input="submitErrorMessage=''"
          autofocus
          /><br />
        <div v-show="errors.has('password')" class="error-message">
          {{ errors.first('password')}}
        </div>
        <div class="button-wrapper">
          <button type="submit" class="button-label" @click.prevent.self="login()">SUBMIT</button>
        </div>
      </form>
      <div v-show="submitErrorMessage" class="submit-error-message">
        {{ submitErrorMessage }}
      </div>
      <div class="forget">
        Forgot the password? <br />Please contact Moey inc.
      </div>
    </div>
  </div>
</template>


<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'login',
  data () {
    return {
      submitErrorMessage: ''
    }
  },
  methods: {
    login () {
      // this.$store.dispatch('generateSessionid')

      let password = document.getElementById('password').value
      console.log('login', password)

      this.$store.dispatch('login', password)
      .then(() => {
        console.log('login successful! moving to edit page...')
        this.$router.push({path: '/edit'})
      })
      .catch((res) => {
        if (res.error) {
          this.submitErrorMessage = 'Server error. Please ensure your internet connection is good.' + res.error
        } else {
          this.submitErrorMessage = 'Login failed.'
        }
      })
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
.page-wrapper {
  height: 100%;
  position: relative;
  background-color: whitesmoke;
}

.container {
  width: 400px;
  height: 200px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  margin: auto;
  text-align: center;
}

h1 {
  margin-bottom: 15px;
}

input {
  height: 30px;
  width: 200px;
  margin-bottom: 10px;
  font-size: 18px;
}

/* reset */
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
}

.button-wrapper {
  background: black;
  cursor: pointer;
  width: 200px;
  height: 30px;
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
}

.button-wrapper:hover {
  background-color: #FFD12A;
}

.button-label {
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
}

.error-message {
  color: red;
  font-size: 11px;
  /*margin-top: 5px;*/
  margin-bottom: 10px;
}

.submit-error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.forget {
  font-size: 12px;
  color: grey;
}

</style>
