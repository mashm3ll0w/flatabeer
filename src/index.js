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

  const beerDescription = document.getElementById("beer-description");
  beerDescription.textContent = data.description;

  const beerReviews = document.getElementById("review-list")
  beerReviews.replaceChildren()
  const reviews = data.reviews
  for (const review of reviews){
    const listReview = document.createElement("li")
    listReview.textContent = review;
    beerReviews.appendChild(listReview)
  }
})
.catch(err => console.log("Error: ", err))
