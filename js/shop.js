// array for cars
let cars = [
    { mark: "AUDI", model: "A5", imgUrl: "./img/Audi.png", price: 40000 },
    {
        mark: "BMW",
        model: "i8",
        imgUrl: "./img/chevroletbolt.png",
        price: 36000,
    },
    {
        mark: "MERCEDES",
        model: "SL65",
        imgUrl: "./img/Fordf150.png",
        price: 890000,
    },
    {
        mark: "TESLA",
        model: "S Charger",
        imgUrl: "./img/Tesla3.png",
        price: 73000,
    },
];

// Array for cart
const cart = [];

const carsListElement = document.querySelector(".cars-list");
const cartListElement = document.querySelector(".cart-list");
const totalElement = document.querySelector(".total span");
const markFilterElement = document.getElementById("mark");
const minPriceElement = document.getElementById("min-price");
const maxPriceElement = document.getElementById("max-price");

function populateMarkFilter() {
    console.log("Populating mark filter...");
    const uniqueMarks = [...new Set(cars.map((car) => car.mark))];
    markFilterElement.innerHTML = '<option value="all">All</option>';

    uniqueMarks.forEach((mark) => {
        const option = document.createElement("option");
        option.value = mark.toLowerCase();
        option.textContent = mark;
        markFilterElement.appendChild(option);
    });
}

function displayCars(carsToDisplay) {
    carsListElement.innerHTML = "";
    console.log("Displaying cars:", carsToDisplay);

    carsToDisplay.forEach((car, index) => {
        const carItem = document.createElement("div");
        carItem.className = "car-item";
        carItem.innerHTML = `
            <img src="${car.imgUrl}" alt="${car.mark} ${car.model}" class="car-image" />
            <span class="car-mark">${car.mark}</span>
            <span class="car-model">${car.model}</span>
            <span class="car-price">${car.price}</span>
            <button class="add-cart">Add to cart</button>
        `;

        const addButton = carItem.querySelector(".add-cart");
        addButton.addEventListener("click", () => addToCart(car));
        console.log("Add to cart button added for:", car.mark, car.model);
        carsListElement.appendChild(carItem);
    });
}

function displayCart() {
    cartListElement.innerHTML = "";

    cart.forEach((car, index) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <img src="${car.imgUrl}" alt="${car.mark} ${car.model}" class="car-image" />
            <span class="car-mark">${car.mark}</span>
            <span class="car-model">${car.model}</span>
            <span class="car-price">${car.price}</span>
            <button class="remove" onclick="removeFromCart(${index})">Remove</button> `;
        cartListElement.appendChild(cartItem);
    });

    updateTotal();
}

function addToCart(car) {
    console.log("Adding cart:", car);
    cart.push(car);
    displayCart();
}

function removeFromCart(cartIndex) {
    cart.splice(cartIndex, 1);
    displayCart();
}

function updateTotal() {
    const total = cart.reduce((sum, car) => sum + car.price, 0);
    totalElement.textContent = `Total: ${total}`;
}

function filterCars() {
    const mark = markFilterElement.value.toLowerCase();
    const minPrice = parseInt(minPriceElement.value) || 0;
    let maxPrice = parseInt(maxPriceElement.value);

    if (isNaN(maxPrice) || maxPrice < minPrice) {
        maxPrice = Infinity;
    }

    const filteredCars = cars.filter((car) => {
        const matchesMark = mark === "all" || car.mark.toLowerCase() === mark;
        const matchesPrice = car.price >= minPrice && car.price <= maxPrice;
        return matchesMark && matchesPrice;
    });

    displayCars(filteredCars);
}

function updateCar(index, newCarData) {
    if (index < 0 || index >= cars.length) {
        console.error("Invalid car index provided.");
        return;
    }
    const carToUpdate = cars[index];
    carToUpdate.mark = newCarData.mark || carToUpdate.mark;
    carToUpdate.model = newCarData.model || carToUpdate.model;
    carToUpdate.imgUrl = newCarData.imgUrl || carToUpdate.imgUrl;
    carToUpdate.price = newCarData.price || carToUpdate.price;

    console.log("Car updated:", carToUpdate);
    displayCars(cars);
}

displayCars(cars);
displayCart();
populateMarkFilter(); //fill the dropdown

markFilterElement.addEventListener("change", filterCars);

minPriceElement.addEventListener("input", filterCars);

maxPriceElement.addEventListener("input", filterCars);
