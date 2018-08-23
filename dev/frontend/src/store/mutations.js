import HELPERS from './helpers';
import preset from '../presetDocuments.js';

const mutations = {
  updateSize(state, data) {
    state.size = data;
  },
  updateShowSubmitModal(state, data) {
    state.showSubmitModal = data;
  },
  updateModals(state, data) {
    state.modals[data.key] = data.value;
  },
  updateIsEditing(state, data) {
    state.isEditing = data;
  },
  updateIsEditPanelEnabled(state, data) {
    state.isEditPanelEnabled = data;
  },
  updateTempDataForRemoving(state, data) {
    state.tempDataForRemoving = data;
  },
  updateTempDataForMediaGallery(state, data) {
    state.tempDataForMediaGallery = data;
  },
  updateMediaItems(state, data) {
    state.mediaItems = data;
  },
  updateSelectedMediaItem(state, data) {
    state.selectedMediaItem = data;
  },
  updateGeneralSettings(state, data) {
    state.generalSettings = data;
  },
  updateGeneralSettingsParam(state, data) {
    // data: {param, newVal}
    state.generalSettings[data.param] = data.newVal;
  },
  updateActivities(state, data) {
    state.activities = data;
  },
  updateActivityParam(state, data) {
    // data: {target, act_id, tab_id, sec_id, itm_id, param, newVal}

    // pick the activity object with the given id
    let targetActivity = HELPERS.getTargetActivity(
      state.activities, data.act_id);
    if (data.target === 'activity') {
      // set the new val
      targetActivity[data.param] = data.newVal;
      return;
    }

    // pick the content object with the given id
    let targetContent = HELPERS.getTargetContent(
      targetActivity.contents, data.tab_id);
    if (data.target === 'content') {
      // set the new val
      targetContent[data.param] = data.newVal;
      return;
    }

    if (data.target === 'section') {
      // pick the section object with the given id
      let targetSection = HELPERS.getTargetSection(
        targetContent.sections, data.sec_id);
      // set the new val
      targetSection[data.param] = data.newVal;
      return;
    }

    if (data.target === 'item') {
      // pick the item object with the given id
      let targetItem = HELPERS.getTargetItem(
        targetContent.items, data.itm_id);
      targetItem[data.param] = data.newVal;
    }
  },
  addActivity(state, data) {
    let newActivity = preset.createNewActivity({
      act_id: state.activities.length + 1,
    });

    state.activities.push(newActivity);
  },
  addContent(state, data) {
    // pick the activity object with the given id
    let targetActivity = HELPERS.getTargetActivity(
      state.activities, data.act_id);

    let newTab = preset.createNewTab({
      tab_id: data.tab_id,
      templateType: data.templateType,
    });
    targetActivity.contents.push(newTab);
  },
  addSection(state, data) {
    // data: {act_id, tab_id, sec_id, templateType}

    // pick the activity object with the given id
    let targetActivity = HELPERS.getTargetActivity(
      state.activities, data.act_id);

    // pick the content object with the given id
    let targetContent = HELPERS.getTargetContent(
      targetActivity.contents, data.tab_id);

    let newSection = preset.createNewSection({
      sec_id: data.sec_id,
      templateType: data.templateType,
    });

    targetContent.sections.push(newSection);
  },
  addItem(state, data) {
    // data: {act_id, tab_id, itm_id, templateType}

    // pick the activity object with the given id
    let targetActivity = HELPERS.getTargetActivity(
      state.activities, data.act_id);

    // pick the content object with the given id
    let targetContent = HELPERS.getTargetContent(
      targetActivity.contents, data.tab_id);

    let newItem = preset.createNewItem({
      itm_id: data.itm_id,
      templateType: data.templateType,
    });

    targetContent.items.push(newItem);
  },
  removeActivity(state, data) {
    // the least number of activities is 3
    if (state.activities.length <= 3) {
      console.error('couldn\'t remove the activity because ' +
      'the minimum number is 3.');
      return;
    }

    // remove an activity with the given id
    for (let i = state.activities.length - 1; i >= 0; i--) {
      if (state.activities[i].activity_id ===
        state.tempDataForRemoving.act_id) {
        // keep the _id to remove it on the server later
        state.activitiesToRemove.push(state.activities[i]);
        state.activities.splice(i, 1);
      }
    }

    // re-sort activities in ascending order
    let activities = state.activities.slice(0);
    activities.sort(function(a, b) {
      if (a.activity_id < b.activity_id) return -1;
      if (a.activity_id > b.activity_id) return 1;
      return 0;
    });

    // re-apply ids to activities one by one from the beginning
    for (let i = 0; i < activities.length; i++) {
      activities[i].activity_id = i + 1;
    }

    // update
    state.activities = activities;
  },
  removeContent(state, data) {
    // pick the activity object with the given id
    let targetActivity = HELPERS.getTargetActivity(
      state.activities, state.tempDataForRemoving.act_id);

    // if there's only one content, don't allow to remove it
    if (targetActivity.contents.length <= 1) {
      console.error('couldn\'t remove the tab because it\'s the last one.');
      return;
    }

    // remove a content with the given id
    for (let i = targetActivity.contents.length - 1; i >= 0; i--) {
      if (
        targetActivity.contents[i].subnav_id ===
        state.tempDataForRemoving.tab_id) {
        targetActivity.contents.splice(i, 1);
      }
    }

    // re-sort contents in ascending order
    let contents = targetActivity.contents.slice(0);
    contents.sort(function(a, b) {
      if (a.subnav_id < b.subnav_id) return -1;
      if (a.subnav_id > b.subnav_id) return 1;
      return 0;
    });

    // re-apply ids to contents one by one from the beginning
    for (let i = 0; i < contents.length; i++) {
      contents[i].subnav_id = i + 1;
    }

    // update
    targetActivity.contents = contents;
  },
  removeSection(state, data) {
    // pick the activity object with the given id
    let targetActivity = HELPERS.getTargetActivity(
      state.activities, state.tempDataForRemoving.act_id);

    // pick the content object with the given id
    let targetContent = HELPERS.getTargetContent(
      targetActivity.contents, state.tempDataForRemoving.tab_id);

    // if there's only one section, don't allow to remove it
    if (targetContent.sections.length <= 1) {
      console.error('couldn\'t remove the section because it\'s the last one.');
      return;
    }

    // remove a section with the given id
    for (let i = targetContent.sections.length - 1; i >= 0; i--) {
      if (targetContent.sections[i].section_id ===
        state.tempDataForRemoving.sec_id) {
        targetContent.sections.splice(i, 1);
      }
    }

    // re-sort sections in ascending order
    let sections = targetContent.sections.slice(0);
    sections.sort(function(a, b) {
      if (a.section_id < b.section_id) return -1;
      if (a.section_id > b.section_id) return 1;
      return 0;
    });

    // re-apply ids to sections one by one from the beginning
    for (let i = 0; i < sections.length; i++) {
      sections[i].section_id = i + 1;
    }

    // update
    targetContent.sections = sections;
  },
  removeItem(state, data) {
    // pick the activity object with the given id
    let targetActivity = HELPERS.getTargetActivity(
      state.activities, state.tempDataForRemoving.act_id);

    // pick the content object with the given id
    let targetContent = HELPERS.getTargetContent(
      targetActivity.contents, state.tempDataForRemoving.tab_id);

    // if there's only one item, don't allow to remove it
    if (targetContent.items.length <= 1) {
      console.log('couldn\'t remove the item because it\'s the last one.');
      return;
    }

    // remove a item with the given id
    for (let i = targetContent.items.length - 1; i >= 0; i--) {
      if (targetContent.items[i].item_id === state.tempDataForRemoving.itm_id) {
        targetContent.items.splice(i, 1);
      }
    }

    // re-sort items in ascending order
    let items = targetContent.items.slice(0);
    items.sort(function(a, b) {
      if (a.item_id < b.item_id) return -1;
      if (a.item_id > b.item_id) return 1;
      return 0;
    });

    // re-apply ids to items one by one from the beginning
    for (let i = 0; i < items.length; i++) {
      items[i].item_id = i + 1;
    }

    // update
    targetContent.items = items;
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
  changeActivityOrder(state, data) {
    // pick the activity object with the given id
    let targetActivity = HELPERS.etTargetActivity(
      state.activities, data.act_id);
    console.log(data);

    let swappedActivity = HELPERS.getTargetActivity(
      state.activities, data.act_id + data.value);

    // swap the id
    targetActivity.activity_id += data.value;
    swappedActivity.activity_id -= data.value;
  },
  changeContentOrder(state, data) {
    let targetActivity = HELPERS.getTargetActivity(
      state.activities, data.act_id);
    let targetContent = HELPERS.getTargetContent(
      targetActivity.contents, data.tab_id);

    let swappedContent = HELPERS.getTargetContent(
      targetActivity.contents, data.tab_id + data.value);

    // swap the id
    targetContent.subnav_id += data.value;
    swappedContent.subnav_id -= data.value;
  },
  changeSectionOrder(state, data) {
    let targetActivity = HELPERS.getTargetActivity(
      state.activities, data.act_id);
    let targetContent = HELPERS.getTargetContent(
      targetActivity.contents, data.tab_id);
    let targetSection = HELPERS.getTargetSection(
      targetContent.sections, data.sec_id);

    let swappedSection = HELPERS.getTargetSection(
      targetContent.sections, data.sec_id + data.value);

    // swap the id
    targetSection.section_id += data.value;
    swappedSection.section_id -= data.value;
  },
  updateAuthentication(state, data) {
    state.isAuthenticated = data;
  },
  resetState(state) {
    state.activitiesToRemove = [];
  },
  moey(state) {
    state.moey = true;
  },
};

export default mutations;
