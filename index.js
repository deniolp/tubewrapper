'use stricts';

(function() {
  setTimeout(function() {
    let CHANNEL_QUERY = 'order=date&channelId=';
    let SEARCH_QUERY = 'order=viewCount&q=';
    let NAME_QUERY = 'order=date&forUsername=';
    let KEYCODE_ENTER = 13;
    
    function addVideoToList(video) {
      let template = document.querySelector('#template').content.querySelector('.video');

      fragment.appendChild(createVideoElement(template, video));
    }

    function createVideoElement(template, object) {
      let element = template.cloneNode(true);
      element.querySelector('.video__header').innerText = object.snippet.title;
      element.querySelector('.video__link').href = 'https://www.youtube.com/watch?v=' + object.id.videoId;
      element.querySelector('.video__picture').srcset = 'https://img.youtube.com/vi_webp/' + object.id.videoId + '/maxresdefault.webp';
      element.querySelector('.video__image').src = 'https://img.youtube.com/vi/' + object.id.videoId + '/maxresdefault.jpg';
      element.querySelector('.video__image').alt = object.snippet.title;

      return element;
    }

    function getData(url) {
      return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', function() {
          if (xhr.status === 200) {
            let json = xhr.response;
            resolve(json);
          } else {
            reject(xhr.statusText);
          }
        });

        xhr.addEventListener('error', function(error) {
          reject(error);
        });

        xhr.open('GET', url);
        xhr.send();
      });
    }

    function removeVideos() {
      while (videoList.firstChild) {
        videoList.removeChild(videoList.firstChild);
      }
    }

    function fillVideoList(query, search) {
      removeVideos();
      let queryURL = '';
      if (query === 'channel') {
        queryURL = CHANNEL_QUERY;
      }
      if (query === 'search') {
        queryURL = SEARCH_QUERY;
      }
      if (query === 'name') {
        queryURL = NAME_QUERY;
        
        getData('https://www.googleapis.com/youtube/v3/channels?' + queryURL + search +  '&part=snippet&maxResults=49&key=AIzaSyC9j5myBqjEoydyrootsBO1iqe9-dSpPaA')
          .then(function(response) {
            search = response.items[0].id;
            queryURL = CHANNEL_QUERY;
            
            getData('https://www.googleapis.com/youtube/v3/search?part=snippet,id&' + queryURL + search + '&maxResults=49&key=AIzaSyC9j5myBqjEoydyrootsBO1iqe9-dSpPaA')
              .then(function(videos) {
                videos.items.forEach(function(video) {
                  if (video.id.kind === 'youtube#video') {
                    addVideoToList(video);
                  }
                });
                videoList.appendChild(fragment);
                findVideos();
              })
              .catch(error => console.log(error));
          })
          .catch(error => console.log(error));
          
          return;
      }

      getData('https://www.googleapis.com/youtube/v3/search?part=snippet,id&' + queryURL + search + '&maxResults=49&key=AIzaSyC9j5myBqjEoydyrootsBO1iqe9-dSpPaA')
        .then(function(videos) {
          videos.items.forEach(function(video) {
            if (video.id.kind === 'youtube#video') {
              addVideoToList(video);
            }
          });
          videoList.appendChild(fragment);
          findVideos();
        })
        .catch(error => console.log(error));
    }

    function findVideos() {
      let videos = document.querySelectorAll('.video__wrapper');
      let footer = document.querySelector('.footer');
      
      if(videos.length = 49) {
        footer.classList.add('footer--visible');
      }
      
      for (var i = 0; i < videos.length; i++) {
        setupVideo(videos[i]);
      }
    }

    function setupVideo(video) {
      let link = video.querySelector('.video__link');
      let image = video.querySelector('.video__image');
      let button = video.querySelector('.video__button');
      let id = parseURL(image);

      video.addEventListener('click', function() {
        let iframe = createIframe(id);

        link.remove();
        button.remove();
        video.appendChild(iframe);
      });

      link.removeAttribute('href');
      video.classList.add('video-wrapper--enabled');
    }

    function parseURL(data) {
      let regexp = /https:\/\/img\.youtube\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
      let url = data.src;
      let match = url.match(regexp);

      return match[1];
    }

    function createIframe(id) {
      let iframe = document.createElement('iframe');

      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('allow', 'autoplay');
      iframe.setAttribute('src', generateURL(id));
      iframe.classList.add('video__image');

      return iframe;
    }

    function generateURL(id) {
      let query = '?rel=0&showinfo=0&autoplay=1';

      return 'https://www.youtube.com/embed/' + id + query;
    }

    let videoList = document.querySelector('.videos');
    let shadows = document.querySelectorAll('query-element');
    let buttons = [];
    let inputs = [];
    let fragment = document.createDocumentFragment();

    shadows.forEach(function(shadow) {
      buttons.push(shadow.shadowRoot.querySelector('button'));
      inputs.push(shadow.shadowRoot.querySelector('input'));
    });

    inputs.forEach(function(input) {
      input.addEventListener('focus', function() {
        input.addEventListener('keydown', function(evt) {
          if (evt.keyCode === KEYCODE_ENTER) {
            let search = input.value;
            if (search !== '') {
              let query = buttons[inputs.indexOf(input)].id;
              fillVideoList(query, search);
            }
          }
        });
      });
    });

    buttons.forEach(function(button) {
      button.addEventListener('click', function() {
        let search = inputs[buttons.indexOf(button)].value;
        if (search !== '') {
          fillVideoList(button.id, search);
        }
      });
    });
  }, 300);
})();