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
      if (xhr.status === '200') {
        let json = xhr.response;
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