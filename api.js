const BASE_URL = 'http://localhost:3000';

//GET CARS ARRAY FROM THE SERVER
export async function getCarsFromServer() {
    try {
        const response = await fetch(`${BASE_URL}/garage`);
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
export async function startEngineRequest(id) {
    const response = await fetch(`${BASE_URL}/engine?id=${id}&status=started`, { method: 'PATCH' });
    return await response.json();
}

//DRIVE
export async function driveEngineRequest(id) {
    return await fetch(`${BASE_URL}/engine?id=${id}&status=drive`, { method: 'PATCH' });
}

//STOP THE CAR
export async function stopEngineRequest(id) {
    await fetch(`${BASE_URL}/engine?id=${id}&status=stopped`, { method: 'PATCH' });
}