'use stricts';

(function () {
  class QueryElement extends HTMLElement {
    constructor() {
      super();
      
      let shadow = this.attachShadow({mode: 'open'});
      
      let wrapper = document.createElement('div');
      let input = document.createElement('input');
      let button = document.createElement('button');
      // let script = document.createElement('script');
      let style = document.createElement('style');
      
      wrapper.setAttribute('class', 'nav-bar__item');
      input.setAttribute('type', 'text');
      button.setAttribute('type', 'button');
      button.textContent = 'Поиск';
      // script.setAttribute('type', 'text/javascript');
      
      let placeholder = this.getAttribute('placeholder');
      let classInput = this.getAttribute('classInput');
      let classButton = this.getAttribute('classButton');
      // let srcScript = this.getAttribute('srcScript');
      input.placeholder = placeholder;
      input.className = classInput;
      button.className = classButton;
      // script.src = srcScript;
      
      style.textContent = `
        .nav-bar__item {
          display: flex;
          width: 300px;
        }
        
        .nav-bar__input {
          box-sizing: border-box;
          width: 230px;
          height: 30px;
          box-shadow: 0 0 3px rgba(146,140,140,140.5);
          border: none;
          font-size: 14px;
          color: #bfb5b5;
          margin-right: 10px;
          padding-left: 5px;
        }
        
        .nav-bar__button {
          box-sizing: border-box;
          height: 30px;
          padding: 8px;
          border: none;
          box-shadow: 0 0 3px rgba(146, 140, 140, 1);
          color: #bfb5b5;
          font-size: 14px;
        }
      `
      
      shadow.appendChild(wrapper);
      wrapper.appendChild(style);
      wrapper.appendChild(input);
      wrapper.appendChild(button);
      // wrapper.appendChild(script);
    }
  }
  customElements.define('query-element', QueryElement);
})();