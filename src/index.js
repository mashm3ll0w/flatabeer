// Code here
const baseURL = "http://localhost:3000"


// 1. Add the first beer's details in the HTMl when the page loads
fetch(`${baseURL}/beers/1`)
.then(res => res.json())
.then(data => {
  // Show the first beer on page load
  const beerName = document.getElementById("beer-name");
  beerName.textContent = data.name;
  
  const beerImage = document.getElementById("beer-image");
  beerImage.setAttribute("src", data.image_url);
  beerImage.setAttribute("alt", data.name);
})
.catch(err => console.log("Error: ", err))
