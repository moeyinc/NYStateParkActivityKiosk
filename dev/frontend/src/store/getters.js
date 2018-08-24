const getters = {
  getSize: (state) => () => state.size,
  getActivities: (state) => () => state.activities,
  getSelectedActivityId: (state) => () => state.selectedActivityId,
  getActiveTabId: (state) => () => state.activeTabId,
  getIsFirstActivityClicked: (state) => () => state.isFirstActivityClicked,
  // return an activity data selected in the side menu
  getSelectedActivity(state) {
    for (let i = 0; i < state.activities.length; i++) {
      const activity = state.activities[i];
      if (activity.activity_id === state.selectedActivityId) {
        return activity;
      }
    }
    console.log('in store getters: couldn\'t get a selected activity');
    return null;
  },
  // return a content data of an active tab
  getActiveTabContent(state, getters) {
    let selectedActivityContents = getters.getSelectedActivity.contents;
    for (let i = 0; i < selectedActivityContents.length; i++) {
      const content = selectedActivityContents[i];
      if (content.subnav_id === state.activeTabId) {
        return content;
      }
    }
    console.log('in store getters: couldn\'t get content');
  },
};

export default getters;
