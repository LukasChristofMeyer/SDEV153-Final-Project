let cardCreator = document.querySelector("#cardCreator");
cardCreator.addEventListener("submit", renderCard);

let canvas = document.getElementById("cardCanvas");
let context = canvas.getContext("2d");

context.font = "11pt Arial";
context.textBaseline = "top";
context.textAlign = "left";

let selectedImage = document.querySelector("#imageSelector");
let reciever = document.querySelector("#reciever");
let sender = document.querySelector("#sender");

canvas.style.width = "100%";
canvas.style.height = "100%";



function renderCard(event) {
   event.preventDefault(); // Usually for preventing the sending of a form to an address, but in this case of is to prevent the button from reseting the page. 

   // Set our background color, which also resets the canvas
   context.fillStyle = "beige";
   context.fillRect(0, 0, canvas.width, canvas.height);

   context.fillStyle = "black";

   let imageName = "";
   switch (selectedImage.value) {
      case "images/ark-of-the-covenant.jpg" : imageName = "images/ark-of-the-covenant.jpg"; break;
      case "images/two-crystal-balls.jpg" : imageName = "images/two-crystal-balls.jpg"; break;
      case "images/emerald-tablet.jpg" : imageName = "images/emerald-tablet.jpg"; break;
      case "images/holy-grail.jpg" : imageName = "images/holy-grail.jpg"; break;
      case "images/funky-ball.jpg" : imageName = "images/funky-ball.jpg"; break;
      case "images/philosophers-stone.jpg" : imageName = "images/philosophers-stone.jpg"; break;
   }
   let image = document.getElementById(imageName);
   context.drawImage(image, canvas.width * 0.6, 0, canvas.width * 0.4, canvas.height);

   let sentenceBuffer = 0;
   let maxBuffer = canvas.height;
   if (reciever.value != "") {
      context.font = "bold 16pt Arial";
      context.fillText("To: " + reciever.value, 0, sentenceBuffer);
      sentenceBuffer += 30;
      context.font = "11pt Arial";
   }
   if (sender.value != "") {
      context.fillText("From: " + sender.value, 0, canvas.height-15);
      maxBuffer -= 30;
   }

   // Big thanks to https://stackoverflow.com/questions/2936112/text-wrap-in-a-canvas-element for guiding my implementation of the below
   let words = cardCreator.textArea.value.split(" "); // We get an array of every word.

   // We reverse this array to use .pop() as it is more efficient than .shift() which has to move every value one down each time it is used.
   words.reverse();

   while(words.length > 0 && sentenceBuffer < maxBuffer) {
      let currentLine = words.pop();
      while (words.length > 0 && // While there are still words left, and we can fit them in a line, we'll add one to the current line.
         context.measureText(currentLine + " " + words[words.length - 1]).width < (canvas.width * 0.6)) 
      {
         currentLine += " ";
         currentLine += words.pop();
      } // When we're done with the current line we render it, and make sure the next loop around will have be below it. 
      context.fillText(currentLine, 0, sentenceBuffer);
      sentenceBuffer += 15;
   }

   document.getElementById("downloadButton").style.display = "inline-block";
}



// This function is shamelessly stolen from this StackOverFlow post: https://stackoverflow.com/questions/8126623/downloading-canvas-element-to-an-image
// It allows us to download our canvas as an image; very cool!
function downloadImage() {
   let link = document.createElement('a');
   link.download = "E-Card.jpg";
   link.href = canvas.toDataURL();
   link.click();
}