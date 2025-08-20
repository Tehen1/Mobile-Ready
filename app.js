// FixieRun Cyberpunk PWA - Neural Interface JavaScript

console.log('Neural Interface Loading...');

class CyberFixieApp {
    constructor() {
        console.log('CyberFixieApp neural sync initiated');
        this.currentPage = 'home';
        this.neuralState = 'ACTIVE';
        this.deferredPrompt = null;
        this.charts = {};
        this.userData = {
            name: "CYBER.RUNNER",
            callsign: "NEURAL_NODE_7847", 
            email: "cyber@fixie.run",
            level: 12,
            totalMiles: 312.4,
            quantumTokens: 1247,
            streakDays: 7,
            status: "ONLINE"
        };
        
        // Initialize neural interface
        this.init();
    }

    init() {
        console.log('Initializing neural interface...');
        
        // Setup PWA neural protocols
        this.setupNeuralPWA();
        
        // Simulate neural sync loading
        setTimeout(() => {
            console.log('Neural sync complete');
            this.activateInterface();
            
            // Setup neural event listeners after interface activation
            setTimeout(() => {
                this.setupNeuralListeners();
                this.initializeNeuralCharts();
                this.startNeuralAnimations();
                console.log('Neural interface fully operational');
            }, 300);
        }, 1500);
    }

