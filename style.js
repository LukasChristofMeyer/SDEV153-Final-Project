/* styleFit
*  Makes sure all the website elements fit properly as according to the rules of the website.
*/
function styleFit() {
   if (window.innerWidth / window.innerHeight > (3/4)) {
      document.querySelectorAll("div.section-division").forEach(container => {
         const text = container.querySelector("div.text");
         const img = container.querySelector("img");
         if (!text || !img) { return; } 
         console.log("Stuff:");
         console.log(window.innerHeight);
         console.log(container.offsetHeight);
         console.log(img.offsetHeight);

         if (container.offsetHeight > window.innerHeight) {
            img.style.margin = "0";
            img.style.position = "sticky";
         } else {
            img.style.position = "static";
            img.style.margin = "auto";
         }

         // Safeguard against zooming in so much the image cannot fit. 
         if ((text.offsetWidth+img.offsetWidth) > window.innerWidth) {
            img.style.position = "static"; // This leaves it at the top automatically. 
            img.style.height = "";
            img.style.width = "";
            return;
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