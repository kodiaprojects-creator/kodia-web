# KODIA v12 · revisió visual anterior a la correcció d’arquitectura

> Aquesta revisió es va fer quan la demo tenia vuit rutes. Després s’ha eliminat la pàgina autònoma de manteniment i s’han canviat els textos SEO de Disseny web i SEO. El renderitzat de les dues pàgines afectades s’ha de tornar a revisar.

## Direcció aplicada

S’ha reforçat el caràcter editorial de la demo amb carbó i perla com a superfícies principals, taronja per a accents, i blocs puntuals en argila/sàlvia. Les set pàgines interiors comparteixen una hero carbó amb composició i il·lustració pròpies; la portada conserva la fotografia aprovada de v10. S’han alternat fons i proporcions de seccions per donar ritme sense alterar arquitectura, URL, jerarquia SEO ni contingut factual.

Les peces gràfiques abstractes són il·lustracions de concepte, no casos, resultats, clients ni campanyes. A la pàgina de disseny web s’utilitza una fotografia d’estoc amb atribució a `assets/ATTRIBUTIONS.md`; no representa un projecte KODIA. La fotografia de portada prové de la demo v10 i continua sent conceptual/provisional segons les notes de v10.

## Canvis i comprovacions per pàgina

- **Inici (`/`)** — Es conserva la hero fotogràfica de v10; la secció de serveis guanya una superfície argila i files més llegibles; s’afegeix una tira visual de tres conceptes en carbó, clarament marcada com a mostra. Comprovat: enllaços a serveis/projectes i amplada a mòbil i tauleta.
- **Disseny web (`/serveis/disseny-web/`)** — Hero carbó a tres zones amb foto d’estoc acreditada; les seccions de preus i preguntes freqüents passen a carbó per crear un punt focal. Comprovat: text d’imatge, CTA, estructura i rótuls de preu; cap preu ni termini editat.
- **Manteniment web (`/serveis/manteniment-web/`)** — Hero amb esquema tipogràfic de serveis inclosos, marcat com a concepte; secció d’informació fosca i targetes alternades. Comprovat: llegibilitat, responsive i text comercial; imports/condicions preservats.
- **Xarxes socials (`/serveis/xarxes-socials/`)** — Hero visual amb composició tipogràfica i accent taronja, sense mostrar una campanya; targetes i avís amb fons alternats. Comprovat: ruta, H1 i contingut existent; no s’han afegit resultats ni promeses.
- **Posicionament SEO (`/serveis/posicionament-seo/`)** — Hero amb flux conceptual d’estructura → contingut → tècnica i superfícies alternades. Comprovat: ruta, H1 i contingut; no s’han afegit promeses de posicionament.
- **Projectes (`/projectes/`)** — Hero amb tres fitxes etiquetades com a conceptes; àrea de projectes en carbó per donar més presència a les mostres abstractes. Comprovat: avisos que les mostres no són casos reals i contrast de textos/enllaços.
- **KODIA / agència (`/agencia/`)** — Hero taronja/carbó amb els quatre principis verbals del brandbook i targetes en ritme asimètric. Comprovat: paraules i jerarquia; no s’han afegit credencials ni dades d’equip.
- **Contacte (`/contacte/`)** — Hero carbó amb etiquetes de serveis, CTA i panell de contacte destacat. Comprovat: el formulari continua sent una demostració i no envia missatges; contingut i destí de CTA preservats.

## Comprovacions transversals

- Les vuit pàgines es van obrir a mòbil (375 px) i tauleta (768 px): sense desbordament horitzontal, imatges trencades ni més d’un H1 per pàgina. S’han fet comprovacions visuals d’escriptori a les vuit rutes.
- Menú mòbil: estat obert amb contrast fosc/perla, `aria-expanded` actualitzat i tancament amb Escape.
- `prefers-reduced-motion`: activat durant la revisió; el contingut continua visible i el desplaçament suau/transicions es desactiven.
- Els estils de focus visibles i el salt de navegació existents es mantenen.
- L’anàlisi estàtica `impeccable detect --json` ha trobat avisos previs i actuals de text petit, text en majúscules, espaiat i padding en alguns blocs. S’han pujat a 11 px les etiquetes visuals noves. Cal una passada manual de contrast i teclat abans de producció; el detector és heurístic i no substitueix una auditoria WCAG.
- No s’ha modificat el web públic ni s’ha publicat res.

## Pendents de validar

1. Aprovar les dues fotografies/conceptes de la portada i la pàgina de disseny web per a la versió final; substituir la fotografia conceptual de portada per una imatge real autoritzada si n’hi ha.
2. Confirmar si les il·lustracions abstractes de xarxes, SEO, manteniment i projectes comuniquen bé cada servei, o substituir-les per captures pròpies amb permís.
3. Revisar copy, abast i claims dels serveis de xarxes socials i SEO amb el responsable de contingut; aquesta passada només n’ha canviat la presentació visual.
4. Fer verificació manual de teclat, lector de pantalla i contrast amb la implementació final, incloent la navegació en escriptori/mòbil real.
5. Confirmar formulari/contacte i tots els enllaços abans de qualsevol publicació; la demo no envia missatges.

## Fitxers

- `assets/styles.css`: sistema visual i responsive de la passada.
- `assets/ATTRIBUTIONS.md`: font i llicència de la fotografia d’estoc i estat dels conceptes.
- HTML de cada pàgina: etiqueta `data-page` i composició visual específica.
