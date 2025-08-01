/* styleFit
*  Makes sure all the website elements fit properly as according to the rules of the website.
*/
function styleFit() {
   if (window.innerWidth / window.innerHeight > (3/4)) {
      document.querySelectorAll("div.section-division").forEach(container => {
         const text = container.querySelector("div.text");
         const img = container.querySelector("img");
         if (!text || !img) {return;} 

         img.style.height = "";
         img.style.width = "";

         // Image should only be as tall as the text accompanying it.
         if (img.offsetHeight > text.offsetHeight) {img.style.height = text.offsetHeight + "px";}

         if ((img.offsetHeight/img.offsetWidth) < (3/4)) {
            img.style.width = img.offsetHeight*(4/3) + "px";
         } else {
            img.style.width = "";
         }

         if (text.offsetWidth + img.offsetWidth > container.offsetWidth) {
            img.style.position = "static";
            img.style.margin = "auto";
            text.style.order = "1";
         } else if (container.offsetHeight > window.innerHeight) {
            img.style.marginTop = "0";
            img.style.position = "sticky";
            text.style.order = "";
         } else {
            img.style.position = "static";
            img.style.margin = "auto";
         }
      });
   } else { // else the window is or less then 3/4 resolution, which we assume to be mobile.
      // Mobile is actually covered entirely by CSS, but to be nice I've also covered the case if you've changed to 3/4.
      document.querySelectorAll("div.section-division").forEach(section => {
         const img = section.querySelector("img");
         if (!img) {return;}
         img.style.height = "";
         img.style.width = "";
         text.style.order = "1";
      });
   }
   return;
}
window.addEventListener('load', styleFit);
window.addEventListener('resize', styleFit);
