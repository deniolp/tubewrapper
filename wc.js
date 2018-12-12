'use stricts';

(function () {
  class QueryElement extends HTMLElement {
    constructor() {
      super();
      
      let shadow = this.attachShadow({mode: 'open'});
      
      let wrapper = document.createElement('div');
      let input = document.createElement('input');
      let button = document.createElement('button');
      let script = document.createElement('script');
      
      wrapper.setAttribute('class', 'nav-bar__item');
      input.setAttribute('type', 'text');
      button.setAttribute('type', 'button');
      button.textContent = 'Поиск';
      
      let placeholder = this.getAttribute('placeholder');
      let idInput = this.getAttribute('idInput');
      let idButton = this.getAttribute('idButton');
      let srcScript = this.getAttribute('srcScript');
      input.textContent = placeholder;
      input.id = idInput;
      button.id = idButton;
      script.src = srcScript;
      
      shadow.appendChild(wrapper);
      wrapper.appendChild(input);
      wrapper.appendChild(button);
      wrapper.appendChild(script);
    }
  }
  customElements.define('query-element', QueryElement);
})();