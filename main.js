"use strict";

console.log("awd");
let UploadButton = document.getElementById("UploadButton");
let MyImage = document.getElementById("MyImage");
let MyCanvas = document.getElementById("MyCanvas");
let GraveInput = document.getElementById("GraveInput");
MyCanvas.width = 800;
MyCanvas.height = 500;
let ctx = MyCanvas.getContext("2d");
let img = new Image();
img.src = "360_F_258215071_9LsJ4zATYzIj92rKC9pOLt7qiJA3u7lt.jpg";
let UserDrag = false;
let textX = MyCanvas.width / 2; // Initial horizontal position of the text
let textY = MyCanvas.height / 2; // Initial vertical position of the text
let NewImgHeight;
let NewImgWidth;
let NewImgAspectRatio;
console.log(NewImgHeight, NewImgWidth);
img.onload = function () {
  ctx.drawImage(img, 0, 0, 800, 500);
};

//#region functions
/**
 *
 * @param {string} Text
 */
function TypeText(Text) {
  ctx.font = "30px Arial"; // or any other font/size you prefer
  ctx.textAlign = "center"; // optional, to center-align the text horizontally
  ctx.textBaseline = "top"; // optional, for the text to be drawn from the top
  ctx.clearRect(0, 0, MyCanvas.width, MyCanvas.height); // Clear the canvas
  ctx.drawImage(img, 0, 0, 800, 500); // Redraw the image

  ctx.fillText(`${Text}`, textX, textY);
}
/**
 *
 * @param {ArrayBuffer} NewImage
 * @param {Number} Width
 * @param {Number} AspectRatio
 */
function DrawImge(NewImage, Width, AspectRatio) {
  img.src = NewImage;
  img.onload = function () {
    ctx.drawImage(img, 100, 100, Width, Width / AspectRatio);
  };
}
//#endregion
GraveInput.addEventListener("input", function (e) {
  console.log(GraveInput.value);
  TypeText(GraveInput.value);
});

MyCanvas.addEventListener("mousedown", function (e) {
  const MouseX = e.offsetX;
  const MouseY = e.offsetY;
  const textWidth = ctx.measureText(GraveInput.value).width;
  if (
    MouseX >= textX - textWidth / 2 &&
    MouseX <= textX + textWidth / 2 &&
    MouseY >= textY &&
    MouseY <= textY + 30
  ) {
    console.log("adw");
    UserDrag = true;
  }
});

MyCanvas.addEventListener("mousemove", function (e) {
  if (UserDrag) {
    textX = e.offsetX;
    textY = e.offsetY;
    TypeText(GraveInput.value);
  }
});

MyCanvas.addEventListener("mouseup", function (e) {
  UserDrag = false;
});
MyCanvas.addEventListener("mouseout", function () {
  UserDrag = false;
});
UploadButton.addEventListener("change", function (e) {
  const ImageFile = e.target.files[0];
  if (ImageFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      MyImage.src = e.target.result;
      let LoadImage = new Image();
      LoadImage.src = e.target.result;
      NewImgAspectRatio = Number(LoadImage.width) / Number(LoadImage.height);
      console.log("asp ratio: ", NewImgAspectRatio);
      console.log("Type: ", typeof e.target.result);
      // DrawImge(e.target.result);
      DrawImge(e.target.result, 200, NewImgAspectRatio);
      // MyImage.style.display = "block";
    };
    reader.readAsDataURL(ImageFile);
  }
});