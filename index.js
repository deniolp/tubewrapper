'use stricts';

let videoList = document.querySelector('.videos');
let button = document.querySelector('#button');
let input = document.querySelector('#input');
let fragment = document.createDocumentFragment();

function addVideoToList(video) {
  let template = document.querySelector('#template').content.querySelector('.video');
  
  fragment.appendChild(createVideoElement(template, video));
}

function createVideoElement(template, object) {
  let element = template.cloneNode(true);
  element.querySelector('.video__header').innerText = object.snippet.title;
  element.querySelector('.video__link').src = 'https://www.youtube.com/watch?v=' + object.id.videoId;
  
  return element;
}

function getData(url) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    
    xhr.addEventListener('load', function() {
      if (xhr.status === 200) {
        let json = xhr.response.items.slice(0, -1);
        console.log(json);
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

button.addEventListener('click', function() {
  let search = input.value;
  
  while(videoList.firstChild) {
    videoList.removeChild(videoList.firstChild);
  }
  
  getData('https://www.googleapis.com/youtube/v3/search?part=snippet,id&order=date&channelId=' +  search + '&maxResults=50&key=AIzaSyC9j5myBqjEoydyrootsBO1iqe9-dSpPaA')
    .then(videos =>
      videos.forEach(video =>
        addVideoToList(video)))
    .then(videoList.appendChild(fragment))
    .catch(error => console.log(error));
});