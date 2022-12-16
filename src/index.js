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

document.addEventListener("DOMContentLoaded", () => {
  getBeer();
})

