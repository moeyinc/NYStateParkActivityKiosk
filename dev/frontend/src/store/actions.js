import axios from 'axios';
import APP_CONFIG from '../app-config';

const actions = {
  // ===============================================
  updateGeneralSettings(context) {
    return new Promise((resolve, reject) => {
      // ajax request using axios
      axios.get(APP_CONFIG.API_SERVER_URL + 'general-settings')
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
  updateActivities(context) {
    return new Promise((resolve, reject) => {
      // ajax request using axios
      axios.get(APP_CONFIG.API_SERVER_URL + 'activities')
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
};

export default actions;