    activateInterface() {
        console.log('Activating neural interface');
        
        const loadingScreen = document.getElementById('loading-screen');
        const mainApp = document.getElementById('main-app');
        
        if (loadingScreen && mainApp) {
            console.log('Interface activation in progress...');
            
            loadingScreen.style.transition = 'opacity 0.8s ease';
            loadingScreen.style.opacity = '0';
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                mainApp.classList.remove('hidden');
                this.showNeuralToast('NEURAL INTERFACE ONLINE', 'success');
                console.log('Neural interface activated');
            }, 800);
        } else {
            console.error('Interface components not found');
        }
    }

    setupNeuralListeners() {
        console.log('Setting up neural event listeners...');
        
        // Bottom navigation neural sync
        const navItems = document.querySelectorAll('.nav-item');
        console.log('Neural nav nodes detected:', navItems.length);
        
        navItems.forEach((item, index) => {
            const page = item.getAttribute('data-page');
            console.log(`Syncing nav node ${index}: ${page}`);
            
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Neural nav activated: ${page}`);
                this.navigateToPage(page);
                this.playNeuralFeedback();
            });
        });

        // Cyber grid cards navigation
        const gridCards = document.querySelectorAll('.grid-card');
        console.log('Cyber grid cards detected:', gridCards.length);
        
        gridCards.forEach(card => {
            const page = card.getAttribute('data-page');
            console.log('Syncing grid card for:', page);
            
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Grid card neural link activated: ${page}`);
                this.navigateToPage(page);
                this.showNeuralToast(`ACCESSING ${page.toUpperCase()} MATRIX`, 'info');
            });
        });

        // Protocol activation button
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            console.log('Main protocol activation button synced');
            ctaButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Main protocol activation initiated');
                this.initiateRideProtocol();
            });
        }

        // Training protocol cards
        const protocolCards = document.querySelectorAll('.protocol-card');
        console.log('Training protocol cards detected:', protocolCards.length);
        
        protocolCards.forEach(card => {
            const type = card.getAttribute('data-type');
            console.log('Syncing protocol card:', type);
            
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Training protocol selected: ${type}`);
                this.selectTrainingProtocol(type);
            });
        });

        // Neural interface interactions
        this.setupNeuralInteractions();
        
        console.log('All neural listeners synchronized');
    }

    setupNeuralInteractions() {
        // Connect neural wallet
        document.querySelectorAll('button').forEach(btn => {
            if (btn.textContent.includes('CONNECT NEURAL WALLET')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.connectNeuralWallet();
                });
            }
            if (btn.textContent.includes('CLAIM')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.claimNeuralRewards();
                });
            }
            if (btn.textContent.includes('ACQUIRE')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.acquireNeuralUpgrade(btn);
                });
            }
            if (btn.textContent.includes('ACTIVATE TRAINING SEQUENCE')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.activateTrainingSequence();
                });
            }
        });

        // Neural toggle controls
        document.querySelectorAll('.cyber-toggle input[type="checkbox"]').forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                const controlItem = e.target.closest('.control-item');
                this.handleNeuralControl(controlItem, e.target.checked);
            });
        });

        // Disconnect session
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.disconnectSession();
            });
        }
    }

    navigateToPage(pageId) {
        console.log('Neural navigation to:', pageId);
        
        try {
            // Update neural state
            this.currentPage = pageId;
            
            // Hide all interface panels
            const allPages = document.querySelectorAll('.page');
            console.log('Interface panels to hide:', allPages.length);
            
            allPages.forEach(page => {
                page.classList.remove('active');
                console.log('Deactivated panel:', page.id);
            });
            
            // Activate target panel
            const targetPage = document.getElementById(`${pageId}-page`);
            console.log('Target panel:', targetPage);
            
            if (targetPage) {
                targetPage.classList.add('active');
                console.log('Activated panel:', targetPage.id);
                
                // Update interface header
                const pageTitles = {
                    home: 'QUANTUM DASHBOARD',
                    defi: 'BLOCKCHAIN MATRIX',
                    analytics: 'DATA NEXUS',
                    workouts: 'TRAINING PROTOCOLS',
                    rewards: 'CYBER MARKETPLACE',
                    profile: 'USER INTERFACE'
                };
                
                const pageTitle = document.getElementById('page-title');
                if (pageTitle) {
                    pageTitle.textContent = pageTitles[pageId] || 'NEURAL INTERFACE';
                    console.log('Interface header updated to:', pageTitles[pageId]);
                }
                
                // Update navigation neural sync
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                const activeNavItem = document.querySelector(`[data-page="${pageId}"]`);
                if (activeNavItem && activeNavItem.classList.contains('nav-item')) {
                    activeNavItem.classList.add('active');
                    console.log('Neural nav sync updated');
                }
                
                // Trigger page-specific neural effects
                this.triggerPageEffects(pageId);
                
                console.log('Neural navigation complete:', pageId);
            } else {
                console.error('Target panel not found:', `${pageId}-page`);
            }
        } catch (e) {
            console.error('Neural navigation error:', e);
            this.showNeuralToast('NAVIGATION ERROR DETECTED', 'error');
        }
    }

    triggerPageEffects(pageId) {
        // Add page-specific neural effects
        switch(pageId) {
            case 'analytics':
                this.updateNeuralMetrics();
                break;
            case 'defi':
                this.syncBlockchainData();
                break;
            case 'workouts':
                this.scanTrainingProtocols();
                break;
            case 'rewards':
                this.updateMarketplaceData();
                break;
            case 'profile':
                this.validateUserInterface();
                break;
            default:
                this.refreshDashboard();
        }
    }

    initiateRideProtocol() {
        console.log('Ride protocol initiation sequence');
        this.showNeuralToast('RIDE PROTOCOL INITIATED', 'info');
        this.playNeuralSequence();
        this.navigateToPage('workouts');
    }

    selectTrainingProtocol(type) {
        const protocolNames = {
            'neural-sprint': 'NEURAL SPRINT',
            'quantum-cruise': 'QUANTUM CRUISE', 
            'matrix-override': 'MATRIX OVERRIDE'
        };
        
        console.log('Training protocol selected:', type);
        const protocolName = protocolNames[type] || type.toUpperCase();
        this.showNeuralToast(`${protocolName} PROTOCOL ACTIVE`, 'success');
        
        // Simulate protocol execution
        this.executeTrainingProtocol(protocolName);
    }

    executeTrainingProtocol(protocolName) {
        console.log('Executing training protocol:', protocolName);
        
        // Show execution feedback
        setTimeout(() => {
            this.showNeuralToast(`${protocolName} EXECUTION COMPLETE`, 'success');
            this.showNeuralToast('+15 QUANTUM TOKENS EARNED', 'success');
            this.updateTokenBalance(15);
        }, 3000);
    }

    activateTrainingSequence() {
        this.showNeuralToast('TRAINING SEQUENCE ACTIVATION', 'info');
        this.showNeuralToast('SELECT PROTOCOL TYPE', 'info');
    }

    claimNeuralRewards() {
        this.showNeuralToast('CLAIMING NEURAL REWARDS...', 'info');
        setTimeout(() => {
            this.showNeuralToast('23.4 QUANTUM TOKENS CLAIMED', 'success');
            this.updateTokenBalance(23.4);
        }, 1500);
    }

    acquireNeuralUpgrade(button) {
        const upgradeName = button.closest('.upgrade-card').querySelector('h4').textContent;
        this.showNeuralToast(`ACQUIRING ${upgradeName}...`, 'info');
        
        setTimeout(() => {
            this.showNeuralToast(`${upgradeName} ACQUIRED`, 'success');
            button.textContent = 'ACQUIRED';
            button.classList.add('disabled');
        }, 2000);
    }

    connectNeuralWallet() {
        this.showNeuralToast('NEURAL WALLET CONNECTION INITIATED', 'info');
        setTimeout(() => {
            this.showNeuralToast('NEURAL WALLET SYNCHRONIZED', 'success');
        }, 2500);
    }

    handleNeuralControl(controlItem, enabled) {
        const controlName = controlItem.querySelector('.control-label').textContent;
        const status = enabled ? 'ENABLED' : 'DISABLED';
        this.showNeuralToast(`${controlName} ${status}`, 'info');
    }

    disconnectSession() {
        if (confirm('CONFIRM SESSION DISCONNECT?')) {
            this.showNeuralToast('DISCONNECTING NEURAL SESSION...', 'info');
            setTimeout(() => {
                this.showNeuralToast('SESSION TERMINATED', 'error');
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }, 1500);
        }
    }

    updateTokenBalance(amount) {
        this.userData.quantumTokens += amount;
        // Update display elements
        document.querySelectorAll('.token-amount').forEach(el => {
            el.textContent = this.userData.quantumTokens.toLocaleString();
        });
        document.querySelectorAll('.node-value').forEach(el => {
            if (el.textContent.includes('1,247')) {
                el.textContent = this.userData.quantumTokens.toLocaleString();
            }
        });
    }

    updateNeuralMetrics() {
        console.log('Updating neural performance metrics');
        // Simulate real-time neural data updates
        const metrics = document.querySelectorAll('.metric-value');
        metrics.forEach(metric => {
            const currentValue = parseFloat(metric.textContent);
            const variance = (Math.random() - 0.5) * 2;
            const newValue = Math.max(0, Math.min(100, currentValue + variance));
            metric.textContent = newValue.toFixed(1) + '%';
        });
    }

    syncBlockchainData() {
        console.log('Syncing blockchain matrix data');
        this.showNeuralToast('BLOCKCHAIN SYNC IN PROGRESS', 'info');
    }

    scanTrainingProtocols() {
        console.log('Scanning available training protocols');
        this.showNeuralToast('SCANNING TRAINING PROTOCOLS', 'info');
    }

    updateMarketplaceData() {
        console.log('Updating cyber marketplace data');
        this.showNeuralToast('MARKETPLACE DATA UPDATED', 'info');
    }

    validateUserInterface() {
        console.log('Validating user interface systems');
        this.showNeuralToast('USER INTERFACE VALIDATED', 'success');
    }

    refreshDashboard() {
        console.log('Refreshing quantum dashboard');
        this.updateNeuralStats();
    }

    updateNeuralStats() {
        // Animate neural stats with slight variations
        const statNodes = document.querySelectorAll('.node-value');
        statNodes.forEach(node => {
            if (node.textContent.includes('ACTIVE')) {
                node.style.textShadow = '0 0 15px #39ff14';
                setTimeout(() => {
                    node.style.textShadow = '0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 15px #39ff14';
                }, 500);
            }
        });
    }

    playNeuralFeedback() {
        // Create subtle neural feedback sound/vibration
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }

    playNeuralSequence() {
        // Enhanced neural sequence feedback
        if ('vibrate' in navigator) {
            navigator.vibrate([100, 50, 100]);
        }
    }

    startNeuralAnimations() {
        // Start continuous neural animations
        setInterval(() => {
            this.animateNeuralElements();
        }, 5000);
    }

    animateNeuralElements() {
        // Animate status indicators
        const statusIndicators = document.querySelectorAll('.status-indicator, .device-indicator');
        statusIndicators.forEach(indicator => {
            indicator.style.animation = 'none';
            setTimeout(() => {
                indicator.style.animation = 'pulse 2s infinite';
            }, 10);
        });
    }

    showNeuralToast(message, type = 'info') {
        console.log('Neural toast:', message, type);
        
        try {
            // Remove existing neural toasts
            document.querySelectorAll('.neural-toast').forEach(toast => toast.remove());

            const toast = document.createElement('div');
            toast.className = `neural-toast neural-toast--${type}`;
            toast.innerHTML = `
                <div class="neural-toast-content">
                    <div class="toast-indicator"></div>
                    <span class="neural-message">${message}</span>
                </div>
            `;

            // Add neural toast styles if not exists
            if (!document.querySelector('#neural-toast-styles')) {
                const styles = document.createElement('style');
                styles.id = 'neural-toast-styles';
                styles.textContent = `
                    .neural-toast {
                        position: fixed;
                        top: 100px;
                        left: 50%;
                        transform: translateX(-50%);
                        background: var(--cyber-gray);
                        border: 1px solid var(--neon-blue);
                        border-radius: 8px;
                        padding: 1rem 1.5rem;
                        box-shadow: var(--glow-blue), 0 0 30px rgba(0, 243, 255, 0.3);
                        z-index: 10001;
                        max-width: 400px;
                        animation: neuralSlideDown 0.5s ease-out;
                        pointer-events: none;
                        backdrop-filter: blur(10px);
                    }
                    
                    .neural-toast--success {
                        border-color: var(--neon-green);
                        background: rgba(57, 255, 20, 0.1);
                        box-shadow: var(--glow-green), 0 0 30px rgba(57, 255, 20, 0.3);
                    }
                    
                    .neural-toast--error {
                        border-color: var(--hot-pink);
                        background: rgba(255, 0, 128, 0.1);
                        box-shadow: 0 0 20px rgba(255, 0, 128, 0.3);
                    }
                    
                    .neural-toast--info {
                        border-color: var(--electric-cyan);
                        background: rgba(0, 255, 255, 0.1);
                        box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
                    }
                    
                    .neural-toast-content {
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                    }
                    
                    .toast-indicator {
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: var(--neon-blue);
                        box-shadow: var(--glow-blue);
                        animation: pulse 2s infinite;
                    }
                    
                    .neural-toast--success .toast-indicator {
                        background: var(--neon-green);
                        box-shadow: var(--glow-green);
                    }
                    
                    .neural-toast--error .toast-indicator {
                        background: var(--hot-pink);
                        box-shadow: 0 0 10px var(--hot-pink);
                    }
                    
                    .neural-toast--info .toast-indicator {
                        background: var(--electric-cyan);
                        box-shadow: 0 0 10px var(--electric-cyan);
                    }
                    
                    .neural-message {
                        font-family: var(--font-family-cyber);
                        font-size: 0.9rem;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        color: var(--electric-cyan);
                        text-shadow: 0 0 5px currentColor;
                    }
                    
                    .neural-toast--success .neural-message {
                        color: var(--neon-green);
                    }
                    
                    .neural-toast--error .neural-message {
                        color: var(--hot-pink);
                    }
                    
                    .neural-toast--info .neural-message {
                        color: var(--electric-cyan);
                    }
                    
                    @keyframes neuralSlideDown {
                        from {
                            opacity: 0;
                            transform: translateX(-50%) translateY(-30px) scale(0.8);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(-50%) translateY(0) scale(1);
                        }
                    }
                `;
                document.head.appendChild(styles);
            }

            document.body.appendChild(toast);
            console.log('Neural toast activated');

            // Auto remove neural toast
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(-50%) translateY(-30px) scale(0.8)';
                setTimeout(() => {
                    if (document.body.contains(toast)) {
                        document.body.removeChild(toast);
                    }
                }, 500);
            }, 4000);
        } catch (e) {
            console.error('Neural toast error:', e);
        }
    }

    initializeNeuralCharts() {
        console.log('Initializing neural data visualization');
        
        try {
            const neuralCtx = document.getElementById('neuralChart');
            if (neuralCtx && typeof Chart !== 'undefined') {
                this.charts.neural = new Chart(neuralCtx, {
                    type: 'line',
                    data: {
                        labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
                        datasets: [{
                            label: 'Neural Activity',
                            data: [85, 92, 78, 96, 89, 94, 87],
                            backgroundColor: 'rgba(0, 243, 255, 0.1)',
                            borderColor: '#00f3ff',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.4,
                            pointBackgroundColor: '#39ff14',
                            pointBorderColor: '#39ff14',
                            pointRadius: 5,
                            pointHoverRadius: 8,
                            pointBorderWidth: 2
                        }, {
                            label: 'Quantum Efficiency',
                            data: [78, 85, 92, 88, 95, 82, 91],
                            backgroundColor: 'rgba(57, 255, 20, 0.1)',
                            borderColor: '#39ff14',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.4,
                            pointBackgroundColor: '#bf00ff',
                            pointBorderColor: '#bf00ff',
                            pointRadius: 5,
                            pointHoverRadius: 8,
                            pointBorderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { 
                            legend: { 
                                display: true,
                                labels: {
                                    color: '#00f3ff',
                                    font: {
                                        family: 'Courier New, monospace',
                                        size: 11,
                                        weight: 'bold'
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 100,
                                grid: { 
                                    color: 'rgba(0, 243, 255, 0.2)',
                                    lineWidth: 1
                                },
                                ticks: { 
                                    color: '#00ffff',
                                    font: {
                                        family: 'Courier New, monospace',
                                        size: 10
                                    }
                                }
                            },
                            x: {
                                grid: { 
                                    color: 'rgba(0, 243, 255, 0.1)',
                                    lineWidth: 1
                                },
                                ticks: { 
                                    color: '#00ffff',
                                    font: {
                                        family: 'Courier New, monospace', 
                                        size: 10
                                    }
                                }
                            }
                        },
                        elements: {
                            point: {
                                hoverBackgroundColor: '#ffff00',
                                hoverBorderColor: '#ffff00'
                            }
                        }
                    }
                });
                console.log('Neural chart synchronized');
            }
        } catch (e) {
            console.error('Neural chart initialization error:', e);
        }
    }

    setupNeuralPWA() {
        try {
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                this.deferredPrompt = e;
                setTimeout(() => this.showInstallPrompt(), 15000);
            });

            window.addEventListener('appinstalled', () => {
                this.deferredPrompt = null;
                this.showNeuralToast('NEURAL INTERFACE INSTALLED', 'success');
            });

            // Handle install prompt interactions
            const installBtn = document.getElementById('install-btn');
            const installDismiss = document.getElementById('install-dismiss');
            
            if (installBtn) {
                installBtn.addEventListener('click', () => this.installNeuralPWA());
            }
            
            if (installDismiss) {
                installDismiss.addEventListener('click', () => this.dismissInstallPrompt());
            }
        } catch (e) {
            console.error('Neural PWA setup error:', e);
        }
    }

    showInstallPrompt() {
        if (this.deferredPrompt) {
            const installPrompt = document.getElementById('install-prompt');
            if (installPrompt) {
                installPrompt.classList.remove('hidden');
                this.showNeuralToast('NEURAL INTERFACE READY FOR INSTALLATION', 'info');
            }
        }
    }

    dismissInstallPrompt() {
        const installPrompt = document.getElementById('install-prompt');
        if (installPrompt) installPrompt.classList.add('hidden');
        this.showNeuralToast('INSTALLATION DEFERRED', 'info');
    }

    async installNeuralPWA() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            const choiceResult = await this.deferredPrompt.userChoice;
            
            if (choiceResult.outcome === 'accepted') {
                this.showNeuralToast('NEURAL INTERFACE INSTALLATION INITIATED', 'success');
            } else {
                this.showNeuralToast('INSTALLATION CANCELLED', 'info');
            }
            
            this.deferredPrompt = null;
            this.dismissInstallPrompt();
        }
    }
}

// Initialize neural interface when DOM is ready
function initializeNeuralInterface() {
    console.log('DOM ready - Initiating neural sync');
    
    try {
        window.cyberFixieApp = new CyberFixieApp();
        console.log('Neural interface instance created successfully');
    } catch (e) {
        console.error('Neural interface initialization error:', e);
        
        // Fallback activation
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            const mainApp = document.getElementById('main-app');
            
            if (loadingScreen && mainApp) {
                loadingScreen.classList.add('hidden');
                mainApp.classList.remove('hidden');
                console.log('Fallback: Neural interface activated directly');
            }
        }, 1200);
    }
}

// Multiple initialization vectors for neural sync
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNeuralInterface);
} else {
    // DOM already synchronized
    initializeNeuralInterface();
}

// Backup neural sync
window.addEventListener('load', () => {
    if (!window.cyberFixieApp) {
        console.log('Backup neural sync initiated');
        initializeNeuralInterface();
    }
});

// Network status neural monitoring
window.addEventListener('online', () => {
    if (window.cyberFixieApp) {
        window.cyberFixieApp.showNeuralToast('NETWORK CONNECTION RESTORED', 'success');
    }
});

window.addEventListener('offline', () => {
    if (window.cyberFixieApp) {
        window.cyberFixieApp.showNeuralToast('OFFLINE MODE ACTIVATED', 'info');
    }
});

// PWA detection
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
    console.log('Neural interface running in standalone mode');
    document.body.classList.add('neural-standalone');
}

// Neural error handling
window.addEventListener('error', (e) => {
    console.error('Neural system error:', e.error);
    if (window.cyberFixieApp) {
        window.cyberFixieApp.showNeuralToast('SYSTEM ERROR DETECTED', 'error');
    }
});

// Service worker neural sync
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(() => {
        console.log('Service Worker neural sync active');
        if (window.cyberFixieApp) {
            window.cyberFixieApp.showNeuralToast('BACKGROUND SYNC ACTIVE', 'success');
        }
    });
}

console.log('Neural Interface Script Loaded - READY FOR SYNC');