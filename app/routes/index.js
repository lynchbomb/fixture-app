import Route from '@ember/routing/route';
import EmberObject from '@ember/object';

export default Route.extend({
  model() {
    var listItems = [];
    for (var i = 0; i < 50; i++) {
      listItems.pushObject(
        EmberObject.extend().create({
          a: "a" + i,
          b: "b" + i,
          c: "c" + i,
          color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
        })
      );
    }
    return listItems;
  }
});
