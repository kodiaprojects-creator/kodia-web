# Redisseny de la portada de kodia.cat: material per a Cursor

## Què hi ha aquí
- `maqueta-referencia.html`: la maqueta aprovada. És autocontinguda (les imatges hi van incrustades) i serveix **només com a guia visual**, no s'ha d'enganxar.
- `captures/`: com ha de quedar la maqueta a 1440x900 (escriptori) i 390x844 (mòbil), tant la primera pantalla com la pàgina sencera.
- `assets/`: les captures reals dels projectes en WebP, amb la mida al nom.
- `content.json`: tots els textos definitius. Allò que porta `"publicar": false` encara està pendent i no pot sortir publicat.
- `legal/`: textos legals i del formulari, d'en Jimmy. No els toquis.
- `rendiment.md`: la base de Lighthouse i els criteris de rendiment i privacitat.
- `prompt-cursor.md`: el prompt per enganxar a Cursor.

## Com fer-ho servir
1. Al repositori de kodia.cat, crea la carpeta `docs/redisseny/` i copia-hi **tota** aquesta carpeta (o almenys `maqueta-referencia.html`, `captures/`, `assets/`, `content.json`, `legal/` i `rendiment.md`). `docs/` no és a la llista `content` de Tailwind, així que no afecta el CSS. Com que Vercel publica l'arrel del repositori (`outputDirectory: "."`), el prompt també afegeix `docs/` a `.vercelignore` perquè no es publiqui.
2. Obre el repositori a Cursor en mode Agent i enganxa-hi el contingut de `prompt-cursor.md`.
3. Cursor treballarà per fases i s'aturarà dues vegades: primer, després de resumir el repositori, i al final, amb la vista prèvia de Vercel. **No fusionis res a `main`** fins que hagis revisat la vista prèvia i rebut el correu de prova.
4. La política de privacitat ja és completa (Gmail i la gestoria). El text de protecció de dades sota el formulari diu «Responsable: Enric Corominas Gratacós (Kodia)», i l'Enric ho accepta perquè és un requisit legal.
