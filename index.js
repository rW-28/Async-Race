import { 
    getCarsFromServer, createCarOnServer, deleteCarOnServer, 
    startEngineRequest, driveEngineRequest, stopEngineRequest 
} from './api.js';
import { renderCarList, animateCar, stopCarAnimation } from './ui.js';


//DOM Elements
const createBtn = document.getElementById('createCarBtn');
const nameInput = document.getElementById('carNameInput');
const colorInput = document.getElementById('carColorInput');
const list = document.getElementById('listOfCars');
const generateBtn = document.getElementById('generateCarsBtn');
const raceBtn = document.getElementById('raceBtn');


//GET CARS ARRAY
async function updateApp() {
    const cars = await getCarsFromServer();
    renderCarList(cars, list, startCar, stopCar, deleteCar);
}

//MAKE CAR GO
async function startCar(id) {    
    try {
        const engineData = await startEngineRequest(id);
        const duration = (engineData.distance / engineData.velocity) / 1000; 

        animateCar(id, duration);

        const driveResponse = await driveEngineRequest(id);

        if (!driveResponse.ok) {
            throw new Error('Engine broken');
        }

        const cars = await getCarsFromServer();
        const car = cars.find(c => c.id === id);
        return car ? car.name : 'Unknown';

    } catch (error) {
        console.warn(`Машина ${id} заглохла! Останавливаем...`);
        stopCarAnimation(id, false);
        throw new Error('Broken');
    }
}

//MAKE CAR STOP
async function stopCar(id) {
    await stopEngineRequest(id);
    stopCarAnimation(id, true); // Возвращаем на старт
}

//DELETE THE CAR
async function deleteCar(id) {
    const success = await deleteCarOnServer(id);
    if (success) await updateApp();
}

//LISTENERS
createBtn.addEventListener('click', async () => {
    const name = nameInput.value;
    const color = colorInput.value;

    if (!name) {
        alert('Please input car\'s name');
        return;
    }

     if(await createCarOnServer(name, color)) {
        nameInput.value = '';
        await updateApp();
     }
});

generateBtn.addEventListener('click', async () => {
    const brands = ['DODGE', 'AUDI', 'VOLKSWAGEN', 'KIA', 'TOYOTA', 'MAZDA', 'NISSAN', 'FERRARI', 'HYUNDAI', 'CHEVROLET'];
    const models = ['Focus', 'X5', 'Rio', 'Model 3', 'Mustang', 'Vesta', 'Challenger', 'F80', 'Charger', 'Tahoe'];

    for(let i = 0; i < 10; i++) {
        const randomBrand = brands[Math.floor(Math.random() * brands.length)];
        const randomModel = models[Math.floor(Math.random() * models.length)];
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);

        await createCarOnServer(`${randomBrand} ${randomModel}`, randomColor);
    }
    await updateApp();
});

raceBtn.addEventListener('click', async () => {
    const cars = await getCarsFromServer();
    const promises = cars.map(car => startCar(car.id));

    try {
        const winnerName = await Promise.any(promises);
        alert(`Winner is: ${winnerName}! 🏆`);
    }
    catch(error) {
        alert('Все машины заглохли на дистанции! Гонка не состоялась. 😭');
    }
})

updateApp();