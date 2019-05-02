import EmberRouter from '@ember/routing/router';
import {
  schedule
} from '@ember/runloop';

export default class Router extends EmberRouter {
  constructor() {
    super(...arguments);
    this.on('routeDidChange', () => {
      schedule('afterRender', this, renderEnd);
    });
  }
}

function renderEnd() {
  if (location.search === '?tracing') {
    const observer = new PerformanceObserver(list => {
      const navEntries = list.getEntriesByType("navigation");
      if (navEntries.length > 0) {
        navEntries.forEach((entry) => {
          if (entry.domComplete) {
            requestIdleCallback(() => {
              document.location.href = "about:blank"
            });
          }
        });
      }
    });
    observer.observe({
      entryTypes: ["navigation"]
    });
  }
}
