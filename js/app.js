// Chart.js Configuration
document.addEventListener('DOMContentLoaded', function () {
    initCharts();
});




function initCharts() {
    // Revenue Chart (Line)
    const ctxRevenue = document.getElementById('revenueChart').getContext('2d');

    // Gradient for Revenue
    let gradientRevenue = ctxRevenue.createLinearGradient(0, 0, 0, 400);
    gradientRevenue.addColorStop(0, 'rgba(41, 121, 255, 0.5)');
    gradientRevenue.addColorStop(1, 'rgba(41, 121, 255, 0.0)');

    new Chart(ctxRevenue, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Revenue (DZD)',
                data: [45000, 52000, 48000, 61000, 58000, 85000, 92000],
                borderColor: '#2979FF',
                backgroundColor: gradientRevenue,
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#181b21',
                pointBorderColor: '#2979FF',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#181b21',
                    titleColor: '#fff',
                    bodyColor: '#9ca3af',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                        label: function (context) {
                            return context.parsed.y.toLocaleString() + ' DZD';
                        }
                    }
                }
            },
            scales: {
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#9ca3af',
                        callback: function (value) {
                            return value / 1000 + 'k';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#9ca3af'
                    }
                }
            }
        }
    });

    // Inventory Chart (Bar)
    const ctxInventory = document.getElementById('inventoryChart').getContext('2d');

    new Chart(ctxInventory, {
        type: 'bar',
        data: {
            labels: ['Tomatoes', 'Lamb', 'Frik', 'Spices', 'Oil'],
            datasets: [{
                label: 'Stock Level (%)',
                data: [85, 45, 90, 20, 60],
                backgroundColor: [
                    '#00E676', // High
                    '#FF9100', // Medium
                    '#00E676', // High
                    '#FF1744', // Low (Action needed)
                    '#2979FF'  // Normal
                ],
                borderRadius: 6,
                barThickness: 30
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#9ca3af'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#9ca3af'
                    }
                }
            }
        }
    });
}

// Interaction Simulation
function simulateAction(message) {
    // Simple toast notification simulation
    const btn = event.currentTarget;
    const originalText = btn.innerHTML;

    btn.innerHTML = `<span class="material-symbols-rounded">check</span> ${message}`;
    btn.style.backgroundColor = '#00C853';
    btn.style.color = '#fff';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.backgroundColor = '';
        btn.style.color = '';
        btn.disabled = false;
    }, 2000);
}

// Kanban Board Logic
document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.kanban-board')) {
        initKanban();
    }
});

function initKanban() {
    const buttons = document.querySelectorAll('.btn-action');

    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            const card = e.target.closest('.order-card');
            const currentColumn = card.parentElement;
            const allColumns = document.querySelectorAll('.kanban-column');

            // Simple state machine
            if (btn.classList.contains('accept')) {
                // Move to Preparing
                moveCard(card, allColumns[1]);
                updateButton(btn, 'ready', 'Mark Ready');
                // Add chef assignment simulation
                if (!card.querySelector('.chef-assign')) {
                    const chefDiv = document.createElement('div');
                    chefDiv.className = 'chef-assign';
                    chefDiv.innerHTML = `
                        <img src="https://ui-avatars.com/api/?name=Chef+Ahmed&background=random" class="chef-avatar">
                        <span>Chef Ahmed</span>
                    `;
                    card.insertBefore(chefDiv, card.querySelector('.card-actions'));
                }
            } else if (btn.classList.contains('ready')) {
                // Move to Ready
                moveCard(card, allColumns[2]);
                updateButton(btn, 'serve', 'Serve Now');
                card.classList.add('ready-glow');
                card.querySelector('.timer').style.display = 'none';

                // Update status badge
                const cardTop = card.querySelector('.card-top');
                if (cardTop.querySelector('.timer')) cardTop.querySelector('.timer').remove();

                const badge = document.createElement('span');
                badge.className = 'status-badge';
                badge.textContent = 'READY';
                badge.style.color = '#00E676';
                badge.style.fontWeight = '700';
                badge.style.fontSize = '12px';
                cardTop.appendChild(badge);

            } else if (btn.classList.contains('serve')) {
                // Remove card
                card.style.transform = 'scale(0.9)';
                card.style.opacity = '0';
                setTimeout(() => {
                    card.remove();
                    updateCounts();
                }, 300);
            }
        });
    });
}

function moveCard(card, targetColumn) {
    card.style.opacity = '0';
    setTimeout(() => {
        targetColumn.appendChild(card);
        card.style.opacity = '1';
        updateCounts();
    }, 200);
}

function updateButton(btn, newClass, newText) {
    btn.className = `btn-action ${newClass}`;
    btn.textContent = newText;
}

function updateCounts() {
    document.querySelectorAll('.kanban-column').forEach(col => {
        const count = col.querySelectorAll('.order-card').length;
        col.querySelector('.count').textContent = count;
    });
}
