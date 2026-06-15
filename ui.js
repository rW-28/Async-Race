export function renderCarList(cars, list, onStart, onStop, onDelete) {
    list.innerHTML = '';

    cars.forEach(car => {
        const li = document.createElement('li');
        li.className = 'car-track'; 
        li.innerHTML = `
            <button class="btn-start">A</button>
            <button class="btn-stop">B</button>
            <button class="btn-delete">Remove</button>
            <span id="name-${car.id}" class="car-name" style="color: ${car.color}">${car.name}</span>`

        li.querySelector('.btn-start').addEventListener('click', () => onStart(car.id));
        li.querySelector('.btn-stop').addEventListener('click', () => onStop(car.id));
        li.querySelector('.btn-delete').addEventListener('click', () => onDelete(car.id));

        list.appendChild(li);
    });
}

export function animateCar(id, duration) {
    const carNameElement = document.getElementById(`name-${id}`);
    if (carNameElement) {
        carNameElement.style.transition = `transform ${duration}s linear`;
        carNameElement.style.transform = `translateX(600px)`;
    }
}

export function stopCarAnimation(id, toStart = false) {
    const carNameElement = document.getElementById(`name-${id}`);
    if (!carNameElement) return;

    if (toStart) {
        carNameElement.style.transition = 'none';
        carNameElement.style.transform = 'translateX(0px)';
    } else {
        const computedStyle = window.getComputedStyle(carNameElement);
        const currentTransform = computedStyle.transform;
        carNameElement.style.transition = 'none';
        carNameElement.style.transform = currentTransform;
    }
}





