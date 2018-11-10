exports.commands = function (selector, value) {
  return this.clearValue(selector)
    .setValue(value)
    .trigger(selector, 'keyup', 13)
}