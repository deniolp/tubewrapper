'use stricts';

(function() {
  setTimeout(function() {
    let CHANNEL_QUERY = 'order=date&channelId=';
    let SEARCH_QUERY = 'q=';

    let videoList = document.querySelector('.videos');
    let shadows = document.querySelectorAll('query-element');
    let buttons = [];
    let inputs = [];
    let shadowRoots = shadows.forEach(function(shadow) {
      buttons.push(shadow.shadowRoot.querySelector('button'));
      inputs.push(shadow.shadowRoot.querySelector('input'));
    });
    let fragment = document.createDocumentFragment();

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
            let json = xhr.response.items;
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
      getData('https://www.googleapis.com/youtube/v3/search?part=snippet,id&' + query + search + '&maxResults=49&key=AIzaSyC9j5myBqjEoydyrootsBO1iqe9-dSpPaA')
        .then(function(videos) {
          videos.forEach(function(video) {
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

    buttons.forEach(function(button) {
      if (button.id === 'channel') {
        button.addEventListener('click', function() {
          let search = inputs[0].value;
          if (search !== '') {
            removeVideos();
            fillVideoList(CHANNEL_QUERY, search);
          }
        });
      }

      if (button.id === 'search') {
        button.addEventListener('click', function() {
          let search = inputs[1].value;
          if (search !== '') {
            removeVideos();
            fillVideoList(SEARCH_QUERY, search);
          }
        });
      }
    });
  }, 300);
})();