import Controller from '@ember/controller';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.color = "background-color: #" + Math.floor(Math.random() * 16777215).toString(16);
  }
});
