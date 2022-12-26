module.exports = {
  extends: [
    'stylelint-config-recommended-vue/scss'
  ],
  plugins: [
    "stylelint-order"
  ],
  rules: {
    "order/order": [
      "custom-properties",
      "declarations"
    ],
    "order/properties-alphabetical-order": true
  }
};
