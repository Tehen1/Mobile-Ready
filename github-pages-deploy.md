# 🚀 Guide de déploiement FixieRun PWA sur GitHub Pages

## 1. Préparation du repository

```bash
# Créer un nouveau repo GitHub
git init
git add .
git commit -m "Initial commit: FixieRun PWA"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/fixierun-pwa.git
git push -u origin main
```

## 2. Structure des fichiers pour GitHub Pages

```
fixierun-pwa/
├── index.html          # Point d'entrée
├── style.css          # Styles Tailwind + custom
├── app.js             # Logique application
├── sw.js              # Service Worker (auto-généré)
├── manifest.json      # PWA manifest (inline dans HTML)
└── README.md          # Documentation
```

## 3. Configuration GitHub Pages

1. **Aller dans Settings → Pages**
2. **Source** : Deploy from a branch
3. **Branch** : main / (root)
4. **Save**

L'URL sera : `https://VOTRE_USERNAME.github.io/fixierun-pwa/`

## 4. Optimisations spécifiques GitHub Pages

### 4.1 Paths absolus → relatifs
```javascript
// Dans app.js, vérifier que tous les assets utilisent des paths relatifs
// ✅ Correct
src="./style.css"
// ❌ Éviter  
src="/style.css"
```

### 4.2 Service Worker cache
Le SW est configuré pour :
- Cache statique des assets (HTML, CSS, JS)
- Cache dynamique des API calls (mock)
- Stratégie offline-first
- Mise à jour automatique

### 4.3 Manifest PWA
```json
{
  "start_url": "./",        // Path relatif
  "scope": "./",            // Scope relatif
  "display": "standalone"
}
```

## 5. Tests post-déploiement

### 5.1 PWA Installation
- **Chrome/Edge** : Icône "+" dans l'URL bar
- **Safari iOS** : Partage → Ajouter à l'écran d'accueil
- **Android** : Menu → Installer l'app

### 5.2 Performance
```bash
# Tests Lighthouse CI
npm install -g lighthouse
lighthouse https://VOTRE_USERNAME.github.io/fixierun-pwa/ --output html
```

### 5.3 Fonctionnalités offline
1. Ouvrir l'app en ligne
2. DevTools → Network → Offline
3. Recharger → L'app doit fonctionner

## 6. Mise à jour continue

### 6.1 Auto-déploiement
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

### 6.2 Versioning du cache
Modifier `CACHE_VERSION` dans le service worker à chaque update.

## 7. Analytics & Monitoring

### 7.1 Google Analytics (optionnel)
```javascript
// Ajouter dans <head>
gtag('config', 'GA_MEASUREMENT_ID', {
  custom_map: {
    'custom_parameter': 'workout_type'
  }
});
```

### 7.2 Performance monitoring
```javascript
// Dans app.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log('SW registered'))
    .catch(() => console.log('SW failed'));
}
```

## 8. Sécurité

### 8.1 Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

### 8.2 HTTPS obligatoire
GitHub Pages utilise automatiquement HTTPS, requis pour PWA.

## ✅ Checklist final

- [ ] Repository GitHub créé et configuré
- [ ] GitHub Pages activé (Settings → Pages)
- [ ] App accessible via https://USERNAME.github.io/fixierun-pwa/
- [ ] Installation PWA fonctionnelle (mobile + desktop)
- [ ] Mode offline testé et validé  
- [ ] Core Web Vitals > 90 (test Lighthouse)
- [ ] Responsive design validé (mobile/tablet/desktop)
- [ ] Thème sombre/clair fonctionnel
- [ ] Navigation entre sections fluide
- [ ] Mock data affichée correctement

**🎯 Temps estimé de déploiement : 5-10 minutes**