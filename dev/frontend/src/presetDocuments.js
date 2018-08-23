import objectId from 'objectid';

let preset = {
  /* =============== create a new activity =============== */
  // return an activity object
  createNewActivity({act_id}) {
    return {
      _id: objectId(),
      activity_id: act_id,
      main_color: {
        'hsl': {
          'h': 0, 's': 0, 'l': 80, 'a': 1,
        },
        'hex': '#CCCCCC',
        'rgba': {
          'r': 204, 'g': 204, 'b': 204, 'a': 1,
        },
        'hsv': {
          'h': 0, 's': 0, 'v': 80, 'a': 1,
        },
        'a': 1,
      },
      sub_color: {
        'hsl': {
          'h': 0, 's': 0, 'l': 93.3, 'a': 1,
        },
        'hex': '#EEEEEE',
        'rgba': {
          'r': 238, 'g': 238, 'b': 238, 'a': 1,
        },
        'hsv': {
          'h': 0, 's': 0, 'v': 93.3, 'a': 1,
        },
        'a': 1,
      },
      button_label: 'NEW ACTIVITY',
      page_title: 'NEW ACTIVITY',
      icon_uri: '',
      contents: [this.createNewTab({
        tab_id: 1,
        templateType: 'GENERAL INFO',
      })],
    };
  },
  /* =============== create a new tab =============== */
  // there are four types of templates for now.
  // return an tab content object
  createNewTab({tab_id, templateType}) {
    let newTab;

    // GENERAL INFO
    if (templateType === 'GENERAL INFO') {
      newTab = {
        _id: objectId(),
        subnav_id: tab_id,
        subnav_label: 'NEW TAB',
        template_type: 'GENERAL INFO',
        number_of_images: 2,
        left_image_uri: '',
        right_image_uri: '',
        raw_html_text: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis aliquet sapien, vitae sollicitudin mi. In porta dapibus felis, eu lobortis diam vehicula id. Suspendisse luctus faucibus sapien sed mollis. Suspendisse consectetur, urna quis convallis gravida, nisl ligula vehicula eros, quis imperdiet eros massa vel arcu. Sed aliquam, urna vitae pretium sollicitudin, arcu ligula elementum tortor, at gravida lectus ipsum quis tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse venenatis dui tempor imperdiet imperdiet. Ut eu tristique turpis. Etiam at turpis in ipsum tristique vulputate. Nunc porttitor purus vitae sem porttitor, id rhoncus massa auctor. Curabitur at augue hendrerit, mattis lacus sed, auctor tellus. Sed scelerisque, ipsum at dictum pharetra, mauris eros molestie tortor, in imperdiet nibh ex vitae sem.</p>',
      };
    }
    // LOCATIONS
    else if (templateType === 'LOCATIONS') {
      newTab = {
        _id: objectId(),
        subnav_id: tab_id,
        subnav_label: 'NEW TAB',
        template_type: 'LOCATIONS',
        sections: [this.createNewSection({
          sec_id: 1,
          templateType: templateType,
        })],
      };
    }
    // CATALOG
    else if (templateType === 'CATALOG') {
      newTab = {
        _id: objectId(),
        subnav_id: tab_id,
        subnav_label: 'NEW TAB',
        template_type: 'CATALOG',
        page_title: 'HEADER TITLE',
        page_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis aliquet sapien, vitae sollicitudin mi. In porta dapibus felis, eu lobortis diam vehicula id. Suspendisse luctus faucibus sapien sed mollis. Suspendisse consectetur, urna quis convallis gravida, nisl ligula vehicula eros, quis imperdiet eros massa vel arcu. Sed aliquam, urna vitae pretium sollicitudin, arcu ligula elementum tortor, at gravida lectus ipsum quis tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse venenatis dui tempor imperdiet imperdiet. Ut eu tristique turpis. Etiam at turpis in ipsum tristique vulputate. Nunc porttitor purus vitae sem porttitor, id rhoncus massa auctor. Curabitur at augue hendrerit, mattis lacus sed, auctor tellus. Sed scelerisque, ipsum at dictum pharetra, mauris eros molestie tortor, in imperdiet nibh ex vitae sem.</p>',
        items: [this.createNewItem({
          itm_id: 1,
          templateType: templateType,
        })],
      };
    }
    // GALLERY
    else if (templateType === 'GALLERY') {
      newTab = {
        _id: objectId(),
        subnav_id: tab_id,
        subnav_label: 'NEW TAB',
        template_type: 'GALLERY',
        items: [this.createNewItem({
          itm_id: 1,
          templateType: templateType,
        })],
      };
    }
    // if the given template type doesn't match
    else {
      console.error('Could not create a new tab because the given template type name is not valid.');
    }

    return newTab;
  },
  /* =============== create a new section =============== */
  // return a section object
  createNewSection({sec_id, templateType}) {
    let newSection;
    // LOCATIONS
    if (templateType === 'LOCATIONS') {
      newSection = {
        _id: objectId(),
        section_id: sec_id,
        section_title: 'NEW SECTION',
        number_of_images: 3,
        map_image_filename: '',
        ref_1_image_filename: '',
        ref_2_image_filename: '',
        raw_html_text: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis aliquet sapien, vitae sollicitudin mi. In porta dapibus felis, eu lobortis diam vehicula id. Suspendisse luctus faucibus sapien sed mollis. Suspendisse consectetur, urna quis convallis gravida, nisl ligula vehicula eros, quis imperdiet eros massa vel arcu. Sed aliquam, urna vitae pretium sollicitudin, arcu ligula elementum tortor, at gravida lectus ipsum quis tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse venenatis dui tempor imperdiet imperdiet. Ut eu tristique turpis. Etiam at turpis in ipsum tristique vulputate. Nunc porttitor purus vitae sem porttitor, id rhoncus massa auctor. Curabitur at augue hendrerit, mattis lacus sed, auctor tellus. Sed scelerisque, ipsum at dictum pharetra, mauris eros molestie tortor, in imperdiet nibh ex vitae sem.</p>',
      };
    }
    // if the given template type doesn't match
    else {
      console.error('Could not create a new section because the given template type name is not valid.');
    }

    return newSection;
  },
  /* =============== create a new item =============== */
  // return an item object
  createNewItem({itm_id, templateType}) {
    let newItem;
    // CATALOG
    if (templateType === 'CATALOG') {
      newItem = {
        _id: objectId(),
        item_id: itm_id,
        item_image_filename: '',
        item_image_caption: '',
        item_title: 'NEW ITEM',
        item_description: 'WRITE TEXT HERE',
      };
    }
    // GALLERY
    else if (templateType === 'GALLERY') {
      newItem = {
        _id: objectId(),
        item_id: itm_id,
        item_image_filename: '',
        item_caption: '',
      };
    }
    // if the given template type doesn't match
    else {
      console.error('Could not create a new item because the given template type name is not valid.');
    }

    return newItem;
  },
};

export default preset;
