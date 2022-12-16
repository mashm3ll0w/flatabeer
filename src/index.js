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
  beerDiv.querySelector("#beer-name").dataset.id =  beer.id
  beerDiv.querySelector("#beer-image").alt = beer.name
  beerDiv.querySelector("#beer-image").src = beer.image_url
  beerDiv.querySelector("#beer-description").textContent = beer.description
  beerDiv.querySelector("#review-list").replaceChildren()
  for (let review of beer.reviews){
    const reviewList = beerDiv.querySelector("#review-list")
    const li = document.createElement("li")
    li.addEventListener("click", removeReview)
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
    li.dataset.id = beerList.indexOf(beer) + 1
    li.addEventListener("click", displayMenuBeer)
    beerMenu.appendChild(li)
  });
}

// Add a new review
const reviewForm = document.getElementById("review-form")
reviewForm.addEventListener("submit", addReview)

// Add review to the DOM and save to the DB
function addReview(e){
  e.preventDefault()
  const beerID = document.querySelector("#beer-name").dataset.id
  const reviewList = document.getElementById("review-list")
  const li = document.createElement("li")
  li.textContent = e.target.review.value
  if (li.textContent !== ""){
    e.preventDefault()
    // Get a list of all reviews
    const currentReviews = document.querySelectorAll("#review-list li")
    const allReviews = []
    currentReviews.forEach(review => {
      allReviews.push(review.textContent)
    })
    allReviews.push(e.target.review.value)

    //Render the new review to the DOM
    li.addEventListener("click", removeReview)
    reviewList.appendChild(li)
    e.target.review.value = ""

    //Send all the reviews to the DB
    fetch(`${baseURl}/${beerID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify({
        "reviews": allReviews
      })
    }).then(res => res.json())
    .then(beer => {
      populateBeerData(beer)
    })
    .catch(error => console.log("Error: ", error.message))
  }
  else {
    e.preventDefault()
    alert("Invalid review")
  }
}

function removeReview(e){
  e.target.remove()
}

// display a beer from the menu in the main page
function displayMenuBeer(e){
  getBeer(e.target.dataset.id)
}

document.addEventListener("DOMContentLoaded", () => {
  getBeer();
  getBeerMenu();
})

