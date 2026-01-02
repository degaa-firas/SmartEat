document.addEventListener('DOMContentLoaded', () => {
    initMenu();
});

// Mock Data for Menu Items (Algerian & International Cuisine)
const menuItems = [
    {
        id: 1,
        name: "Chorba Frik",
        description: "Traditional Algerian soup with crushed green wheat and lamb.",
        price: 450,
        category: "starter",
        image: "https://images.unsplash.com/photo-1574672174772-e10f61456c27?w=500&q=80", // Red Soup (Chorba style)
        rating: 4.8
    },
    {
        id: 2,
        name: "Bourek (Meat)",
        description: "Crispy pastry rolls filled with minced meat and parsley.",
        price: 150,
        category: "starter",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&q=80", // Spring roll like
        rating: 4.9
    },
    {
        id: 3,
        name: "Couscous Royal",
        description: "Steamed semolina served with lamb, chicken, merguez, and vegetables.",
        price: 1200,
        category: "main",
        image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=500&q=80", // Couscous Dish
        rating: 5.0
    },
    {
        id: 4,
        name: "Mthewem",
        description: "Meatballs cooked in a rich garlic and almond sauce.",
        price: 1500,
        category: "main",
        image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&q=80", // Meatballs
        rating: 4.7
    },
    {
        id: 5,
        name: "Grilled Sea Bream",
        description: "Fresh Mediterranean Daurade grilled with herbs and lemon.",
        price: 1800,
        category: "main",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=80",
        rating: 4.6
    },
    {
        id: 6,
        name: "Salad Mechouia",
        description: "Grilled peppers and tomatoes salad with olive oil and tuna.",
        price: 600,
        category: "starter",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80", // Salad
        rating: 4.5
    },
    {
        id: 7,
        name: "Pizza Carrée",
        description: "Algerian style square pizza with tomato sauce and olives.",
        price: 200,
        category: "starter",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80", // Pizza
        rating: 4.4
    },
    {
        id: 8,
        name: "Tacos (Chicken)",
        description: "French tacos with marinated chicken, cheesy sauce and fries.",
        price: 600,
        category: "main",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80", // Tacos
        rating: 4.8
    },
    {
        id: 9,
        name: "Coca Cola",
        description: "Chilled 33cl can.",
        price: 100,
        category: "drink",
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80",
        rating: 5.0
    },
    {
        id: 10,
        name: "Mint Tea",
        description: "Traditional tea with fresh mint.",
        price: 150,
        category: "drink",
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&q=80",
        rating: 4.9
    },
    {
        id: 11,
        name: "Fruit Salad",
        description: "Seasonal fresh fruits mix.",
        price: 400,
        category: "dessert",
        image: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=500&q=80",
        rating: 4.3
    },
    {
        id: 12,
        name: "Kalbelouz",
        description: "Semolina cake soaked in syrup.",
        price: 150,
        category: "dessert",
        image: "https://images.unsplash.com/photo-1582806283307-57849c71618a?w=500&q=80", // Semolina Cake style
        rating: 4.7
    }
];

// Cart State
let cart = {};

function initMenu() {
    renderMenu('all');
    setupFilters();
    setupSearch();
    updateCartUI();

    document.getElementById('placeOrderBtn').addEventListener('click', placeOrder);
}

function renderMenu(categoryFilter) {
    const grid = document.getElementById('menuGrid');
    grid.innerHTML = '';

    const filtered = categoryFilter === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === categoryFilter);

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-item-card';
        card.innerHTML = `
            <div class="card-image">
                <img src="${item.image}" alt="${item.name}">
                <span class="rating"><span class="material-symbols-rounded">star</span> ${item.rating}</span>
            </div>
            <div class="card-details">
                <div class="header">
                    <h4>${item.name}</h4>
                    <span class="price">${item.price} DZD</span>
                </div>
                <p class="desc">${item.description}</p>
                <div class="actions">
                    <button class="add-btn" onclick="addToCart(${item.id})">
                        Add to Order <span class="material-symbols-rounded">add</span>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function setupFilters() {
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            buttons.forEach(b => b.classList.remove('active'));
            // Add active
            btn.classList.add('active');
            // Filter
            renderMenu(btn.dataset.category);
        });
    });
}

function setupSearch() {
    const input = document.querySelector('.search-wrap input');
    input.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const grid = document.getElementById('menuGrid');
        grid.innerHTML = '';

        const filtered = menuItems.filter(item =>
            item.name.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term)
        );

        filtered.forEach(item => {
            // ... (Duplicate render logic - kept simple for prototype)
            const card = document.createElement('div');
            card.className = 'menu-item-card';
            card.innerHTML = `
                <div class="card-image">
                    <img src="${item.image}" alt="${item.name}">
                    <span class="rating"><span class="material-symbols-rounded">star</span> ${item.rating}</span>
                </div>
                <div class="card-details">
                    <div class="header">
                        <h4>${item.name}</h4>
                        <span class="price">${item.price} DZD</span>
                    </div>
                    <p class="desc">${item.description}</p>
                    <div class="actions">
                        <button class="add-btn" onclick="addToCart(${item.id})">
                            Add to Order <span class="material-symbols-rounded">add</span>
                        </button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    });
}

window.addToCart = function (id) {
    if (cart[id]) {
        cart[id].qty++;
    } else {
        const item = menuItems.find(i => i.id === id);
        cart[id] = { ...item, qty: 1 };
    }
    updateCartUI();
};

window.removeFromCart = function (id) {
    if (cart[id]) {
        cart[id].qty--;
        if (cart[id].qty <= 0) {
            delete cart[id];
        }
    }
    updateCartUI();
};

function updateCartUI() {
    const cartContainer = document.getElementById('cartItems');
    const items = Object.values(cart);

    if (items.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-state">
                <span class="material-symbols-rounded">shopping_basket</span>
                <p>Your cart is empty</p>
                <small>Tap + to add items</small>
            </div>
        `;
        document.getElementById('placeOrderBtn').disabled = true;
        updateTotals(0);
        return;
    }

    cartContainer.innerHTML = '';
    let subtotal = 0;

    items.forEach(item => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="info">
                <h4>${item.name}</h4>
                <small>${item.price} DZD</small>
            </div>
            <div class="controls">
                <button class="qty-btn" onclick="removeFromCart(${item.id})">-</button>
                <span>${item.qty}</span>
                <button class="qty-btn" onclick="addToCart(${item.id})">+</button>
            </div>
        `;
        cartContainer.appendChild(div);
    });

    updateTotals(subtotal);
    document.getElementById('placeOrderBtn').disabled = false;
}

function updateTotals(subtotal) {
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    document.getElementById('subtotalPrice').textContent = `${subtotal.toLocaleString()} DZD`;
    document.getElementById('taxPrice').textContent = `${tax.toFixed(0)} DZD`;
    document.getElementById('totalPrice').textContent = `${total.toLocaleString()} DZD`;
}

function placeOrder() {
    const btn = document.getElementById('placeOrderBtn');
    btn.innerHTML = `<span class="material-symbols-rounded">progress_activity</span> Sending...`;

    setTimeout(() => {
        const modal = document.getElementById('successModal');
        modal.classList.add('visible');
        cart = {};
        updateCartUI();
        btn.innerHTML = `Place Order <span class="material-symbols-rounded">arrow_forward</span>`;
    }, 1500);
}
