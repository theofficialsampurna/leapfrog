var indexImage = 0;
var indexDot = 0;
var dots;
var dotDiv;
var wrapper = document.getElementById('slideshow-wrapper');
var totalImages = wrapper.getElementsByTagName('img');
var imageNo = totalImages.length;
document.getElementById('slideshow-wrapper').style.width = (300 * totalImages.length) + 'px';

function checkIndex(val) {
  indexImage += val;
  syncDot(indexImage);
}

function resetIndex(val) {
  indexImage = val;
  syncDot(indexImage);
}

function previous() {
  if (indexImage === 0) {
    document.getElementById('slideshow-wrapper').style.left = (-300 * (imageNo - 1)) + 'px';
    resetIndex(imageNo - 1);
  }
  else {
    document.getElementById('slideshow-wrapper').style.left = (-300 * (indexImage - 1)) + 'px';
    checkIndex(-1);
  }
}

function next() {
  if (indexImage === (imageNo - 1)) {
    document.getElementById('slideshow-wrapper').style.left = 0 + 'px';
    resetIndex(0);
  }
  else {
    document.getElementById('slideshow-wrapper').style.left = (-300 * (indexImage + 1)) + 'px';
    checkIndex(1);
  }
  resetDot(imageNo);
}

setInterval(slideshow, 2000);
dotCreation();

function slideshow() {
  next();
}

function dotCreation() {
  for (var j = 0; j < imageNo; j++) {
    dotDiv = document.createElement('div');
    dotDiv.classList.add('dot');
    document.getElementById('dot-wrapper').appendChild(dotDiv);
  }
  dotDiv = document.getElementById('dot-wrapper').children;
  syncDot(0);
}

function syncDot(activeIndex) {
  console.log(dotDiv);
  for (var j = 0; j <= imageNo; j++) {
    if (j == activeIndex) {
      dotDiv[j].style.backgroundColor = 'black';
    }
    else {
      dotDiv[j].style.backgroundColor = 'white';
    }
  }
  // dots = document.getElementsByClassName('dot');
  // dots[activeIndex].style.backgroundColor = 'black';
  // resetDot(activeIndex);
}

function resetDot(activeIndex) {
  for (var j = 0; j <= imageNo; j++) {
    if (j != activeIndex) {
      dots[activeIndex].style.backgroundColor = 'white';
    }
  }
}

