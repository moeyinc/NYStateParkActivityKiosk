const mutations = {
  updateSize(state, data) {
    state.size = data;
  },
  updateGeneralSettings(state, data) {
    state.generalSettings = data;
  },
  updateActivities(state, data) {
    state.activities = data;
  },
  updateSelectedActivityId(state, data) {
    state.selectedActivityId = data;
  },
  updateActiveTabId(state, data) {
    state.activeTabId = data;
  },
  updateIsFirstActivityClicked(state, data) {
    state.isFirstActivityClicked = data;
  },
};

export default mutations;
