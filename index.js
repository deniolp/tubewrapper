'use stricts';

let videoList = document.querySelector('.videos');
let button = document.querySelector('#button');
let input = document.querySelector('#input');

function addVideoToList(video) {
  let fragment = document.createDocumentFragment();
  
}

function createVideoElement(tempale, object) {
  let element = template.cloneNode(true);
  
  
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
    .catch(error => console.log(error));
});