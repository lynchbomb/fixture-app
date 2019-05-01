import Component from '@ember/component';

export default Component.extend({
  didInsertElement: function () {
    this.element.textContent = this.get('data');
  }
});
