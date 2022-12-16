// Code here

baseURl = "http://localhost:3000/beers"

// Get the first beer to show on the page
function getBeer(id = 1){
  fetch(`${baseURl}/${id}`)
  .then(res => res.json())
  .then(beer => {
    populateBeerData(beer)
  })
  .catch(error => console.log("Error: ", error.message))
}

function populateBeerData(beer){
  const beerDiv = document.querySelector(".beer-details")
  beerDiv.querySelector("#beer-name").textContent = beer.name
  beerDiv.querySelector("#beer-image").alt = beer.name
  beerDiv.querySelector("#beer-image").src = beer.image_url
  beerDiv.querySelector("#beer-description").textContent = beer.description
  beerDiv.querySelector("#review-list").replaceChildren()
  for (let review of beer.reviews){
    const reviewList = beerDiv.querySelector("#review-list")
    const li = document.createElement("li")
    li.textContent = review
    reviewList.appendChild(li)
  }
}

// Show beer menu
function getBeerMenu(){
  fetch(baseURl)
  .then(res => res.json())
  .then(beers => {
    const beerList = beers.map(beer => beer.name)
    renderBeerMenu(beerList)
  })
  .catch(error => console.log("Error: ", error.message))
}

// Populate the beer menu
function renderBeerMenu(beerList){
  document.getElementById("beer-list").replaceChildren()
  const beerMenu = document.getElementById("beer-list")
  beerList.forEach(beer => {
    const li = document.createElement("li")
    li.textContent = beer
    beerMenu.appendChild(li)
  });
}

// Add a new review
const reviewForm = document.getElementById("review-form")
reviewForm.addEventListener("submit", addReview)

function addReview(e){
  e.preventDefault()
  const reviewList = document.getElementById("review-list")
  const li = document.createElement("li")
  li.textContent = e.target.review.value
  reviewList.appendChild(li)
  e.target.review.value = ""
}

document.addEventListener("DOMContentLoaded", () => {
  getBeer();
  getBeerMenu();
})

