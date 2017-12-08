import axios    from 'axios'
import FormData from 'form-data'
import V from './variables.js'
import preset from './presetDocuments.js'

/* =================================================
 state
================================================== */
const state = {
  size: {
    zoom: 1.0,
    monitor:      {w: 1920, h: 1080},
    window:       {w: 1920, h: 1080},
    page:         {w: 1920, h: 1080},
    editHeader:   {w: 1920, h: 60},
    editPanel:    {w: 640,  h: 960},
    previewPanel: {w: 1280, h: 720}
  },
  modals: {
    submitChanges: false,
    removeActivity: false,
    removeTab: false,
    removeSection: false,
    removeItem: false,
    deleteMediaItem: false,
    mediaGallery: false
  },
  isEditing: false,
  isEditPanelEnabled: true,
  tempDataForRemoving: null,
  tempDataForMediaGallery: null,
  mediaItems: null,
  selectedMediaItem: null,
  generalSettings: null,
  activities: null,
  activitiesToRemove: [],
  selectedActivityId: null,
  activeTabId: 1,
  isFirstActivityClicked: false,
  isAuthenticated: false
}

/* =================================================
 mutations
================================================== */
const mutations = {
  updateSize (state, data) {
    state.size = data
  },
  updateShowSubmitModal (state, data) {
    state.showSubmitModal = data
  },
  updateModals (state, data) {
    state.modals[data.key] = data.value
  },
  updateIsEditing (state, data) {
    state.isEditing = data
  },
  updateIsEditPanelEnabled (state, data) {
    state.isEditPanelEnabled = data
  },
  updateTempDataForRemoving (state, data) {
    state.tempDataForRemoving = data
  },
  updateTempDataForMediaGallery (state, data) {
    state.tempDataForMediaGallery = data
  },
  updateMediaItems (state, data) {
    state.mediaItems = data
  },
  updateSelectedMediaItem (state, data) {
    state.selectedMediaItem = data
  },
  updateGeneralSettings (state, data) {
    state.generalSettings = data
  },
  updateGeneralSettingsParam (state, data) {
    // data: {param, newVal}
    state.generalSettings[data.param] = data.newVal
  },
  updateActivities (state, data) {
    state.activities = data
  },
  updateActivityParam (state, data) {
    // data: {target, act_id, tab_id, sec_id, itm_id, param, newVal}

    // pick the activity object with the given id
    let targetActivity = getTargetActivity(state.activities, data.act_id)
    if (data.target === 'activity') {
      // set the new val
      targetActivity[data.param] = data.newVal
      return
    }

    // pick the content object with the given id
    let targetContent  = getTargetContent(targetActivity.contents, data.tab_id)
    if (data.target === 'content') {
      // set the new val
      targetContent[data.param] = data.newVal
      return
    }

    if (data.target === 'section') {
      // pick the section object with the given id
      let targetSection  = getTargetSection(targetContent.sections, data.sec_id)
      // set the new val
      targetSection[data.param] = data.newVal
      return
    }

    if (data.target === 'item') {
      // pick the item object with the given id
      let targetItem  = getTargetItem(targetContent.items, data.itm_id)
      targetItem[data.param] = data.newVal
    }
  },
  addActivity (state, data) {
    // let newContent = [
    //   {
    //     _id: ObjectId(),
    //     subnav_id: 1,
    //     subnav_label: 'NEW TAB',
    //     template_type: 'GENERAL INFO',
    //     number_of_images: 2,
    //     left_image_uri: '',
    //     right_image_uri: '',
    //     raw_html_text: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis aliquet sapien, vitae sollicitudin mi. In porta dapibus felis, eu lobortis diam vehicula id. Suspendisse luctus faucibus sapien sed mollis. Suspendisse consectetur, urna quis convallis gravida, nisl ligula vehicula eros, quis imperdiet eros massa vel arcu. Sed aliquam, urna vitae pretium sollicitudin, arcu ligula elementum tortor, at gravida lectus ipsum quis tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse venenatis dui tempor imperdiet imperdiet. Ut eu tristique turpis. Etiam at turpis in ipsum tristique vulputate. Nunc porttitor purus vitae sem porttitor, id rhoncus massa auctor. Curabitur at augue hendrerit, mattis lacus sed, auctor tellus. Sed scelerisque, ipsum at dictum pharetra, mauris eros molestie tortor, in imperdiet nibh ex vitae sem.</p>'
    //   }
    // ]

    // let newActivity = {
    //   _id: ObjectId(),
    //   activity_id: state.activities.length + 1,
    //   main_color:  {
    //     "hsl" : {
    //       "h" : 0,
    //       "s" : 0,
    //       "l" : 80,
    //       "a" : 1
    //     },
    //     "hex" : "#CCCCCC",
    //     "rgba" : {
    //       "r" : 204,
    //       "g" : 204,
    //       "b" : 204,
    //       "a" : 1
    //     },
    //     "hsv" : {
    //       "h" : 0,
    //       "s" : 0,
    //       "v" : 80,
    //       "a" : 1
    //     },
    //     "a" : 1
    //   },
    //   sub_color:  {
    //     "hsl" : {
    //       "h" : 0,
    //       "s" : 0,
    //       "l" : 93.3,
    //       "a" : 1
    //     },
    //     "hex" : "#EEEEEE",
    //     "rgba" : {
    //       "r" : 238,
    //       "g" : 238,
    //       "b" : 238,
    //       "a" : 1
    //     },
    //     "hsv" : {
    //       "h" : 0,
    //       "s" : 0,
    //       "v" : 93.3,
    //       "a" : 1
    //     },
    //     "a" : 1
    //   },
    //   button_label: 'NEW ACTIVITY',
    //   page_title:   'NEW ACTIVITY',
    //   icon_uri: '',
    //   contents: newContent
    // }

    let newActivity = preset.createNewActivity({
      act_id: state.activities.length + 1
    })

    state.activities.push(newActivity)
  },
  addContent (state, data) {
    // data: {act_id, tab_id, templateType}

    // let newContent
    // if (data.templateType === 'GENERAL INFO') {
    //   newContent = {
    //     _id: new ObjectId(),
    //     subnav_id: data.tab_id,
    //     subnav_label: 'NEW TAB',
    //     template_type: 'GENERAL INFO',
    //     number_of_images: 2,
    //     left_image_uri: '',
    //     right_image_uri: '',
    //     raw_html_text: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis aliquet sapien, vitae sollicitudin mi. In porta dapibus felis, eu lobortis diam vehicula id. Suspendisse luctus faucibus sapien sed mollis. Suspendisse consectetur, urna quis convallis gravida, nisl ligula vehicula eros, quis imperdiet eros massa vel arcu. Sed aliquam, urna vitae pretium sollicitudin, arcu ligula elementum tortor, at gravida lectus ipsum quis tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse venenatis dui tempor imperdiet imperdiet. Ut eu tristique turpis. Etiam at turpis in ipsum tristique vulputate. Nunc porttitor purus vitae sem porttitor, id rhoncus massa auctor. Curabitur at augue hendrerit, mattis lacus sed, auctor tellus. Sed scelerisque, ipsum at dictum pharetra, mauris eros molestie tortor, in imperdiet nibh ex vitae sem.</p>'
    //   }
    // } else if (data.templateType === 'LOCATIONS') {
    //   newContent = {
    //     _id: new ObjectId(),
    //     subnav_id: data.tab_id,
    //     subnav_label: 'NEW TAB',
    //     template_type: 'LOCATIONS',
    //     sections: [{
    //       section_id: 1,
    //       section_title: 'NEW SECTION',
    //       number_of_images: 3,
    //       map_image_filename: '',
    //       ref_1_image_filename: '',
    //       ref_2_image_filename: '',
    //       raw_html_text: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis aliquet sapien, vitae sollicitudin mi. In porta dapibus felis, eu lobortis diam vehicula id. Suspendisse luctus faucibus sapien sed mollis. Suspendisse consectetur, urna quis convallis gravida, nisl ligula vehicula eros, quis imperdiet eros massa vel arcu. Sed aliquam, urna vitae pretium sollicitudin, arcu ligula elementum tortor, at gravida lectus ipsum quis tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse venenatis dui tempor imperdiet imperdiet. Ut eu tristique turpis. Etiam at turpis in ipsum tristique vulputate. Nunc porttitor purus vitae sem porttitor, id rhoncus massa auctor. Curabitur at augue hendrerit, mattis lacus sed, auctor tellus. Sed scelerisque, ipsum at dictum pharetra, mauris eros molestie tortor, in imperdiet nibh ex vitae sem.</p>'
    //     }]
    //   }
    // } else if (data.templateType === 'CATALOG') {
    //   newContent = {
    //     _id: new ObjectId(),
    //     subnav_id: data.tab_id,
    //     subnav_label: 'NEW TAB',
    //     template_type: 'CATALOG',
    //     page_title: 'HEADER TITLE',
    //     page_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis aliquet sapien, vitae sollicitudin mi. In porta dapibus felis, eu lobortis diam vehicula id. Suspendisse luctus faucibus sapien sed mollis. Suspendisse consectetur, urna quis convallis gravida, nisl ligula vehicula eros, quis imperdiet eros massa vel arcu. Sed aliquam, urna vitae pretium sollicitudin, arcu ligula elementum tortor, at gravida lectus ipsum quis tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse venenatis dui tempor imperdiet imperdiet. Ut eu tristique turpis. Etiam at turpis in ipsum tristique vulputate. Nunc porttitor purus vitae sem porttitor, id rhoncus massa auctor. Curabitur at augue hendrerit, mattis lacus sed, auctor tellus. Sed scelerisque, ipsum at dictum pharetra, mauris eros molestie tortor, in imperdiet nibh ex vitae sem.</p>',
    //     items: [{
    //       item_id: 1,
    //       item_image_filename: '',
    //       item_image_caption: '',
    //       item_title: 'NEW ITEM',
    //       item_description: 'WRITE TEXT HERE'
    //     }]
    //   }
    // } else if (data.templateType === 'GALLERY') {
    //   newContent = {
    //     _id: new ObjectId(),
    //     subnav_id: data.tab_id,
    //     subnav_label: 'NEW TAB',
    //     template_type: 'GALLERY',
    //     items: [{
    //       item_id: 1,
    //       item_image_filename: '',
    //       item_caption: ''
    //     }]
    //   }
    // }
    //
    // targetActivity.contents.push(newContent)

    // pick the activity object with the given id
    let targetActivity = getTargetActivity(state.activities, data.act_id)

    let newTab = preset.createNewTab({
      tab_id: data.tab_id,
      templateType: data.templateType
    })
    targetActivity.contents.push(newTab)
  },
  addSection (state, data) {
    // data: {act_id, tab_id, sec_id, templateType}

    // pick the activity object with the given id
    let targetActivity = getTargetActivity(state.activities, data.act_id)

    // pick the content object with the given id
    let targetContent  = getTargetContent(targetActivity.contents, data.tab_id)

    // let newSection
    // if (data.templateType === 'LOCATIONS') {
    //   newSection = {
    //     section_id: data.sec_id,
    //     section_title: 'NEW SECTION',
    //     number_of_images: 3,
    //     map_image_filename: '',
    //     ref_1_image_filename: '',
    //     ref_2_image_filename: '',
    //     raw_html_text: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis aliquet sapien, vitae sollicitudin mi. In porta dapibus felis, eu lobortis diam vehicula id. Suspendisse luctus faucibus sapien sed mollis. Suspendisse consectetur, urna quis convallis gravida, nisl ligula vehicula eros, quis imperdiet eros massa vel arcu. Sed aliquam, urna vitae pretium sollicitudin, arcu ligula elementum tortor, at gravida lectus ipsum quis tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse venenatis dui tempor imperdiet imperdiet. Ut eu tristique turpis. Etiam at turpis in ipsum tristique vulputate. Nunc porttitor purus vitae sem porttitor, id rhoncus massa auctor. Curabitur at augue hendrerit, mattis lacus sed, auctor tellus. Sed scelerisque, ipsum at dictum pharetra, mauris eros molestie tortor, in imperdiet nibh ex vitae sem.</p>'
    //   }
    // }

    let newSection = preset.createNewSection({
      sec_id: data.sec_id,
      templateType: data.templateType
    })

    targetContent.sections.push(newSection)
  },
  addItem (state, data) {
    // data: {act_id, tab_id, itm_id, templateType}

    // pick the activity object with the given id
    let targetActivity = getTargetActivity(state.activities, data.act_id)

    // pick the content object with the given id
    let targetContent  = getTargetContent(targetActivity.contents, data.tab_id)

    // let newItem
    // if (data.templateType === 'CATALOG') {
    //   newItem = {
    //     item_id: data.itm_id,
    //     item_image_filename: '',
    //     item_image_caption: '',
    //     item_title: 'NEW ITEM',
    //     item_description: 'WRITE TEXT HERE'
    //   }
    // } else if (data.templateType === 'GALLERY') {
    //   newItem = {
    //     item_id: data.itm_id,
    //     item_image_filename: '',
    //     item_caption: ''
    //   }
    // }

    let newItem = preset.createNewItem({
      itm_id: data.itm_id,
      templateType: data.templateType
    })

    targetContent.items.push(newItem)
  },
  removeActivity (state, data) {
    // the least number of activities is 3
    if (state.activities.length <= 3) {
      console.error('couldn\'t remove the activity because the minimum number is 3.')
      return
    }

    // remove an activity with the given id
    for (let i = state.activities.length - 1; i >= 0; i--) {
      if (state.activities[i].activity_id === state.tempDataForRemoving.act_id) {
        state.activitiesToRemove.push(state.activities[i]) // keep the _id to remove it on the server later
        state.activities.splice(i, 1)
      }
    }

    // re-sort activities in ascending order
    let activities = state.activities.slice(0)
    activities.sort(function (a, b) {
      if (a.activity_id < b.activity_id) return -1
      if (a.activity_id > b.activity_id) return 1
      return 0
    })

    // re-apply ids to activities one by one from the beginning
    for (let i = 0; i < activities.length; i++) {
      activities[i].activity_id = i + 1
    }

    // update
    state.activities = activities
  },
  removeContent (state, data) {
    // pick the activity object with the given id
    let targetActivity = getTargetActivity(state.activities, state.tempDataForRemoving.act_id)

    // if there's only one content, don't allow to remove it
    if (targetActivity.contents.length <= 1) {
      console.error('couldn\'t remove the tab because it\'s the last one.')
      return
    }

    // remove a content with the given id
    for (let i = targetActivity.contents.length - 1; i >= 0; i--) {
      if (targetActivity.contents[i].subnav_id === state.tempDataForRemoving.tab_id) {
        targetActivity.contents.splice(i, 1)
      }
    }

    // re-sort contents in ascending order
    let contents = targetActivity.contents.slice(0)
    contents.sort(function (a, b) {
      if (a.subnav_id < b.subnav_id) return -1
      if (a.subnav_id > b.subnav_id) return 1
      return 0
    })

    // re-apply ids to contents one by one from the beginning
    for (let i = 0; i < contents.length; i++) {
      contents[i].subnav_id = i + 1
    }

    // update
    targetActivity.contents = contents
  },
  removeSection (state, data) {
    // pick the activity object with the given id
    let targetActivity = getTargetActivity(state.activities, state.tempDataForRemoving.act_id)

    // pick the content object with the given id
    let targetContent  = getTargetContent(targetActivity.contents, state.tempDataForRemoving.tab_id)

    // if there's only one section, don't allow to remove it
    if (targetContent.sections.length <= 1) {
      console.error('couldn\'t remove the section because it\'s the last one.')
      return
    }

    // remove a section with the given id
    for (let i = targetContent.sections.length - 1; i >= 0; i--) {
      if (targetContent.sections[i].section_id === state.tempDataForRemoving.sec_id) {
        targetContent.sections.splice(i, 1)
      }
    }

    // re-sort sections in ascending order
    let sections = targetContent.sections.slice(0)
    sections.sort(function (a, b) {
      if (a.section_id < b.section_id) return -1
      if (a.section_id > b.section_id) return 1
      return 0
    })

    // re-apply ids to sections one by one from the beginning
    for (let i = 0; i < sections.length; i++) {
      sections[i].section_id = i + 1
    }

    // update
    targetContent.sections = sections
  },
  removeItem (state, data) {
    // pick the activity object with the given id
    let targetActivity = getTargetActivity(state.activities, state.tempDataForRemoving.act_id)

    // pick the content object with the given id
    let targetContent  = getTargetContent(targetActivity.contents, state.tempDataForRemoving.tab_id)

    // if there's only one item, don't allow to remove it
    if (targetContent.items.length <= 1) {
      console.log('couldn\'t remove the item because it\'s the last one.')
      return
    }

    // remove a item with the given id
    for (let i = targetContent.items.length - 1; i >= 0; i--) {
      if (targetContent.items[i].item_id === state.tempDataForRemoving.itm_id) {
        targetContent.items.splice(i, 1)
      }
    }

    // re-sort items in ascending order
    let items = targetContent.items.slice(0)
    items.sort(function (a, b) {
      if (a.item_id < b.item_id) return -1
      if (a.item_id > b.item_id) return 1
      return 0
    })

    // re-apply ids to items one by one from the beginning
    for (let i = 0; i < items.length; i++) {
      items[i].item_id = i + 1
    }

    // update
    targetContent.items = items
  },
  updateSelectedActivityId (state, data) {
    state.selectedActivityId = data
  },
  updateActiveTabId (state, data) {
    state.activeTabId = data
  },
  updateIsFirstActivityClicked (state, data) {
    state.isFirstActivityClicked = data
  },
  changeActivityOrder (state, data) {
    // pick the activity object with the given id
    let targetActivity = getTargetActivity(state.activities, data.act_id)
    console.log(data)

    let swappedActivity = getTargetActivity(state.activities, data.act_id + data.value)

    // swap the id
    targetActivity.activity_id  += data.value
    swappedActivity.activity_id -= data.value
  },
  changeContentOrder (state, data) {
    let targetActivity = getTargetActivity(state.activities, data.act_id)
    let targetContent  = getTargetContent(targetActivity.contents, data.tab_id)

    let swappedContent  = getTargetContent(targetActivity.contents, data.tab_id + data.value)

    // swap the id
    targetContent.subnav_id  += data.value
    swappedContent.subnav_id -= data.value
  },
  changeSectionOrder (state, data) {
    let targetActivity = getTargetActivity(state.activities, data.act_id)
    let targetContent  = getTargetContent(targetActivity.contents, data.tab_id)
    let targetSection  = getTargetSection(targetContent.sections, data.sec_id)

    let swappedSection  = getTargetSection(targetContent.sections, data.sec_id + data.value)

    // swap the id
    targetSection.section_id  += data.value
    swappedSection.section_id -= data.value
  },
  updateAuthentication (state, data) {
    state.isAuthenticated = data
  },
  resetState (state) {
    state.activitiesToRemove = []
  }
}

