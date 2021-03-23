export const _ = {
  $(selector, base = document) {
    return base.querySelector(selector);
  },
  $All(selector, base = document) {
    return base.querySelectorAll(selector);
  },
};

export const createDom = (tag) => ({ value = '', classes = [] } = {}) =>
  `<${tag} class='${classes.join(' ')}'>${value}</${tag}>`;
