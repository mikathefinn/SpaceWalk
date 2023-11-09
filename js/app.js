// GLOBAL SCOPE VARIABLES

const planetsToDisplay = document.querySelector('.planets');
const planetLinks = document.querySelectorAll('.planet-link');
const curiosityBtn = document.getElementById('slideshow-btn');
let isSlideShowRuning = false; //state of the slideshow in the beginning
let intervalId; //declare it in the global scope so it can be accessed by both start and stop slideshow

/************* FUNCTIONS ************/

function fadeInAndOut() {
  
  const sectionToDisplay = document.querySelector('.toggle-view');
  sectionToDisplay.style.opacity = 1;
  console.log('section fade in');
  // section has opacity set to 0 in css witha transition of 5s
  // after 5s it's 1, then after 5 secs function in setTimeout will change it to 0 again, with a 5s transition time set in css

  setTimeout(() => {
    sectionToDisplay.style.opacity = 0;
    console.log('opacity fade out');
    setTimeout(() => {
      sectionToDisplay.style.display = 'none';
      console.log('display:none');

      console.log('planets display');
      // planetsToDisplay.style.opacity = 0;
      planetsToDisplay.style.display = 'flex';
      planetsToDisplay.style.flexDirection = 'column';
      planetsToDisplay.style.justifyContent = 'center';
      planetsToDisplay.style.alignItems = 'center';

      setTimeout(() => {
        console.log('planets fade-in');

        planetsToDisplay.style.opacity = 1;
      }, 1000); //opacity 1s after
    }, 5100); // set display none to avoid layout issues
  }, 5000);
}

planetLinks.forEach((link) => {
  link.addEventListener('click', function (event) {
    console.log('link clicked');
    //prevent clicking the link so the fadeout has time to play out
    event.preventDefault();
    planetsToDisplay.style.transition = 'opacity 3s';
    planetsToDisplay.style.opacity = 0;
    setTimeout(() => {
    
      window.location.href = link.getAttribute('href');
    }, 3000);
  });
});

// Burger NAV

function burger() {
  const burger = document.getElementById('burger');
  const links = document.getElementById('links');
  const quit = document.getElementById('quit');
  links.style.display = 'flex';
  quit.style.display = 'inline';
}
function quit() {
  const burger = document.getElementById('burger');
  const links = document.getElementById('links');
  const quit = document.getElementById('quit');
  links.style.display = 'none';
  quit.style.display = 'none';
}

// SLIDESHOW

function buttonClicked() {
  console.log('slideshow button clicked');
  if (isSlideShowRuning) {
    stopSlideShow();
  } else {
    startSlidesShow();
  }
}

function startSlidesShow() {
  if (!isSlideShowRuning) {
    //if the slideshow is not running
    fetchAndDisplayImage();
    intervalId = setInterval(fetchAndDisplayImage, 5000);
    isSlideShowRuning = true;
    curiosityBtn.textContent = 'Stop the slideshow';
  }
}

function stopSlideShow() {
  if (isSlideShowRuning) {
    clearInterval(intervalId);
    //stop the slideshow if it is running
    isSlideShowRuning = false;
    curiosityBtn.textContent = 'Start the slideshow';
  }
}

// API GET + create a random sol to get an image from a random sol
// first, get the latest sol from mission manifest api endpoint

function fetchLatestSol() {
  return fetch(
    'https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=ew009QLOkglDGuTtrFtdyQy8oCVTw2KI7gf4VOzQ'
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const lastSol = data.photo_manifest.max_sol;
      console.log('this is the latest sol', lastSol);
      return lastSol;

      //returns lastSol to within the .then callback, must add return before fetch to return lastSol directly from fetchLatestSol
    });
}
function getRandomSol() {
  return fetchLatestSol().then((latestSol) => {
    const randomSol = Math.floor(Math.random() * latestSol + 1);
    console.log('random sol: ', randomSol);
    return randomSol;

    //remember to return both functions
  });
}

function fetchAndDisplayImage() {
  getRandomSol().then((randomSol) => {
    console.log(randomSol);
    //create a new url with the random sol
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${randomSol}&api_key=ew009QLOkglDGuTtrFtdyQy8oCVTw2KI7gf4VOzQ`;
    console.log('new api: ', apiUrl);

    fetch(apiUrl) //fetch using the random sol url
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // data is an array of objects, get a random object and assign it to curiosityObj
        const curiosityObj =
          data.photos[Math.floor(Math.random() * data.photos.length)];
        console.log(curiosityObj);
        // get the image from the DOM
        const curiosityImage = document.getElementById('curiosity-img');
        curiosityImage.src = curiosityObj.img_src;
        const imageDiv = document.querySelector('.latest-image');

        //remove old image before replacing it with a new one
        while (imageDiv.firstChild) {
          imageDiv.removeChild(imageDiv.firstChild);
        }

        imageDiv.appendChild(curiosityImage);
        //choose all p elements from the div.data
        const dataElements = document.querySelectorAll('.data p');
        dataElements.forEach((p) => {
          if (p.classList.contains('date')) {
            p.textContent = `Date:  ${curiosityObj.earth_date}`;
          } else if (p.classList.contains('sol')) {
            p.textContent = `Sol:  ${curiosityObj.sol}`;
          } else if (p.classList.contains('camera')) {
            p.textContent = `Camera:  ${curiosityObj.camera.full_name}`;
          }
        });
      });
  });
}

/****************** EVENT LISTENERS ***************/

window.addEventListener('load', fadeInAndOut);
curiosityBtn.addEventListener('click', buttonClicked);
