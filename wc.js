'use stricts';

(function() {
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
          max-width: 65px;
          height: 44px;
          border-radius: 2px;
          outline: none;
          background-color: #ffffff;
          box-sizing: border-box;
        }
        
        .nav-bar__item {
          display: flex;
          width: 325px;
        }
        
        @media (max-width: 785px) {
          .nav-bar__item {
            flex-direction: column;
          }
          
          input {
            margin-bottom: 10px;
          }
        }
        
        @media (max-width: 695px) {
          .nav-bar__item{
            margin-bottom: 10px;
          }
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

  class PopupInfo extends HTMLElement {
    constructor() {
      super();

      let shadow = this.attachShadow({
        mode: 'open'
      });

      let wrapper = document.createElement('span');
      let icon = document.createElement('span');
      let popup = document.createElement('span');
      let text = this.getAttribute('text');
      let img = document.createElement('img');
      let style = document.createElement('style');

      wrapper.className = 'wrapper';
      icon.className = 'icon';
      icon.setAttribute('tabindex', 0);
      popup.className = 'popup';
      popup.textContent = text;
      img.src = 'media/info.png';
      icon.appendChild(img);

      style.textContent = `
        .wrapper {
          position: absolute;
        }
        
        .popup {
          font-size: 15px;
          width: 200px;
          display: inline-block;
          border: solid 1px black;
          padding: 8px;
          background: #ffffff;
          border-radius: 10px;
          opacity: 0;
          transition: 0.6s all;
          position: absolute;
          top: -25px;
          right: -65px;
          z-index: 4; 
        }
        
        .icon {
          position: absolute;
          top: -22px;
          right: 215px;
        }
        
        img {
          width: 20px;
        }
        
        .icon:hover + .popup, .icon:focus + .popup {
          opacity: 1;
        }
      `

      shadow.appendChild(style);
      shadow.appendChild(wrapper);
      wrapper.appendChild(icon);
      wrapper.appendChild(popup);
    }
  }

  customElements.define('query-element', QueryElement);
  customElements.define('popup-info', PopupInfo);
})();