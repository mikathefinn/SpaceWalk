// window.addEventListener('load', function () {
//   const sectionToDisplay = document.querySelector('.toggle-view');
//   const planetsToDisplay = document.querySelector('.planets');

//   sectionToDisplay.style.opacity = 1;
//   console.log('section fade in');
//   // section has opacity set to 0 in css witha transition of 5s
//   // after 5s it's 1, then after 5 secs function in setTimeout will change it to 0 again, with a 5s transition time set in css

//   setTimeout(() => {
//     sectionToDisplay.style.opacity = 0;
//     console.log('opacity fade out');
//     setTimeout(() => {
//       sectionToDisplay.style.display = 'none';
//       console.log('display:none');

//       console.log('planets display');
//       planetsToDisplay.style.display = 'flex';
//       // planetsToDisplay.style.flexDirection = 'column';
//       // planetsToDisplay.style.justifyContent = 'center';
//       // planetsToDisplay.style.alignItems = 'center';
//       setTimeout(() => {
//         console.log('planets fade-in');
//         planetsToDisplay.style.opacity = 1;
//       }, 1000); //opacity 1s after
//     }, 5100); // set display none to avoid layout issues
//   }, 5000);
// });

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
