import axios from 'axios';
import FormData from 'form-data';
import V from '../variables.js';

const actions = {
  // ===============================================
  updateGeneralSettings(context) {
    return new Promise((resolve, reject) => {
      // ajax request using axios
      axios.get(V.SERVER_URL + '/data/general-settings')
      .then((res) => {
        console.log('new general settings fetched: ', res.data);

        // commit the new values to state
        context.commit('updateGeneralSettings', res.data);

        resolve(); // resolve a promise
      })
      .catch((error) => {
        console.log(error);
      });
    });
  },
  // ===============================================
  submitGeneralSettings(context) {
    return new Promise((resolve, reject) => {
      // ajax request using axios
      axios.post(V.SERVER_URL + '/data/general-settings', {
        generalSettings: context.state.generalSettings,
      })
      .then((res) => {
        console.log('new general settings fetched: ', res.data);

        // commit the new values to state
        context.commit('updateGeneralSettings', res.data);

        // resolve a promise
        resolve();
      })
      .catch((error) => {
        console.log(error);
      });
    });
  },
  // ===============================================
  updateActivities(context) {
    return new Promise((resolve, reject) => {
      // ajax request using axios
      axios.get(V.SERVER_URL + '/data/activities')
      .then((res) => {
        console.log('new activities fetched: ', res.data);

        // commit the new values to state
        context.commit('updateActivities', res.data);

        resolve(); // resolve a promise
      })
      .catch((error) => {
        console.log(error);
      });
    });
  },
  // ===============================================
  submitActivities(context) {
    return new Promise((resolve, reject) => {
      console.log('submitting activities', context.state.activities);
      console.log('and removing activities', context.state.activitiesToRemove);
      // ajax request using axios
      axios.post(V.SERVER_URL + '/data/activities', {
        activities: context.state.activities,
        activitiesToRemove: context.state.activitiesToRemove,
      })
      .then((res) => {
        console.log('new activities fetched: ', res.data);

        context.commit('resetState'); // reset activities to remove

        // commit the new values to state
        // context.commit('updateActivities', res.data)

        // resolve a promise
        resolve();
      })
      .catch((error) => {
        console.log(error);
      });
    });
  },
  // ===============================================
  uploadImage(context, data) {
    let formdata = new FormData();
    formdata.append('image', data);

    console.log('sending: ', formdata.get('image'));

    return new Promise((resolve, reject) => {
      // ajax request using axios
      axios.post(V.SERVER_URL + '/data/images', formdata)
      .then((res) => {
        console.log('new images fetched: ', res.data);

        // commit the new values to state
        context.commit('updateMediaItems', res.data);

        resolve(); // resolve a promise
      })
      .catch((error) => {
        console.log(error);
      });
    });
  },
  // ===============================================
  deleteImage(context, data) {
    console.log('deleting: ', data);

    return new Promise((resolve, reject) => {
      // ajax request using axios
      axios.post(V.SERVER_URL + '/data/images/delete', data)
      .then((res) => {
        console.log('new images fetched: ', res.data);

        // commit the new values to state
        context.commit('updateMediaItems', res.data);

        resolve(); // resolve a promise
      })
      .catch((error) => {
        console.log(error);
      });
    });
  },
  // ===============================================
  updateMediaItems(context) {
    return new Promise((resolve, reject) => {
      // ajax request using axios
      axios.get(V.SERVER_URL + '/data/images')
      .then((res) => {
        console.log('new images fetched: ', res.data);

        // commit the new values to state
        context.commit('updateMediaItems', res.data);

        resolve(); // resolve a promise
      })
      .catch((error) => {
        console.log(error);
      });
    });
  },
  // ===============================================
  login(context, {password, moey}) {
    console.log('logging in...', password);
    if (moey) {
      context.commit('moey');
    }

    return new Promise((resolve, reject) => {
      axios.post(V.SERVER_URL + '/data/login', {password: password})
      .then((res) => {
        console.log('login result:', res.data.auth);
        if (res.data.auth) {
          context.commit('updateAuthentication', true);
          resolve(); // resolve a promise
        } else {
          reject({error: null});
        }
      })
      .catch((error) => {
        console.log('login failed:', error);
        reject({error: error});
      });
    });
  },
  generateSessionid(context) {
    console.log('generating session id...');

    axios.post(V.SERVER_URL + '/login/generate-sessionid')
    .then((res) => {
    })
    .catch((error) => {
      console.log(error);
    });
  },
};

export default actions;
