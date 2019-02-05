'use stricts';

(function () {
  let texts = [];
  let i = 0;

  class QueryElement extends HTMLElement {
    constructor() {
      super();

      let shadow = this.attachShadow({
        mode: `open`
      });

      let template = document.createElement(`template`);
      template.innerHTML = `
        <style>
        input {
          width: 50%;
          border: 1px solid #263346e6;
          box-shadow: none;
          font-size: 16px;
          color: #263346e6;
          padding: 5px;
          border-radius: 2px;
          outline: none;
          box-sizing: border-box;
          background-color: #fff;
          transition: all ease 0.3s;
        }
        
        input:hover, input:focus, button:hover, button:focus {
          box-shadow: 0 1px 20px 0 rgba(1, 3, 11, 0.95);
          border-color: rgba(223,225,229,0);
        }

        input:hover,
        input:focus {
          width: 65%;
        }

        input:hover + button,
        input:focus + button {
          width: 15%;
        }
        
        button {
          width: 25%;
          min-width: 45px;
          padding: 5px;
          border: 1px solid #263346e6;
          box-shadow: none;
          color: #263346e6;
          font-size: 16px;
          max-width: 65px;
          border-radius: 2px;
          outline: none;
          background-color: #fff;
          box-sizing: border-box;
          transition: all ease 0.3s;
        }
        
        .nav-bar__item {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
        </style>
        <div class="nav-bar__item">
          <input type="text" name="search" value="" placeholder="" text="">
          <button type="button" id="" name="button">click</button>
          <popup-info></popup-info>
        </div>
      `;

      shadow.appendChild(template.content.cloneNode(true));

      let button = shadow.querySelector(`button`);
      let input = shadow.querySelector(`input`);
      let type = this.getAttribute(`type`);
      let placeHolder = this.getAttribute(`placeholder`);
      texts.push(this.getAttribute(`text`));
      input.placeholder = placeHolder;
      button.id = type;
    }
  }

  class PopupInfo extends HTMLElement {
    constructor() {
      super();

      let shadow = this.attachShadow({
        mode: `open`
      });

      let wrapper = document.createElement(`span`);
      let icon = document.createElement(`span`);
      let popup = document.createElement(`span`);
      let img = document.createElement(`img`);
      let style = document.createElement(`style`);

      wrapper.className = `wrapper`;
      icon.className = `icon`;
      icon.setAttribute(`tabindex`, 0);
      popup.className = `popup`;
      popup.textContent = texts[i];
      i++;
      img.src = `media/outline-info-24px.svg`;
      icon.appendChild(img);

      let fireRedInfo = function () {
        img.src = `media/info-red.svg`;
        img.addEventListener(`mouseout`, function () {
          img.src = `media/outline-info-24px.svg`;
          img.removeEventListener(`mouseover`);
        });
        icon.addEventListener(`focusout`, function () {
          img.src = `media/outline-info-24px.svg`;
          icon.removeEventListener(`focusin`);
        });
      };

      style.textContent = `
        .wrapper {
          position: absolute;
        }
        
        .popup {
          font-size: 15px;
          font-family: 'PT Sans', sans-serif;
          color: #263346e6;
          width: 150px;
          display: none;
          border: solid 1px #263346e6;
          padding: 8px;
          background: #ffffff;
          border-radius: 10px;
          transition: 0.6s all;
          position: absolute;
          top: 0px;
          left: 20px;
          z-index: 4; 
        }
        
        .icon {
          position: absolute;
          top: 6px;
          right: -10px;
        }
        
        @media (max-width: 705px) {
          .icon {
            right: 3px;
          }
          
          .popup {
            top: 0px;
            left: -190px;
          }
        }
        
        img {
          width: 20px;
        }
        
        .icon:hover + .popup,
        .icon:focus + .popup {
          display: inline-block;
        }
      `;

      img.addEventListener(`mouseover`, fireRedInfo);
      icon.addEventListener(`focusin`, fireRedInfo);

      shadow.appendChild(style);
      shadow.appendChild(wrapper);
      wrapper.appendChild(icon);
      wrapper.appendChild(popup);
    }
  }

  customElements.define(`query-element`, QueryElement);
  customElements.define(`popup-info`, PopupInfo);
})();
