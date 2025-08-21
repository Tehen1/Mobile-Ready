# 🚀 FixieRun Cyberpunk PWA - Style Guide & Modifications

## 🎯 Transformation Cyberpunk Implémentée

L'application FixieRun a été entièrement retravaillée avec un **design cyberpunk/blockchain** inspiré de votre landing page https://fixie.run

### ⚡ Palette de Couleurs Cyberpunk
```css
:root {
  --neon-blue: #00f3ff;        /* Electric Blue */
  --neon-green: #39ff14;       /* Neon Green */
  --neon-purple: #bf00ff;      /* Purple Neon */
  --electric-cyan: #00ffff;    /* Electric Cyan */
  --cyber-black: #0a0a0a;      /* Deep Black */
  --matrix-green: #00ff41;     /* Matrix Green */
  --hot-pink: #ff0080;         /* Hot Pink */
  --cyber-yellow: #ffff00;     /* Neon Yellow */
}
```

### 🔥 Effets Visuels Cyberpunk

#### 1. Glow Effects
- **Text Glow** : `text-shadow: 0 0 10px var(--neon-blue)`
- **Border Glow** : `box-shadow: 0 0 15px var(--neon-green)`  
- **Button Glow** : Intensité croissante au hover
- **Card Glow** : Borders néon avec animation pulse

#### 2. Background Matrix
- **Grid Pattern** : Grille cyberpunk subtile
- **Animated Lines** : Lignes de connexion flottantes
- **Gradient Overlays** : Dégradés électriques

#### 3. Typography Futuriste
- **Font** : `'Orbitron', 'Roboto Mono', monospace`
- **Titles** : UPPERCASE avec lettres espacées
- **Text Effects** : Typewriter, glitch, pulse
- **Gradients** : Textes avec dégradés néon

### 🎮 Nomenclature Cyberpunk

#### Interface Elements
- **Dashboard** → `QUANTUM DASHBOARD`
- **Workouts** → `TRAINING PROTOCOLS`
- **DeFi** → `BLOCKCHAIN MATRIX`
- **Analytics** → `DATA NEXUS`
- **Rewards** → `CYBER MARKETPLACE`
- **Profile** → `NEURAL INTERFACE`

#### User Data
- **Username** → `CYBER.RUNNER`
- **User ID** → `NEURAL_NODE_7847`
- **Steps** → `QUANTUM MILES`
- **Tokens** → `NEURAL_TOKENS`
- **Status** → `ONLINE | ACTIVE | SYNCED`

#### Workout Types
- **Running** → `NEURAL SPRINT`
- **Walking** → `QUANTUM CRUISE`
- **Cycling** → `MATRIX OVERRIDE`
- **Status** → `VERIFIED | SYNCED | PROCESSING`

### 🔧 Animations Cyberpunk

#### 1. Entrance Animations
```css
@keyframes neuralSync {
  0% { opacity: 0; transform: translateY(20px) scale(0.9); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
```

#### 2. Glow Pulse
```css
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 5px var(--neon-blue); }
  50% { box-shadow: 0 0 20px var(--neon-blue), 0 0 30px var(--neon-blue); }
}
```

#### 3. Rotating Borders
```css
@keyframes rotateBorder {
  0% { border-image: linear-gradient(0deg, var(--neon-green), transparent) 1; }
  100% { border-image: linear-gradient(360deg, var(--neon-green), transparent) 1; }
}
```

### 📱 Components Cyberpunk

#### 1. Neural Cards
- Background sombre avec opacity
- Border néon animé
- Hover effects avec scaling
- Glow intensifié au focus

#### 2. Quantum Buttons
- Gradient backgrounds
- Text glow effect
- Pulse animation
- Sound feedback (optionnel)

#### 3. Matrix Navigation
- Bottom nav avec icônes stylisées
- Active state avec underline néon
- Smooth transitions
- Glowing indicators

#### 4. Cyber Stats Display
- Counter animations avec typewriter
- Progress bars néon
- Real-time updates
- Neural sync indicators

### 🎨 Loading & Transitions

#### Neural Sync Loading
```
[████████████████████████] 100%
NEURAL INTERFACE ACTIVATED
BLOCKCHAIN SYNCHRONIZATION COMPLETE
QUANTUM PROTOCOLS INITIALIZED
```

#### Page Transitions
- Slide avec trailing effect
- Fade avec matrix overlay
- Scale avec glow burst
- Typewriter pour les titres

### 💎 Branding Elements

#### Logo Cyberpunk
- **FixieRun** avec effet néon
- Sous-titre : `NEURAL INTERFACE v2.0`
- Tagline : `RIDE • EARN • EVOLVE`

#### Status Indicators
- `🔵 NEURAL_SYNC_ACTIVE`
- `🟢 BLOCKCHAIN_CONNECTED`
- `⚡ QUANTUM_PROTOCOLS_ONLINE`
- `💜 REWARD_SYSTEM_ACTIVE`

### 🚀 Fonctionnalités Avancées

#### 1. Neural Feedback
- Vibration au tap (mobile)
- Sound effects cyberpunk
- Visual feedback néon
- Success animations

#### 2. Adaptive Interface
- Auto-adjust glow intensity
- Battery-optimized animations
- Performance monitoring
- Graceful degradation

#### 3. Data Visualization
- Charts avec couleurs néon
- Real-time updates
- Matrix-style numbers
- Holographic effects

### 📊 Performance Cyberpunk

#### Optimizations
- CSS Hardware Acceleration
- Efficient animations
- Lazy loading effects
- Progressive enhancement

#### Accessibility
- High contrast néon/dark
- Keyboard navigation
- Screen reader compatible
- Reduced motion support

## 🎯 Résultat Final

L'app **FixieRun Cyberpunk** offre maintenant :
- ✅ Design totalement cyberpunk/blockchain
- ✅ Effets visuels néon immersifs
- ✅ Animations fluides et futuristes
- ✅ Nomenclature technique cohérente
- ✅ Performance optimisée
- ✅ Compatible PWA

**Style parfaitement aligné** avec votre landing page https://fixie.run ! 🔥