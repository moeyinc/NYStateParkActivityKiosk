const helpers = {
  getTargetActivity(activities, id) {
    let targetActivity;
    for (let i = 0; i < activities.length; i++) {
      if (activities[i].activity_id === id) {
        targetActivity = activities[i];
      }
    }
    return targetActivity;
  },
  getTargetContent(contents, id) {
    let targetContent;
    for (let i = 0; i < contents.length; i++) {
      if (contents[i].subnav_id === id) {
        targetContent = contents[i];
      }
    }
    return targetContent;
  },
  getTargetSection(sections, id) {
    let targetSection;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].section_id === id) {
        targetSection = sections[i];
      }
    }
    return targetSection;
  },
  getTargetItem(items, id) {
    let targetItem;
    for (let i = 0; i < items.length; i++) {
      if (items[i].item_id === id) {
        targetItem = items[i];
      }
    }
    return targetItem;
  },
};

export default helpers;
