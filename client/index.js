let cars = []
let url = 'http://localhost:5084/api/car'


//DOM Manipulation
function populateTable(){
    let html = `
    <div class="car-table">
        <table class="table">
            <thead>
                <th>Make & Model</th>
                <th>Mileage</th>
                <th>Date Aquired</th>
                <th>Held</th>
                <th>Delete</th>
            <thead>
            <tbody>
    `
    cars.forEach((car) => {
        if(car.deleted == false)
        {if(car.held == true)
        {
            html += `
            <tr>
                <td>${car.make} ${car.model}</td>
                <td>${car.mileage}</td>
                <td>${car.dateEntered}</td>
                <td><button onclick="handleHeld(${car.id})">Held</button></td>
                <td><button onclick="Delete(${car.id})">Delete</button></td>
            </tr>
            `
        }
        else
        {
            html += `
            <tr>
                <td>${car.make} ${car.model}</td>
                <td>${car.mileage}</td>
                <td>${car.dateEntered}</td>
                <td><button onclick="handleHeld(${car.id})">Not Held</button></td>
                <td><button onclick="handleDelete(${car.id})">Delete</button></td>
            </tr>
            `
        }}
    })
    html += `
            </tbody>
        </table>
    </div>
    `

    document.getElementById('cars-table').innerHTML = html
}
function populateAddForm(){
    let html = `
    <div class="add-car-form">
        <h2 class="add-heading">Add Car</h2>
        <form onsubmit="return false">
            <div class="form-group">
                <label for="makeInput" style="width: 100px;">Make</label>
                <input type="text" class="form-control" id="make" placeholder="Make">
            </div>
            <div class="form-group">
                <label for="modelInput" style="width: 100px;">Model</label>
                <input type="text" class="form-control" id="model" placeholder="Model">
            </div>
            <div class="form-group">
                <label for="mileageInput" style="width: 100px;">Mileage</label>
                <input type="number" class="form-control" id="mileage" placeholder="Mileage">
            </div>
            <div class="form-group">
                <label for="dateInput" style="width: 100px; display: inline-block;">Date Acquired</label>
                <input type="text" class="form-control" id="dateEntered" placeholder="Date Acquired">
            </div>
            <button type="submit" class="btn btn-primary" onclick="handleAddCar()">Submit</button>
        </form>
    </div>
    `

    document.getElementById('add-form').innerHTML = html
}


//Data
async function populateArray(){
    let response = await fetch(url)
    cars = await response.json()
    sortCars()
    console.log(cars)
}
function sortCars(){
    cars.sort((a, b) => {
        const dateA = new Date(a.dateEntered);
        const dateB = new Date(b.dateEntered);

        return dateA - dateB;
    });
}


//Handling
async function handleOnLoad(){
    await populateArray()
    populateTable()
    populateAddForm()
}
async function handleAddCar(){
    let make = document.getElementById('make').value
    let model = document.getElementById('model').value
    let mileage = document.getElementById('mileage').value
    let dateEntered = document.getElementById('dateEntered').value
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            make: make,
            model: model,
            mileage: mileage,
            dateEntered: dateEntered,
        }),
        headers: {

            'Content-Type': 'application/json; charset=UTF-8'
        }
    })

    document.getElementById('make').value = '';
    document.getElementById('model').value = '';
    document.getElementById('mileage').value = '';
    document.getElementById('dateEntered').value = '';
    handleOnLoad()
}
async function handleHeld(id){
    cars.forEach(car => {
        if(car.id == id){
            myCar = car
        }
    })
    myCar.held =  !myCar.held
    const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: myCar.id,
            make: myCar.make,
            model: myCar.model,
            mileage: myCar.mileage,
            dateEntered: myCar.dateEntered,
            held: myCar.held,
            deleted: myCar.deleted
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    });

    handleOnLoad()
}
async function handleDelete(id){
    cars.forEach(car => {
        if(car.id == id){
            myCar = car
        }
    })
    myCar.deleted =  !myCar.deleted
    const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: myCar.id,
            make: myCar.make,
            model: myCar.model,
            mileage: myCar.mileage,
            dateEntered: myCar.dateEntered,
            held: myCar.held,
            deleted: myCar.deleted
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    });

    handleOnLoad()
}