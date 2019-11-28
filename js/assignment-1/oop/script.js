var imageCarousel = document.getElementById('image-carousel');
var carousel = new Carousel(imageCarousel);


function Carousel(parentElement) {
  var parentElement = parentElement;
  var indexImage = 0;
  var indexDot = 0;
  var dots;
  var dotDiv;
  var imageWrapper = document.getElementById('slideshow-wrapper');
  var totalImages = imageWrapper.getElementsByTagName('img');
  var imageNo = totalImages.length;
  var arrowWrapper;
  var leftArrow;
  var rightArrow;

  // var holdInterval;
  // var transitionInterval;

  function createElements() {
    pare
    arrowWrapper = document.createElement('div');
    arrowWrapper.classList.add('arrow-wrapper');
    leftArrow = document.createElement('img');
    rightArrow = document.createElement('img');
    leftArrow.classList.add('left-arrow');
    rightArrow.classList.add('right-arrow');
    parentElement.appendChild('arrowWrapper');
     
  }

  this.init = function() {
    createElements();
  }
}

carousel.init();