const cars = [
    {
        name: "Tesla Model 3",
        type: "Cars & Minivan",
        year: 2023,
        model: "LC76",
        fuel: "Petrol",
        price: 36620,
        used: true,
        image: "img/Tesla3.png"
    },
    {
        name: "Ford F-150",
        type: "Trucks",
        year: 2021,
        model: "XL",
        fuel: "Diesel",
        price: 28500,
        used: false,
        image: "img/Fordf150.png"
    },
    { 
        name: "Toyota Highlander",
        type: "Crossovers & SUVs", 
        year: 2022, 
        model: "SE", 
        fuel: "Hybrid", 
        price: 42000, 
        used: false, 
        image: "img/Toyota.png"
    },
    {
        name: "Chevrolet Bolt", 
        type: "Electrified", 
        year: 2023, 
        model: "EV", 
        fuel: "Electric", 
        price: 31000, 
        used: true, 
        image: "img/chevroletbolt.png" 
    },
    {
        name: "Chevrolet Bolt", 
        type: "Cars & Minivan", 
        year: 2023, 
        model: "EV", 
        fuel: "Electric", 
        price: 31000, 
        used: true, 
        image: "img/chevroletbolt.png" 
    }
]

function filterCarsByCategory(category){
    if(category === "All"){
        return cars;
    }
    return cars.filter(car => car.type === category);
}

function displayCars(carList) {
    const container = document.querySelector(".cards-container");
    container.innerHTML = "";

    carList.forEach(car => {
        const carCard = document.createElement("div");
        carCard.classList.add("card");

        carCard.innerHTML = `
            <div class="card-header">
                <h3>${car.name}</h3>
                <p>${car.used ? "Used":"New"}</p>
            </div>
            <div class="card-content">
                <div class="image">
                    <img src="${car.image}" alt="${car.name}" />
                </div>
                <ul>
                    <li><span>Model Year:</span> ${car.year}</li>
                    <li><span>Model:</span> ${car.model}</li>
                    <li><span>Fule:</span> ${car.fule}</li>
                </ul>
                <h3 class="price">$ ${car.price}</h3>
                <button class="order-btn">
                    Order now<span><i class="fa-solid fa-chevron-right"></i></span>
                </button>
            </div>
        `

        carCard.classList.add("card-fade-in");
        container.append(carCard);
    })
}

document.querySelectorAll(".category").forEach(button => {
    button.addEventListener("click", event => {
        document.querySelectorAll(".category").forEach(btn => btn.classList.remove("active"));
        event.target.classList.add("active");

        const selectedCategory = event.target.textContent;
        const filteredCars = filterCarsByCategory(selectedCategory);
        displayCars(filteredCars);
    })
})

document.addEventListener("DOMContentLoaded", displayCars(cars))