import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import {
  schedule
} from '@ember/runloop';

class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
  constructor() {
    super(...arguments);
    this.on('routeDidChange', () => {
      schedule('afterRender', this, renderEnd);
    });
  }
}

Router.map(function () {});

export default Router;

function renderEnd() {
  if (location.search === '?tracing') {
    const observer = new PerformanceObserver(list => {
      if (list.getEntriesByName("mark_meaningful_paint_end").length > 0) {
        requestIdleCallback(() => {
          this.document.location.href = "about:blank"
        });
      }
    });
    observer.observe({
      entryTypes: ["navigation", "mark"]
    });
  }
}
