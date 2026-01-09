# Charte Graphique — Lunar Calendar

## Philosophie

L'interface s'inspire des cycles lunaires : **mystérieuse en mode sombre** (nuit étoilée), **lumineuse en mode clair** (jour de pleine lune).

---

## Palette de Couleurs

### Mode Sombre (Dark)

| Rôle | Couleur | Hex | Usage |
|------|---------|-----|-------|
| **Background** | Noir profond | `#0a0a0f` | Fond principal |
| **Surface** | Gris nuit | `#1a1a2e` | Cartes, modales |
| **Surface élevée** | Gris ardoise | `#252540` | Éléments surélevés |
| **Texte principal** | Blanc lunaire | `#f0f0f5` | Titres, texte important |
| **Texte secondaire** | Gris argenté | `#a0a0b0` | Descriptions, labels |
| **Accent primaire** | Or lunaire | `#d4a853` | Actions principales, liens |
| **Accent secondaire** | Violet mystique | `#8b5cf6` | Éléments Vodoun/Fâ |
| **Favorable** | Vert émeraude | `#10b981` | Jours favorables |
| **Défavorable** | Rouge corail | `#ef4444` | Jours défavorables |
| **Neutre** | Bleu acier | `#64748b` | Jours neutres |

### Mode Clair (Light)

| Rôle | Couleur | Hex | Usage |
|------|---------|-----|-------|
| **Background** | Blanc crème | `#faf9f7` | Fond principal |
| **Surface** | Gris perle | `#f0efe8` | Cartes, modales |
| **Surface élevée** | Blanc pur | `#ffffff` | Éléments surélevés |
| **Texte principal** | Noir encre | `#1a1a2e` | Titres, texte important |
| **Texte secondaire** | Gris charbon | `#4a4a5a` | Descriptions, labels |
| **Accent primaire** | Or antique | `#b8860b` | Actions principales, liens |
| **Accent secondaire** | Violet profond | `#7c3aed` | Éléments Vodoun/Fâ |
| **Favorable** | Vert forêt | `#059669` | Jours favorables |
| **Défavorable** | Rouge brique | `#dc2626` | Jours défavorables |
| **Neutre** | Gris ardoise | `#475569` | Jours neutres |

---

## Couleurs des Directions (Pôles)

Chaque direction cardinale a une couleur distinctive :

| Direction | Couleur | Hex (Dark) | Hex (Light) |
|-----------|---------|------------|-------------|
| **Nord** | Bleu glacier | `#38bdf8` | `#0284c7` |
| **Nord-Est** | Cyan | `#22d3d1` | `#0891b2` |
| **Est** | Orange aurore | `#fb923c` | `#ea580c` |
| **Sud-Est** | Rose corail | `#f472b6` | `#db2777` |
| **Sud** | Rouge soleil | `#f87171` | `#dc2626` |
| **Sud-Ouest** | Violet crépuscule | `#a78bfa` | `#7c3aed` |
| **Ouest** | Indigo nuit | `#818cf8` | `#4f46e5` |
| **Nord-Ouest** | Vert forêt | `#4ade80` | `#16a34a` |

---

## Typographie

| Élément | Police | Taille | Poids |
|---------|--------|--------|-------|
| **H1** | Inter | 2.5rem (40px) | 700 (Bold) |
| **H2** | Inter | 1.875rem (30px) | 600 (Semibold) |
| **H3** | Inter | 1.25rem (20px) | 600 (Semibold) |
| **Body** | Inter | 1rem (16px) | 400 (Regular) |
| **Small** | Inter | 0.875rem (14px) | 400 (Regular) |
| **Caption** | Inter | 0.75rem (12px) | 500 (Medium) |
| **Jour lunaire** | JetBrains Mono | 1.5rem (24px) | 700 (Bold) |

---

## Espacements

Basé sur une échelle de 4px :

| Token | Valeur |
|-------|--------|
| `xs` | 4px |
| `sm` | 8px |
| `md` | 16px |
| `lg` | 24px |
| `xl` | 32px |
| `2xl` | 48px |
| `3xl` | 64px |

---

## Rayons de bordure

| Token | Valeur | Usage |
|-------|--------|-------|
| `sm` | 4px | Badges, petits éléments |
| `md` | 8px | Boutons, inputs |
| `lg` | 12px | Cartes |
| `xl` | 16px | Modales |
| `full` | 9999px | Avatars, indicateurs ronds |

---

## Ombres

### Mode Sombre
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.5);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.3);
--shadow-glow: 0 0 20px rgba(212, 168, 83, 0.3);
```

### Mode Clair
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-glow: 0 0 20px rgba(184, 134, 11, 0.2);
```

---

## Icônes des Phases Lunaires

| Phase | Symbole | Unicode |
|-------|---------|---------|
| Nouvelle lune | 🌑 | U+1F311 |
| Premier croissant | 🌒 | U+1F312 |
| Premier quartier | 🌓 | U+1F313 |
| Gibbeuse croissante | 🌔 | U+1F314 |
| Pleine lune | 🌕 | U+1F315 |
| Gibbeuse décroissante | 🌖 | U+1F316 |
| Dernier quartier | 🌗 | U+1F317 |
| Dernier croissant | 🌘 | U+1F318 |

---

## Animations

| Animation | Durée | Easing |
|-----------|-------|--------|
| Hover | 150ms | ease-out |
| Transition page | 300ms | ease-in-out |
| Apparition modale | 200ms | ease-out |
| Pulse (nouvelle lune) | 2s | ease-in-out (infinite) |
