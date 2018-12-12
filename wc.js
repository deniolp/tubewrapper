'use stricts';

(function () {
  class QueryElement extends HTMLElement {
    constructor() {
      super();
      
      let shadow = this.attachShadow({mode: 'open'});
    }
  }
})();