'use stricts';

(function() {
  let texts = [];
  let i = 0;
  
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
          color: black;
          margin-right: 10px;
          padding-left: 20px;
          padding-right: 20px;
          border-radius: 2px;
          outline: none;
          box-sizing: border-box;
          background-color: #edf1f7b3;
        }
        
        @media (max-width: 440px) {
          input {
            width: 215px;
          }
        }
        
        input:hover, input:focus, button:hover, button:focus {
          box-shadow: 0 1px 20px 0 rgba(1, 3, 11, 0.95);
          border-color: rgba(223,225,229,0);
        }
        button {
          padding: 7px;
          border: 1px solid #dfe1e5;
          box-shadow: none;
          color: black;
          font-size: 16px;
          max-width: 65px;
          height: 44px;
          border-radius: 2px;
          outline: none;
          background-color: #edf1f7b3;
          box-sizing: border-box;
        }
        
        .nav-bar__item {
          display: flex;
          width: 325px;
        }
        
        @media (max-width: 1145px) {
          .nav-bar__item {
            margin-bottom: 10px;
          }
        }
        
        @media (max-width: 620px) {
          .nav-bar__item {
            flex-direction: column;
          }
          
          input {
            margin-bottom: 10px;
          }
        }
        </style>
        <div class="nav-bar__item">
          <input type="text" name="search" value="" placeholder="" text="">
          <button type="button" id="" name="button">Поиск</button>
          <popup-info></popup-info>
        </div>
      `;

      shadow.appendChild(template.content.cloneNode(true));

      let button = shadow.querySelector('button');
      let input = shadow.querySelector('input');
      let type = this.getAttribute('type');
      let placeHolder = this.getAttribute('placeholder');
      texts.push(this.getAttribute('text'));
      input.placeholder = placeHolder;
      button.id = type;
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
      let img = document.createElement('img');
      let style = document.createElement('style');

      wrapper.className = 'wrapper';
      icon.className = 'icon';
      icon.setAttribute('tabindex', 0);
      popup.className = 'popup';
      popup.textContent = texts[i];
      i++;
      img.src = 'media/info.png';
      icon.appendChild(img);

      style.textContent = `
        .wrapper {
          position: absolute;
        }
        
        .popup {
          font-size: 15px;
          width: 200px;
          display: none;
          border: solid 1px black;
          padding: 8px;
          background: #ffffff;
          border-radius: 10px;
          transition: 0.6s all;
          position: absolute;
          top: 45px;
          right: 0;
          z-index: 4; 
        }
        
        .icon {
          position: absolute;
          top: 20px;
          left: 5px;
        }
        
        @media (max-width: 835px) {
          .popup {
            right: -250px;
          }
        }
        
        @media (max-width: 620px) {
          .icon {
            top: -25px;
            left: 70px;
          }
          
          .popup {
            top: -20px;
            left: 95px;
          }
        }
        
        img {
          width: 20px;
        }
        
        .icon:hover + .popup, .icon:focus + .popup {
          display: inline-block;
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