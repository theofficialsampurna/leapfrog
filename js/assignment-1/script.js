var i = 0;
var wrapper = document.getElementById("slideshow-wrapper");
var totalImages = wrapper.getElementsByTagName('img');
document.getElementById("slideshow-wrapper").style.width = (300 * totalImages.length) + "px";

function slideshow() {
  document.getElementById("slideshow-wrapper").style.left = (-300 * i) + "px";
  i++;
  if (i == totalImages.length) {
    i = 0;
  }
}

setInterval(loop, 3000);

function loop() {
  slideshow();
}

function previous() {
  console.log(i);
  if (i == 1) {
    document.getElementById("slideshow-wrapper").style.left = (-300 * totalImages.length) + "px";
    i = totalImages.length;
  }
  else {
    document.getElementById("slideshow-wrapper").style.left = (-300 * (i - 1)) + "px";
    i = i - 1;
  }
}
function next() {
  console.log(i);
  if (i == totalImages.length) {
    document.getElementById("slideshow-wrapper").style.left = (-300 * 0) + "px";
    i = 0;
  }
  else {
    document.getElementById("slideshow-wrapper").style.left = (-300 * (i + 1)) + "px";
    i = i + 1;
  }
}
