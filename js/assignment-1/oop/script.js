function imageCarousel() {
  this.indexImage = 0;
  this.indexDot = 0;
  var dots;
  var dotDiv;
  var totalImages;
  var imageNo;


  this.init = function () {
    this.wrapper = document.getElementById('slideshow-wrapper');
    this.totalImages = this.wrapper.getElementsByTagName('img');
    this.imageNo = this.totalImages.length;
    document.getElementById('slideshow-wrapper').style.width = (300 * this.totalImages.length) + 'px';

    // setInterval(slideshow, 2000);
    // dotCreation();
  }

  this.checkIndex = function (val) {
    this.indexImage += val;
    syncDot(this.indexImage);
  }

  this.resetIndex = function (val) {
    this.indexImage = val;
    syncDot(this.indexImage);
  }

  // this.previous = function () {
  //   if (this.indexImage === 0) {
  //     document.getElementById('slideshow-wrapper').style.left = (-300 * (this.imageNo - 1)) + 'px';
  //     resetIndex(this.imageNo - 1);
  //   }
  //   else {
  //     document.getElementById('slideshow-wrapper').style.left = (-300 * (this.indexImage - 1)) + 'px';
  //     checkIndex(-1);
  //   }
  // }

  this.next = function () {
    if (this.indexImage === (this.imageNo - 1)) {
      document.getElementById('slideshow-wrapper').style.left = 0 + 'px';
      resetIndex(0);
    }
    else {
      document.getElementById('slideshow-wrapper').style.left = (-300 * (this.indexImage + 1)) + 'px';
      checkIndex(1);
    }
  }

  // slideshow = function () {
  //   next();
  // }

  // this.dotCreation = function () {
  //   for (var j = 0; j < this.imageNo; j++) {
  //     this.dotDiv = document.createElement('div');
  //     this.dotDiv.classList.add('dot');
  //     document.getElementById('dot-wrapper').appendChild(this.dotDiv);
  //   }
  //   this.dotDiv = document.getElementById('dot-wrapper').children;
  //   syncDot(0);
  // }

  // function syncDot(activeIndex) {
  //   console.log(dotDiv);
  //   for (var j = 0; j <= imageNo; j++) {
  //     if (j == activeIndex) {
  //       dotDiv[j].style.backgroundColor = 'black';
  //     }
  //     else {
  //       dotDiv[j].style.backgroundColor = 'white';
  //     }
  //   }

  // }
}

new imageCarousel().init();