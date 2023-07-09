const container = document.querySelector(".container");
// select the seats in the row that are not occupied
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelected = document.getElementById("movie");
// ticket price value ("+" cnverts it to a number)
let ticketPrice = +movieSelected.value;

// display saved UI data
populateUI();

// save movie index and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

// update total and count 
function updateSelectedCount(){
    // selected seats only (gives a nodeList)
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    // copy selected seats [...selected] and return array using map()
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.textContent = selectedSeatsCount;
    total.textContent = selectedSeatsCount * ticketPrice;
}

// get data from localStorage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add("selected");
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    if(selectedMovieIndex !== null){
        movieSelected.selectedIndex = selectedMovieIndex;
    }
}

//  movie select element
movieSelected.addEventListener("change", (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

// seat click event
container.addEventListener("click", (e) => {
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected");

        updateSelectedCount();
    }
});

// initial count and total
updateSelectedCount()