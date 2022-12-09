// Code here
const baseURL = "http://localhost:3000/beers"

// 1. Add the first beer's details in the HTMl when the page loads
fetchDisplayBeer();

// 2. Show a menu of all beers
showMenu();

// 3. Add New Review
const submitReviewBtn = document.querySelector("#review-form button").addEventListener("click",addNewReview)

// 4. Show a beer in the main display when clicked from the Beer menu
const beerMenuContainer = document.getElementById('beer-list').addEventListener("click", displayMenuBeer);

// 5. Remove a review
const reviewContainer = document.getElementById("review-list").addEventListener("click", removeReview)

// 6. Update a beer's description
const submitBtn = document.querySelector("#description-form button").addEventListener("click", updateDescription)



// FUNCTIONS

// 1. Function to fetch the beer that will get displayed as the default
function fetchDisplayBeer(index = 1){
  fetch(`${baseURL}/${index}`)
  .then(res => res.json())
  .then(data => {
    // Show the first beer on page load
    populateData(data);
  })
  // .catch(err => console.log("Error: ", err))
}

// function to populate the data returned from the db
function populateData(data){
  const beerName = document.getElementById("beer-name");
  beerName.textContent = data.name;
  beerName.dataset.id = data.id;
  
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
    listReview.classList.add("beer-review");
    beerReviews.appendChild(listReview)
  }
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
    listBeer.classList.add("beer-menu")
    beerList.appendChild(listBeer)
  }
  })
  .catch(err => console.log("Error: ", err))
}


// 3. Function to add a new review, both in the Database and in the page
function addNewReview(e){
  e.preventDefault()
  const beerID = document.getElementById("beer-name").dataset.id;
  const review = document.getElementById("review");

  const existingReviews = document.getElementsByClassName("beer-review")
  const reviewsArray = []
  for (const review of existingReviews){
    reviewsArray.push(review.textContent)
  }
  
  if(review.value !== ""){
    reviewsArray.push(review.value)
    console.log(reviewsArray);

    fetch(`${baseURL}/${beerID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "reviews": reviewsArray
      })
    }).then(res => {
      e.preventDefault()
      res.json()
    })
    .then(data => {
      e.preventDefault()
      populateData(data)
      review.value = "";
    })
    .catch(err, console.log("Error :", err))
    fetchDisplayBeer(beerID);
  }
  else{
    alert("Invalid review")
  }
}

// 4. Function to show a beer on the main page when clicked from the Menu
function displayMenuBeer(e){
  e.preventDefault()
  if (e.target.classList.contains('beer-menu')) {
    //get the index and call the fetchDisplayBeer function, passing in the data-index as its argument
    fetchDisplayBeer(e.target.dataset.beerIndex);
  }
}

// 5. Function to remove a review when it's clicked
function removeReview(e){
  if (e.target.classList.contains("beer-review")) {
    console.log(e.target.remove())
  }
}

// 6. Function to update a beer's review
function updateDescription(e){
  const beerID = document.getElementById("beer-name").dataset.id;
  const newDescription = document.getElementById("description").value;

  if (newDescription !== ""){
    fetch(`${baseURL}/${beerID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "description": newDescription
      })
    }).then(res => {
      e.preventDefault()
      res.json()
    })
    .then(data => {
      e.preventDefault()
      populateData(data)
      newDescription.value = "";
    })
    fetchDisplayBeer(beerID)
  }
  else {
    alert("Invalid descritption");
  }
}