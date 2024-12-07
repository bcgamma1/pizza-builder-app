document.addEventListener('DOMContentLoaded', () => {
    const TOPPING_PRICE = 1.50;
    const BASE_PRICE = 10.00;
    let currentToppings = new Set();
    
    // DOM Elements
    const pizzaBase = document.querySelector('.pizza-base');
    const toppingsGrid = document.querySelector('.toppings-grid');
    const clearButton = document.getElementById('clear-pizza');
    const saveButton = document.getElementById('save-pizza');
    const savedPizzasGrid = document.getElementById('saved-pizzas-grid');

    // Initialize topping positions
    const toppingPositions = [
        { x: '30%', y: '30%' },
        { x: '70%', y: '30%' },
        { x: '50%', y: '50%' },
        { x: '30%', y: '70%' },
        { x: '70%', y: '70%' },
        { x: '50%', y: '20%' },
        { x: '20%', y: '50%' },
        { x: '80%', y: '50%' },
    ];

    function updatePrice() {
        const toppingsCount = currentToppings.size;
        const toppingsTotal = toppingsCount * TOPPING_PRICE;
        const total = BASE_PRICE + toppingsTotal;

        document.getElementById('toppings-count').textContent = toppingsCount;
        document.getElementById('toppings-price').textContent = `$${toppingsTotal.toFixed(2)}`;
        document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
    }

    function addTopping(toppingType) {
        if (!currentToppings.has(toppingType)) {
            currentToppings.add(toppingType);
            
            // Add multiple instances of the topping
            for (let i = 0; i < 3; i++) {
                const position = toppingPositions[Math.floor(Math.random() * toppingPositions.length)];
                const toppingElement = document.createElement('div');
                toppingElement.className = `topping-item ${toppingType}`;
                toppingElement.dataset.type = toppingType;
                
                // Set emoji based on topping type
                switch(toppingType) {
                    case 'pepperoni': toppingElement.textContent = '🍖'; break;
                    case 'mushrooms': toppingElement.textContent = '🍄'; break;
                    case 'olives': toppingElement.textContent = '⚫'; break;
                    case 'peppers': toppingElement.textContent = '🫑'; break;
                    case 'onions': toppingElement.textContent = '🧅'; break;
                    case 'tomatoes': toppingElement.textContent = '🍅'; break;
                }

                // Add some randomness to position
                const randomOffset = 5;
                const xPos = parseFloat(position.x) + (Math.random() * randomOffset - randomOffset/2);
                const yPos = parseFloat(position.y) + (Math.random() * randomOffset - randomOffset/2);
                
                toppingElement.style.left = `${xPos}%`;
                toppingElement.style.top = `${yPos}%`;
                
                // Add some random rotation
                toppingElement.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
                
                pizzaBase.appendChild(toppingElement);
            }
            
            updatePrice();
        }
    }

    function clearPizza() {
        currentToppings.clear();
        const toppings = pizzaBase.querySelectorAll('.topping-item');
        toppings.forEach(topping => topping.remove());
        updatePrice();
    }

    function savePizza() {
        const toppingsArray = Array.from(currentToppings);
        if (toppingsArray.length === 0) return;

        const savedPizza = document.createElement('div');
        savedPizza.className = 'saved-pizza-card';
        
        const toppingsText = toppingsArray
            .map(t => t.charAt(0).toUpperCase() + t.slice(1))
            .join(', ');

        const timestamp = new Date().toLocaleTimeString();
        
        savedPizza.innerHTML = `
            <h3>Custom Pizza</h3>
            <p><strong>Toppings:</strong> ${toppingsText}</p>
            <p><small>Created at ${timestamp}</small></p>
        `;

        savedPizzasGrid.prepend(savedPizza);
    }

    // Event Listeners
    toppingsGrid.addEventListener('click', (e) => {
        const toppingButton = e.target.closest('.topping');
        if (toppingButton) {
            addTopping(toppingButton.dataset.topping);
        }
    });

    clearButton.addEventListener('click', clearPizza);
    saveButton.addEventListener('click', savePizza);
});
