// Code here
const baseURL = "http://localhost:3000/beers"

// 1. Add the first beer's details in the HTMl when the page loads
fetchDisplayBeer(1);

// 2. Show a menu of all beers
showMenu()

// 1. Function to fetch the beer that will get displayed as the default
function fetchDisplayBeer(index){
  fetch(`${baseURL}/${index}`)
  .then(res => res.json())
  .then(data => {
    // Show the first beer on page load
    const beerName = document.getElementById("beer-name");
    beerName.textContent = data.name;
    
    const beerImage = document.getElementById("beer-image");
    beerImage.src =  data.image_url;
    beerImage.alt = data.name;

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
}

// 2. Function to fetch and render a menu of all beers
function showMenu(){
  fetch(`${baseURL}`)
  .then(res => res.json())
  .then(data => {
  // map over the returned array to get just the names
  const beerNames = data.map(beer => beer.name)
  
  const beerList = document.getElementById("beer-list")
  beerList.replaceChildren()
  
  for (const beerName of beerNames){
    const listBeer = document.createElement("li")
    listBeer.textContent = beerName
    // add a dataset as an attribute inorder to use that index when fetching a beer from the database
    listBeer.dataset.beerIndex = beerNames.indexOf(beerName) + 1;
    beerList.appendChild(listBeer)
  }
  })
  .catch(err => console.log("Error: ", err))
}