/* =================================================
 actions
================================================== */
const actions = {
  // ===============================================
  updateGeneralSettings (context) {
    return new Promise((resolve, reject) => {
      // ajax request using axios
      axios.get(V.SERVER_URL + '/data/general-settings')
      .then((res) => {
        console.log('new general settings fetched: ', res.data)

        // commit the new values to state
        context.commit('updateGeneralSettings', res.data)

        resolve() // resolve a promise
      })
      .catch((error) => {
        console.log(error)
      })
    })
  },
  // ===============================================
  submitGeneralSettings (context) {
    return new Promise((resolve, reject) => {
      // ajax request using axios
      axios.post(V.SERVER_URL + '/data/general-settings', {
        generalSettings: context.state.generalSettings
      })
      .then((res) => {
        console.log('new general settings fetched: ', res.data)

        // commit the new values to state
        context.commit('updateGeneralSettings', res.data)

        // resolve a promise
        resolve()
      })
      .catch((error) => {
        console.log(error)
      })
    })
  },
  // ===============================================
  updateActivities (context) {
    return new Promise((resolve, reject) => {
      // ajax request using axios
      axios.get(V.SERVER_URL + '/data/activities')
      .then((res) => {
        console.log('new activities fetched: ', res.data)

        // commit the new values to state
        context.commit('updateActivities', res.data)

        resolve() // resolve a promise
      })
      .catch((error) => {
        console.log(error)
      })
    })
  },
  // ===============================================
  submitActivities (context) {
    return new Promise((resolve, reject) => {
      console.log('submitting activities', context.state.activities)
      console.log('and removing activities', context.state.activitiesToRemove)
      // ajax request using axios
      axios.post(V.SERVER_URL + '/data/activities', {
        activities: context.state.activities,
        activitiesToRemove: context.state.activitiesToRemove
      })
      .then((res) => {
        console.log('new activities fetched: ', res.data)

        context.commit('resetState') // reset activities to remove

        // commit the new values to state
        // context.commit('updateActivities', res.data)

        // resolve a promise
        resolve()
      })
      .catch((error) => {
        console.log(error)
      })
    })
  },
  // ===============================================
  uploadImage (context, data) {
    let formdata = new FormData()
    formdata.append('image', data)

    console.log('sending: ', formdata.get('image'))

    return new Promise((resolve, reject) => {
      // ajax request using axios
      axios.post(V.SERVER_URL + '/data/images', formdata)
      .then((res) => {
        console.log('new images fetched: ', res.data)

        // commit the new values to state
        context.commit('updateMediaItems', res.data)

        resolve() // resolve a promise
      })
      .catch((error) => {
        console.log(error)
      })
    })
  },
  // ===============================================
  deleteImage (context, data) {
    console.log('deleting: ', data)

    return new Promise((resolve, reject) => {
      // ajax request using axios
      axios.post(V.SERVER_URL + '/data/images/delete', data)
      .then((res) => {
        console.log('new images fetched: ', res.data)

        // commit the new values to state
        context.commit('updateMediaItems', res.data)

        resolve() // resolve a promise
      })
      .catch((error) => {
        console.log(error)
      })
    })
  },
  // ===============================================
  updateMediaItems (context) {
    return new Promise((resolve, reject) => {
      // ajax request using axios
      axios.get(V.SERVER_URL + '/data/images')
      .then((res) => {
        console.log('new images fetched: ', res.data)

        // commit the new values to state
        context.commit('updateMediaItems', res.data)

        resolve() // resolve a promise
      })
      .catch((error) => {
        console.log(error)
      })
    })
  },
  // ===============================================
  login (context, data) {
    console.log('logging in...', data)
    return new Promise((resolve, reject) => {
      axios.post(V.SERVER_URL + '/data/login', {password: data})
      .then((res) => {
        console.log('login result:', res.data.auth)
        if (res.data.auth) {
          context.commit('updateAuthentication', true)
          resolve() // resolve a promise
        } else {
          reject({error: null})
        }
      })
      .catch((error) => {
        console.log('login failed:', error)
        reject({error: error})
      })
    })
  },
  generateSessionid (context) {
    console.log('generating session id...')

    axios.post(V.SERVER_URL + '/login/generate-sessionid')
    .then((res) => {
    })
    .catch((error) => {
      console.log(error)
    })
  }
}

