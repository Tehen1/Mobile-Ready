// FixieRun PWA - Main Application JavaScript

console.log('FixieRun App Loading...');

class FixieRunApp {
    constructor() {
        this.currentPage = 'home';
        this.theme = this.getStoredTheme();
        this.isWorkoutActive = false;
        this.workoutTimer = null;
        this.charts = {};
        
        // App data
        this.userData = {
            name: "Alex Runner",
            status: "Online",
            totalEarned: "0.00",
            walletConnected: false,
            todayProgress: {
                distance: 0.0,
                duration: "0:07",
                calories: 0,
                tokens: "0.00"
            },
            gps: {
                tracking: true,
                accuracy: "±35m",
                speed: "0.0",
                distance: "0.00",
                time: "00:00"
            }
        };

        this.init();
    }

    getStoredTheme() {
        try {
            const stored = localStorage.getItem('fixierun-theme');
            if (stored) return stored;
        } catch (e) {
            // LocalStorage not available, use system preference
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    init() {
        console.log('Initializing FixieRun App...');
        
        // Apply theme immediately
        this.applyTheme();
        
        // Show loading screen for realistic duration
        setTimeout(() => {
            this.hideLoadingScreen();
            
            // Setup app after loading screen is hidden
            setTimeout(() => {
                this.setupEventListeners();
                this.initializeCharts();
                this.setupPWA();
                console.log('FixieRun App ready!');
            }, 300);
        }, 2000);
    }

    applyTheme() {
        document.documentElement.setAttribute('data-color-scheme', this.theme);
        try {
            localStorage.setItem('fixierun-theme', this.theme);
        } catch (e) {
            console.warn('Cannot save theme preference');
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        this.showToast(`Mode ${this.theme === 'dark' ? 'sombre' : 'clair'} activé`, 'success');
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const mainApp = document.getElementById('main-app');
        
        if (loadingScreen && mainApp) {
            loadingScreen.style.transition = 'opacity 0.6s ease-out';
            loadingScreen.style.opacity = '0';
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                mainApp.classList.remove('hidden');
            }, 600);
        }
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');

        // Connect button
        const connectBtn = document.getElementById('connect-btn');
        if (connectBtn) {
            connectBtn.addEventListener('click', () => this.connectWallet());
        }

        // Start workout button
        const startWorkoutBtn = document.getElementById('start-workout');
        if (startWorkoutBtn) {
            startWorkoutBtn.addEventListener('click', () => this.startWorkout());
        }

        // Bottom navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            const page = item.getAttribute('data-page');
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateToPage(page);
            });
        });

        // Workout type cards
        document.querySelectorAll('.workout-type-card').forEach(card => {
            const type = card.getAttribute('data-type');
            card.addEventListener('click', () => this.selectWorkoutType(type));
        });

        // Dark mode toggle
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.checked = this.theme === 'dark';
            darkModeToggle.addEventListener('change', () => this.toggleTheme());
        }

        // Settings toggles
        document.querySelectorAll('.setting-item .toggle input').forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                const settingItem = e.target.closest('.setting-item');
                const settingName = settingItem.querySelector('span').textContent;
                this.showToast(`${settingName} ${e.target.checked ? 'activé' : 'désactivé'}`, 'info');
            });
        });

        // Claim rewards button
        document.querySelectorAll('.claim-btn').forEach(btn => {
            btn.addEventListener('click', () => this.claimRewards());
        });

        // Logout button
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        console.log('Event listeners set up successfully');
    }

    navigateToPage(pageId) {
        console.log(`Navigating to: ${pageId}`);

        // Hide home page
        const homePage = document.getElementById('home-page');
        if (homePage) {
            homePage.classList.add('hidden');
        }

        // Hide all other pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.add('hidden');
        });

        // Show target page
        if (pageId === 'home') {
            if (homePage) {
                homePage.classList.remove('hidden');
            }
        } else {
            const targetPage = document.getElementById(`${pageId}-page`);
            if (targetPage) {
                targetPage.classList.remove('hidden');
            }
        }

        // Update navigation state
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        const activeNavItem = document.querySelector(`[data-page="${pageId}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }

        this.currentPage = pageId;
    }

    connectWallet() {
        if (this.userData.walletConnected) {
            this.showToast('Wallet déjà connecté', 'info');
            return;
        }

        const connectBtn = document.getElementById('connect-btn');
        if (connectBtn) {
            connectBtn.textContent = 'Connexion...';
            connectBtn.disabled = true;
        }

        setTimeout(() => {
            this.userData.walletConnected = true;
            if (connectBtn) {
                connectBtn.textContent = 'Connecté';
                connectBtn.classList.remove('btn--primary');
                connectBtn.classList.add('btn--secondary');
            }
            this.showToast('Wallet connecté avec succès !', 'success');
        }, 2000);
    }

    startWorkout() {
        if (this.isWorkoutActive) {
            this.stopWorkout();
            return;
        }

        this.showToast('Sélectionnez un type d\'entraînement', 'info');
        this.navigateToPage('workouts');
    }

    selectWorkoutType(type) {
        const typeNames = {
            running: 'Course',
            walking: 'Marche',
            cycling: 'Vélo'
        };

        const typeName = typeNames[type] || type;
        this.showToast(`Entraînement ${typeName} démarré !`, 'success');
        
        this.isWorkoutActive = true;
        this.startWorkoutTimer();

        // Navigate back to home to show workout progress
        setTimeout(() => {
            this.navigateToPage('home');
            this.updateWorkoutButton();
        }, 1000);

        // Simulate workout completion
        setTimeout(() => {
            this.completeWorkout(type);
        }, 15000);
    }

    startWorkoutTimer() {
        let seconds = 0;
        this.workoutTimer = setInterval(() => {
            seconds++;
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            const timeString = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
            
            // Update GPS time display
            const gpsTimeElements = document.querySelectorAll('.gps-stat .stat-value');
            if (gpsTimeElements.length >= 3) {
                gpsTimeElements[2].textContent = timeString;
            }

            // Simulate distance and speed
            const distance = (seconds * 0.003).toFixed(2); // Simulate 3m per second
            const speed = '4.5'; // Average walking speed

            if (gpsTimeElements.length >= 3) {
                gpsTimeElements[0].textContent = speed;
                gpsTimeElements[1].textContent = distance;
            }
        }, 1000);
    }

    updateWorkoutButton() {
        const startWorkoutBtn = document.getElementById('start-workout');
        if (startWorkoutBtn && this.isWorkoutActive) {
            startWorkoutBtn.textContent = '⏹️ ARRÊTER WORKOUT';
            startWorkoutBtn.classList.add('btn--secondary');
            startWorkoutBtn.classList.remove('btn--primary');
        }
    }

    stopWorkout() {
        this.isWorkoutActive = false;
        if (this.workoutTimer) {
            clearInterval(this.workoutTimer);
            this.workoutTimer = null;
        }

        const startWorkoutBtn = document.getElementById('start-workout');
        if (startWorkoutBtn) {
            startWorkoutBtn.textContent = '🏃‍♂️ START WORKOUT';
            startWorkoutBtn.classList.remove('btn--secondary');
            startWorkoutBtn.classList.add('btn--primary');
        }

        this.showToast('Entraînement arrêté', 'info');
    }

    completeWorkout(type) {
        if (!this.isWorkoutActive) return;

        this.stopWorkout();
        
        const rewards = {
            running: 15,
            walking: 10,
            cycling: 25
        };

        const reward = rewards[type] || 10;
        const typeNames = {
            running: 'Course',
            walking: 'Marche',
            cycling: 'Vélo'
        };

        this.showToast(`Entraînement ${typeNames[type]} terminé ! +${reward} FIXIE gagnés`, 'success');
        
        // Update user progress
        this.userData.totalEarned = (parseFloat(this.userData.totalEarned) + reward).toFixed(2);
        this.updateEarningsDisplay();
    }

    updateEarningsDisplay() {
        const earningsAmountEl = document.querySelector('.earnings-amount');
        if (earningsAmountEl) {
            earningsAmountEl.textContent = this.userData.totalEarned;
        }
    }

    claimRewards() {
        this.showToast('23.4 FIXIE récupérés avec succès !', 'success');
        
        // Update button state
        const claimBtn = event.target;
        claimBtn.textContent = 'Récupéré';
        claimBtn.disabled = true;
        claimBtn.classList.remove('btn--primary');
        claimBtn.classList.add('btn--secondary');
    }

    logout() {
        if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
            this.showToast('Déconnexion en cours...', 'info');
            setTimeout(() => {
                // Reset app state
                this.userData.walletConnected = false;
                this.userData.totalEarned = "0.00";
                location.reload();
            }, 1500);
        }
    }

    showToast(message, type = 'info') {
        // Remove existing toasts
        document.querySelectorAll('.toast').forEach(toast => toast.remove());

        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.innerHTML = `<div class="toast-message">${message}</div>`;

        document.body.appendChild(toast);

        // Auto remove toast
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 4000);
    }

    initializeCharts() {
        try {
            if (typeof Chart === 'undefined') {
                console.warn('Chart.js not loaded');
                return;
            }

            const weeklyCtx = document.getElementById('weeklyChart');
            if (weeklyCtx) {
                this.charts.weekly = new Chart(weeklyCtx, {
                    type: 'bar',
                    data: {
                        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
                        datasets: [{
                            label: 'Distance (km)',
                            data: [3.2, 0, 5.1, 2.8, 4.3, 6.7, 3.8],
                            backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C'],
                            borderRadius: 6,
                            borderSkipped: false,
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
                                grid: {
                                    color: this.theme === 'dark' ? '#374151' : '#e5e7eb'
                                },
                                ticks: {
                                    color: this.theme === 'dark' ? '#9ca3af' : '#6b7280'
                                }
                            },
                            x: {
                                grid: {
                                    display: false
                                },
                                ticks: {
                                    color: this.theme === 'dark' ? '#9ca3af' : '#6b7280'
                                }
                            }
                        }
                    }
                });
                console.log('Charts initialized successfully');
            }
        } catch (error) {
            console.error('Error initializing charts:', error);
        }
    }

    setupPWA() {
        // Register service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.error('Service Worker registration failed:', error);
                });
        }

        // Handle PWA installation
        let deferredPrompt;

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Show install prompt after delay
            setTimeout(() => {
                this.showInstallPrompt(deferredPrompt);
            }, 30000);
        });

        window.addEventListener('appinstalled', () => {
            this.showToast('FixieRun installé avec succès !', 'success');
            deferredPrompt = null;
        });

        // Handle online/offline status
        window.addEventListener('online', () => {
            this.showToast('Connexion rétablie', 'success');
            this.updateConnectionStatus(true);
        });

        window.addEventListener('offline', () => {
            this.showToast('Mode hors-ligne activé', 'info');
            this.updateConnectionStatus(false);
        });
    }

    updateConnectionStatus(isOnline) {
        const statusText = document.querySelector('.status-text');
        const statusDot = document.querySelector('.status-dot');
        
        if (statusText && statusDot) {
            statusText.textContent = isOnline ? 'Online' : 'Offline';
            statusDot.className = isOnline ? 'status-dot online' : 'status-dot offline';
        }
    }

    showInstallPrompt(deferredPrompt) {
        if (!deferredPrompt) return;

        const installDiv = document.createElement('div');
        installDiv.className = 'install-prompt';
        installDiv.innerHTML = `
            <div class="install-content">
                <h3>Installer FixieRun</h3>
                <p>Installez l'application pour une meilleure expérience</p>
                <div class="install-actions">
                    <button class="btn btn--primary install-btn">Installer</button>
                    <button class="btn btn--outline dismiss-btn">Plus tard</button>
                </div>
            </div>
        `;

        // Add styles for install prompt
        const style = document.createElement('style');
        style.textContent = `
            .install-prompt {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                padding: var(--space-16);
            }
            .install-content {
                background: var(--color-surface);
                border-radius: var(--radius-lg);
                padding: var(--space-24);
                text-align: center;
                max-width: 320px;
                width: 100%;
                box-shadow: var(--shadow-lg);
            }
            .install-actions {
                display: flex;
                gap: var(--space-12);
                margin-top: var(--space-20);
            }
            .install-actions .btn {
                flex: 1;
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(installDiv);

        // Handle install button click
        installDiv.querySelector('.install-btn').addEventListener('click', async () => {
            deferredPrompt.prompt();
            const choiceResult = await deferredPrompt.userChoice;
            
            if (choiceResult.outcome === 'accepted') {
                this.showToast('Installation en cours...', 'info');
            }
            
            document.body.removeChild(installDiv);
            document.head.removeChild(style);
        });

        // Handle dismiss button click
        installDiv.querySelector('.dismiss-btn').addEventListener('click', () => {
            document.body.removeChild(installDiv);
            document.head.removeChild(style);
        });
    }

    // Simulate GPS tracking updates
    startGPSTracking() {
        setInterval(() => {
            if (!this.isWorkoutActive) return;

            // Simulate GPS updates
            const accuracy = Math.floor(Math.random() * 20) + 25; // 25-45m
            document.querySelector('.gps-accuracy').textContent = `±${accuracy}m`;
        }, 5000);
    }
}

// Initialize app when DOM is ready
function initializeApp() {
    console.log('DOM ready - Initializing FixieRun');
    
    try {
        window.fixieRunApp = new FixieRunApp();
    } catch (error) {
        console.error('Error initializing app:', error);
        
        // Fallback initialization
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            const mainApp = document.getElementById('main-app');
            
            if (loadingScreen && mainApp) {
                loadingScreen.classList.add('hidden');
                mainApp.classList.remove('hidden');
            }
        }, 2000);
    }
}

// Multiple initialization methods to ensure app starts
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Backup initialization
window.addEventListener('load', () => {
    if (!window.fixieRunApp) {
        console.log('Backup initialization');
        initializeApp();
    }
});

// Handle PWA display mode
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
    console.log('Running as installed PWA');
    document.body.classList.add('pwa-mode');
}

console.log('FixieRun App Script Loaded Successfully');