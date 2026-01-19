# Guide de Test - Calendrier Lunaire Fezan

## 🧪 Exécution des Tests

### Lancer tous les tests
```bash
npm run test
```

### Mode watch (développement)
```bash
npm run test -- --watch
```

### Avec couverture de code
```bash
npm run test -- --coverage
```

### Tests spécifiques
```bash
# Tests astronomiques uniquement
npm run test astronomy.test.ts

# Tests des calculs
npm run test calculations.test.ts

# Tests Fezan
npm run test fezan.test.ts

# Tests jours interdits
npm run test forbiddenDays.test.ts
```

## 📋 Suites de Tests

### 1. Astronomy Tests (`astronomy.test.ts`)
Tests de l'algorithme de Meeus pour les calculs de phases lunaires.

**Tests clés :**
- Précision des nouvelles lunes (±2 heures)
- Calcul de la nouvelle lune précédente
- Calcul de la nouvelle lune suivante
- Génération des nouvelles lunes annuelles
- Gestion des limites d'années

**Dates de référence testées :**
- 29 janvier 2025 à 12:36 UTC
- 30 décembre 2025 à 22:27 UTC

### 2. Calculations Tests (`calculations.test.ts`)
Tests des calculs lunaires et de la logique métier.

**Tests clés :**
- Calcul du jour lunaire (1-30)
- Phases lunaires (8 phases)
- Détection nouvelle/pleine lune
- Informations complètes jour lunaire
- Génération mois/année
- Validation des entrées
- Fonctionnement du cache

### 3. Fezan Tests (`fezan.test.ts`)
Tests du cycle Fezan (9 jours).

**Tests clés :**
- Cycle de 9 jours correct
- Statut favorable/défavorable
- Répétition du cycle
- Descriptions et recommandations

### 4. Forbidden Days Tests (`forbiddenDays.test.ts`)
Tests des jours interdits et performance.

**Tests clés :**
- Identification des 45 jours interdits
- Lookup O(1) avec Set
- Performance (1000 lookups < 10ms)
- Raisons des jours interdits

## ✅ Résultats Attendus

Tous les tests doivent passer :
```
✓ src/services/lunar/__tests__/astronomy.test.ts (12 tests)
✓ src/services/lunar/__tests__/calculations.test.ts (18 tests)
✓ src/services/lunar/__tests__/fezan.test.ts (8 tests)
✓ src/services/lunar/__tests__/forbiddenDays.test.ts (8 tests)

Test Files  4 passed (4)
     Tests  46 passed (46)
```

## 🐛 Debugging Tests

### Voir les détails d'un test qui échoue
```bash
npm run test -- --reporter=verbose
```

### Exécuter un seul test
```typescript
it.only('should find the new moon of January 2025', () => {
  // Ce test sera le seul exécuté
});
```

### Ignorer un test temporairement
```typescript
it.skip('test à ignorer', () => {
  // Ce test sera ignoré
});
```

## 📊 Couverture de Code

Objectifs de couverture :
- **Statements:** 90%+
- **Branches:** 85%+
- **Functions:** 90%+
- **Lines:** 90%+

Modules critiques avec couverture 100% :
- `astronomy/moonPhases.ts`
- `validation.ts`
- `cache.ts`
- `fezan.ts`

## 🔍 Tests Manuels Recommandés

### 1. Test de Précision Astronomique
Vérifier avec des sources externes :
- [timeanddate.com](https://www.timeanddate.com/moon/phases/)
- [NASA Moon Phase Calendar](https://svs.gsfc.nasa.gov/4955)

### 2. Test de Performance
```typescript
// Dans la console du navigateur
console.time('month-load');
// Naviguer vers un mois
console.timeEnd('month-load');
// Devrait être < 50ms avec cache
```

### 3. Test d'Accessibilité
- Navigation au clavier (←, →, Home, T)
- Lecteur d'écran (NVDA, JAWS)
- Contraste des couleurs (WCAG AA)

### 4. Test de Robustesse
```typescript
// Tester dates limites
getLunarDayInfo(new Date('1900-01-01')); // OK
getLunarDayInfo(new Date('2100-12-31')); // OK
getLunarDayInfo(new Date('1899-12-31')); // Erreur attendue
getLunarDayInfo(new Date('2101-01-01')); // Erreur attendue
```

## 🚨 Tests de Régression

Dates critiques à vérifier après modifications :
```typescript
const regressionDates = [
  { date: '2025-01-29', lunarDay: 1, fezan: 'Mêdjo' },
  { date: '2025-02-15', lunarDay: 18, fezan: 'Mêdjo' },
  { date: '2025-06-20', lunarDay: 26, fezan: 'Akoue' },
  { date: '2025-12-30', lunarDay: 1, fezan: 'Mêdjo' },
];
```

## 📝 Ajouter de Nouveaux Tests

### Template de test
```typescript
import { describe, it, expect } from 'vitest';
import { maFonction } from '../monModule';

describe('Mon Module', () => {
  describe('maFonction', () => {
    it('should do something', () => {
      const result = maFonction(input);
      expect(result).toBe(expected);
    });

    it('should handle edge cases', () => {
      expect(() => maFonction(invalid)).toThrow();
    });
  });
});
```

## 🔧 Configuration Vitest

Fichier : `vitest.config.ts` (à créer si nécessaire)
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.test.ts',
        '**/*.spec.ts',
      ],
    },
  },
});
```

## 📚 Ressources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Jean Meeus - Astronomical Algorithms](https://www.willbell.com/math/MC1.HTM)

---

**Note :** Les tests sont essentiels pour garantir la fiabilité du calendrier lunaire. Exécutez-les avant chaque commit et après chaque modification importante.