/* =================================================
 getters
================================================== */
const getters = {
  getSize:                   state => () => state.size,
  getIsEditing:              state => () => state.isEditing,
  getActivities:             state => () => state.activities,
  getSelectedActivityId:     state => () => state.selectedActivityId,
  getActiveTabId:            state => () => state.activeTabId,
  getIsFirstActivityClicked: state => () => state.isFirstActivityClicked,
  // return an activity data selected in the side menu
  getSelectedActivity (state) {
    for (let i = 0; i < state.activities.length; i++) {
      const activity = state.activities[i]
      if (activity.activity_id === state.selectedActivityId) {
        return activity
      }
    }
    console.log('in store getters: couldn\'t get a selected activity')
    return null
  },
  // return a content data of an active tab
  getActiveTabContent (state, getters) {
    let selectedActivityContents = getters.getSelectedActivity.contents
    for (let i = 0; i < selectedActivityContents.length; i++) {
      const content = selectedActivityContents[i]
      if (content.subnav_id === state.activeTabId) {
        return content
      }
    }
    console.log('in store getters: couldn\'t get content')
  }
}

/* =================================================
 utility functions
================================================== */
let getTargetActivity = function (activities, id) {
  let targetActivity
  for (let i = 0; i < activities.length; i++) {
    if (activities[i].activity_id === id) {
      targetActivity = activities[i]
    }
  }
  return targetActivity
}

let getTargetContent = function (contents, id) {
  let targetContent
  for (let i = 0; i < contents.length; i++) {
    if (contents[i].subnav_id === id) {
      targetContent = contents[i]
    }
  }
  return targetContent
}

let getTargetSection = function (sections, id) {
  let targetSection
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].section_id === id) {
      targetSection = sections[i]
    }
  }
  return targetSection
}

let getTargetItem = function (items, id) {
  let targetItem
  for (let i = 0; i < items.length; i++) {
    if (items[i].item_id === id) {
      targetItem = items[i]
    }
  }
  return targetItem
}

/* =================================================
 export
================================================== */
export default {
  state,
  mutations,
  actions,
  getters
}
