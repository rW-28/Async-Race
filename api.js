const BASE_URL = 'http://localhost:3000';

//GET CARS ARRAY FROM THE SERVER
export async function getCarsFromServer() {
    try {

        //send a request to get a list of cars from the server
        const response = await fetch(`${BASE_URL}/garage`);
        //response turns into an object or array
        console.log(response);
        return await response.json();

    } catch(error) {
        console.error('Failed to fetch list of cars:', error);
        return [];
    }
}

//CREATE NEW CAR
export async function createCarOnServer(name, color) {
    try {
        const response = await fetch(`${BASE_URL}/garage`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, color}),
        });
        return response.ok;
    }catch(error) {
        console.error('Failed to create a car:', error);
        return false;
    }
}

//DELETE CAR
export async function deleteCarOnServer(id) {
    try {
        const response = await fetch(`${BASE_URL}/garage`, {method: 'DELETE'});
        return response.ok;
    } catch (error) {
        console.error('Error deleting resource:', error.message);
        return false;
    }
}

//MAKE CAR GO
//here we get car's speed and 'start the car'
//we already see the car moving on the screen, but all the fun starts when we call the next function
export async function startEngineRequest(id) {
    const response = await fetch(`${BASE_URL}/engine?id=${id}&status=started`, { method: 'PATCH' });
    return await response.json();
}

//DRIVE
//this function either steps on the gas or imitates broken engine
//that's what makes the whole project interesting - not all cars are gonna make it to the finish line, but you never know which ones
export async function driveEngineRequest(id) {
    return await fetch(`${BASE_URL}/engine?id=${id}&status=drive`, { method: 'PATCH' });
}

//STOP THE CAR
export async function stopEngineRequest(id) {
    await fetch(`${BASE_URL}/engine?id=${id}&status=stopped`, { method: 'PATCH' });
}