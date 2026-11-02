# Criteris de rendiment i privacitat (mòbil)

Base mesurada el 2/11/2026 a https://www.kodia.cat/ amb Lighthouse 12 (mòbil, simulació per defecte), 3 execucions:

| Execució | Rendiment | Accessibilitat | Bones pràctiques | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| 1 | 94 | 95 | 100 | 100 | 2,4 s | 0 | 0 ms |
| 2 | 96 | 95 | 100 | 100 | 2,3 s | 0 | 0 ms |
| 3 | 100 | 95 | 100 | 100 | 1,2 s | 0 | 0 ms |
| **Mediana** | **96** | **95** | **100** | **100** | **2,3 s** | **0** | **0 ms** |

## Criteris d'acceptació (vista prèvia de Vercel, mediana de 3 execucions en mòbil)
- Rendiment ≥ 96, accessibilitat ≥ 95, bones pràctiques = 100 i SEO = 100.
- LCP < 2,5 s, CLS < 0,1 i TBT ≤ 50 ms.
- Cap font web nova. Només es pot fer servir la Hanken Grotesk que ja és allotjada a /fonts (la que ja té preload), o fonts del sistema.
- Cap llibreria nova de JS o CSS: ni framework, ni carrusel, ni biblioteca d'animacions o d'icones. El JS de la portada ha de ser vanilla i amb defer.
- **Cap petició a fonts.googleapis.com ni a fonts.gstatic.com** a cap pàgina. S'ha de comprovar amb la pestanya Network i amb `grep -rn "fonts.googleapis\|fonts.gstatic" --include=*.html --include=*.css --include=*.js .`, que ha de tornar buit (fora de node_modules i docs/).
- Imatges: WebP, amb `width` i `height` (o `aspect-ratio`) a totes. La imatge del hero, que és l'LCP, va sense lazy i amb `fetchpriority="high"`. Totes les que queden sota el plec porten `loading="lazy"` i `decoding="async"`. Cal fer servir `srcset` amb les variants de 640 i 960 px de `assets/`.
- Sense scroll horitzontal a 360, 390 i 1440 px.
