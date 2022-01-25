
function next_bg() {
  var a = document.querySelector(".container_bg.bg_active");
  if (a) {
    a.classList.toggle("bg_active");
    a.classList.toggle("fade_out");
    a.classList.toggle("fading");
  }
  else {
    document.querySelector('.title-div').classList.add("background--light");
  }
  var x = document.querySelectorAll(".container_bg.fade_out")
  if (x.length>0) {
    var i = getRandomArbitrary(0,x.length-1);
    var image = x[i].querySelector('.image');
    image.style.backgroundImage = "url('"+image.getAttribute("refer");+"')";
    x[i].classList.toggle("fade_out");
    x[i].classList.toggle("fading");
    x[i].classList.toggle("bg_active");
    //console.log("Choose background " + (i+1) + "/" + x.length);
    setTimeout(setActiveBackground, 1800);
  }
  else console.log("No available background for " + document.getElementsByTagName("BODY")[0].getAttribute("orientation") + " orientation" );
}

function setActiveBackground() {
  var x = document.querySelectorAll(".fading");
  if (x[0]) x[0].classList.toggle("fading");
  if (x[1]) x[1].classList.toggle("fading");
  setTimeout(next_bg, 10000);
}

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function toggle_info() {
  var x = document.querySelectorAll(".container_bg.bg_active .info");
  x[0].classList.toggle("fade_out");
  x[1].classList.toggle("fade_out");
}

function getOrientation() {
  if( document.documentElement.clientWidth > document.documentElement.clientHeight  ) {
      return "landscape";
  }
  else {
      return "portrait";
  }
}

function checkOrientation() {
    var currentOrientation = getOrientation();
    var b = document.getElementsByTagName("BODY")[0];
    if (currentOrientation.localeCompare(b.getAttribute("orientation"))){
      b.setAttribute("orientation", currentOrientation);
      var a = document.querySelector(".container_bg.bg_active");
      if (a) {
        a.classList.toggle("bg_active");
        a.classList.toggle("fade_out");
        a.classList.toggle("fading");
      }
      getRandomImages();
      processOrientation();
      next_bg();
    }
  }

function processOrientation() {
  var b = document.getElementsByTagName("BODY")[0];
  var orientation = b.getAttribute("orientation");
  var x = document.querySelectorAll(".container_bg");
  console.log("Backgrounds available: "+(x.length));
  let not_fitting = 0;
  for (let i = 0; i < x.length; i++) {
    let value = x[i].getAttribute("size");
    const aSize = value.split("x");
    let text = "undefined";
    if (aSize[0]>aSize[1]) text = "landscape";
    else if (aSize[0]<aSize[1]) text = "portrait";
    else text = "square";
    console.log(text + " vs. " + orientation);
    if (text.localeCompare(orientation))
    {
      x[i].classList.toggle("not_fit");
      x[i].classList.toggle("fade_out");
      not_fitting++;
    }
  }
  console.log("Backgrounds available for "+ orientation +": "+(x.length-not_fitting))
}


function getRandomImages(url) {

  console.log("Getting images from Unsplash: "+ url)

  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      res.forEach(addImageContainer);
      processOrientation();
      next_bg();
    })
    .catch(function (error) {
      console.log("dataLoadingError:"+error);
    });


}


  function addImageContainer(item) {
    var container_html = '<div class="container_bg fade_out" size="'+ item.width + 'x' + item.height +'">';
    container_html += '<div class="image image_fadedOut" refer="' + item.urls.regular + '" rel="nofollow" download=""></div>';
    container_html += '<div id="credits-box">';
    container_html +=   '<div class="out info" onclick="toggle_info()"><i class="fas fa-info-circle"></i></div>';
    container_html +=   '<div class="credits info fade_out" onclick="toggle_info()">';
    container_html +=     '<div class="font-credits">';
    container_html +=       '<span>Background credits: </span>';
    container_html +=       '<span>by <a href="https://unsplash.com/@' + item.user.username + '" target="_blank">' + item.user.name + '</a> </span>';
    container_html +=       '<span>available <a href="' + item.links.download_location + '" target="_blank">here</a></span>';
    container_html +=     '</div>';
    container_html +=   '</div>';
    container_html += '</div>';
    container_html += '</div>';
    var bg = document.getElementsByClassName('bg');
    bg[0].insertAdjacentHTML('beforeend', container_html);
  }
