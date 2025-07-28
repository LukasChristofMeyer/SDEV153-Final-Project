let screenHeight = screen.height;
let screenWidth = screen.width;

/* baseViewPort
*  As zooming in changes the viewport, yet I want my text to fit the users normal viewport, setting it as px value is needed.
*  Otherwise, the text would scale with the users viewport as they zoomed in and out.
*/
function baseViewport() {
   const baseVh = window.innerHeight * 0.01;
   const baseVw = window.innerWidth * 0.01;
   console.log(baseVh);
   console.log(baseVw);

   document.documentElement.style.setProperty('--base-vh', `${baseVh}px`);
   document.documentElement.style.setProperty('--base-vw', `${baseVw}px`);

   if ((baseVw * 4 / 3) > 18) {
      document.documentElement.style.setProperty('--font-preferred', `${baseVw * 4 / 3}px`)
   }
   if ((baseVh * 10) > 24) {
      document.documentElement.style.setProperty('--h1-font-preferred', `${baseVh * 10}px`)
   }
   if ((baseVw * 2.6) > 24) {
      document.documentElement.style.setProperty('--h2-font-preferred', `${baseVw * 2.6}px`)
   }

   if ((baseVh * 4 / 3) > 46) {
      document.documentElement.style.setProperty('--font-mobile', `${baseVh * 4 / 3}px`)

      // Since the two are compared to 46 for mobile, I get to do this very minor efficiency increase for this horrible code.
      document.documentElement.style.setProperty('--h2-font-mobile', `${baseVh * 2.6}px`)
   } else if ((baseVw * 2.6) > 46) {
      document.documentElement.style.setProperty('--h2-font-mobile', `${baseVw * 2.6}px`)
   } 

   if ((baseVh * 10) > 46) {
      document.documentElement.style.setProperty('--h1-font-mobile', `${baseVh * 10}px`)
   }
}

// We call baseViewport as we should have it as we start the webpage. 
baseViewport();

/* styleFit
*  Makes sure all the website elements fit properly as according to the rules of the website.
*/
function styleFit() {
   // If the actual screen changes, then the viewport changes.
   // This is instead of the window's innerWidth or height, since that changes due to zooming.
   if (screenHeight != screen.width || screenWidth != screen.width) {baseViewport();}


   if (window.innerWidth / window.innerHeight > (3/4)) {
      document.querySelectorAll("div.section-division").forEach(container => {
         const text = container.querySelector("div.text");
         const img = container.querySelector("img");
         if (!text || !img) { return; } 


         // Safeguard against zooming in so much the image cannot fit. 
         if ((text.offsetWidth+img.offsetWidth) > window.innerWidth) {
            img.style.position = "static"; // This leaves it at the top automatically. 
            img.style.height = "";
            img.style.width = "";
            return;
         } else {
            img.style.position = "sticky";
         }

         // Image should only be as high as the text accompanying it.
         if (img.offsetHeight > text.offsetHeight) {img.style.height = text.offsetHeight + "px";}
         else {
            img.style.height = "";
            img.style.width = "";

            // After resetting whatever we changed, we check if the base needs to shrink, 
            // I should probably find a more elegant solution, but this works perfectly fine.
            if (img.offsetHeight > text.offsetHeight) {
               img.style.height = text.offsetHeight + "px";
            } else {
               return;
            }
         }

         if ((img.offsetHeight/img.offsetWidth) < (3/4)) {
            img.style.width = img.offsetHeight*(4/3) + "px";
         } else {
            img.style.width = "";
         }
      });
   } else { // else the window is or less then 3/4 resolution, which we assume to be mobile
      document.querySelectorAll("div.section-division").forEach(section => {
         const img = section.querySelector("img");
         if (!img) {return;}
         img.style.height = "";
         img.style.width = "";
      });
   }
}
window.addEventListener('load', styleFit);
window.addEventListener('resize', styleFit);