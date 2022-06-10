"use strict";

  function Product(name) {
  this.name = name;

}

let allProducts = [
  new Product ("bag"),
  new Product ("banana"),
  new Product ("bathroom"),
  new Product ("boots"),
  new Product ("breakfast"),
  new Product ("bubblegum"),
  new Product ("chair"),
  new Product ("cthulhu"),
  new Product ("dog-duck"),
  new Product ("dragon"),
  new Product ("pen"),
  new Product ("pet-sweep"),
  new Product ("reset"),
  new Product ("scissors"),
  new Product ("shark"),
  new Product ("sweep"),
  new Product ("tauntaun"),
  new Product ("unicorn"),
  new Product ("water-can"),
  new Product ("wine-glass"),

];

console.log(allProducts);

function randomImage() {
  let result = Math.floor(Math.random() * allProducts.length);
  return allProducts[result];

}

let image = randomImage();
console.log(image);

let img = document.createElement("img");

img.src = `img/${image.name}.jpg`;

img.addEventListener("click", function() {

  console.log("I was clicked!");

});

