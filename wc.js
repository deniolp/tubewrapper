'use stricts';

(function () {
  class QueryElement extends HTMLElement {
    constructor() {
      super();
      
      let shadow = this.attachShadow({
        mode: 'open'
      });
      
      let template = document.createElement('template');
      template.innerHTML = `
        <style>
        input {
          width: 270px;
          height: 44px;
          border: 1px solid #dfe1e5;
          box-shadow: none;
          font-size: 16px;
          color: #bfb5b5;
          margin-right: 10px;
          padding-left: 20px;
          padding-right: 20px;
          border-radius: 2px;
          outline: none;
          box-sizing: border-box;
        }
        
        input:hover, input:focus, button:hover, button:focus {
          box-shadow: 0 1px 16px 0 rgba(32,33,36,0.28);
          border-color: rgba(223,225,229,0);
        }

        button {
          padding: 7px;
          border: 1px solid #dfe1e5;
          box-shadow: none;
          color: #bfb5b5;
          font-size: 16px;
          height: 44px;
          border-radius: 2px;
          outline: none;
          background-color: #ffffff;
          box-sizing: border-box;
        }
        </style>
        <div class="nav-bar__item">
          <input type="text" name="search" value="" placeholder="">
          <button type="button" id="" name="button">Поиск</button>
        </div>
      `;
      
      shadow.appendChild(template.content.cloneNode(true));
      
      let button = shadow.querySelector('button');
      let input = shadow.querySelector('input');
      let type = this.getAttribute('type');
      let placeHolder = this.getAttribute('placeholder');
      input.placeholder = placeHolder;
      button.id = type;
      input.id = type;
    }
  }
  customElements.define('query-element', QueryElement);
})();