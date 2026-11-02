# Prompt per a Cursor: reestil de les pàgines interiors i pàgines SEO noves de kodia.cat

**Abans d'enganxar-lo:**
1. Copia `PLA.md`, `estudi-preu-web-a-mida.md`, aquest fitxer i la carpeta `copy/` (la carpeta `live/` no cal) al repositori, a `docs/pagines/` (al costat de `docs/redisseny/`, que ja hi és de la portada). `docs/` ja és a `.vercelignore`.
2. Les decisions ja estan aplicades al copy (vegeu `docs/pagines/PLA.md` §8). No cal omplir res.
3. **No fusionis `redisseny-portada` a `main` pel teu compte:** la portada es publica a la vegada que la resta (D11).
4. Obre el repositori a Cursor en mode Agent i enganxa des de la línia `---`.

---

Treballem al repositori estàtic de kodia.cat (HTML + Tailwind CLI, publicat a Vercel amb `outputDirectory: "."`). La portada nova ja està feta a la branca `redisseny-portada` amb un sistema de disseny nou. Ara cal (fase 1) ajustar uns textos de la portada i passar les 7 pàgines interiors a aquest sistema, i (fase 2) crear 6 pàgines noves de SEO. **Tot es publicarà junt** (portada + fase 1 + fase 2) en un sol merge, que farà l'Enric quan tot estigui fet i revisat. Treballa per fases, atura't només on t'ho indico, i no fusionis res a `main` ni publiquis res a producció. `redisseny-portada` tampoc es fusiona per separat.

## Material de referència
- `docs/redisseny/`: el material de la portada. **El sistema de disseny és el de la portada tal com ha quedat implementada a `redisseny-portada`** (components, colors `paper/card/line/mut/ink2/or2/ok` a `tailwind.config.js`, tipografia, capçalera, peu, tiquet, bloc fosc, casos, plans, procés, FAQ amb `<details>`, formulari). Referències visuals: `docs/redisseny/captures/` i `docs/redisseny/maqueta-referencia.html` (només guia visual, no s'enganxa). Textos de la portada: `docs/redisseny/content.json`. Textos legals: `docs/redisseny/legal/` (no es reescriuen). Criteris de rendiment: `docs/redisseny/rendiment.md`.
- `docs/pagines/PLA.md`: el pla complet (mapa del web, title/description/H1 de cada pàgina, enllaços interns, schema, sitemap, redireccions).
- `docs/pagines/copy/portada-ajustos.md`: els textos de la portada que canvien (termini, manteniment opcional, petits canvis).
- `docs/pagines/copy/existents.md`: els canvis de text de les pàgines existents.
- `docs/pagines/copy/*.md` (la resta): **el copy final** de les 6 pàgines noves. Fes servir els textos exactes. Cada fitxer té al capdamunt `url`, `title`, `description` i `h1`.
- Comentaris `<!-- … -->` dels fitxers de copy: són instruccions per a tu, no es publiquen.

## Regles que no es poden trencar
1. **Tot en català.** Cap pàgina ni text en castellà.
2. **L'Enric no surt enlloc** (ni nom ni foto), excepte a l'avís legal i al paràgraf «Protecció de dades» del formulari, que es copien literals de `docs/redisseny/legal/`.
3. **Res de telèfon, WhatsApp, xarxes socials ni `href="#"`** a la web de Kodia. (Quan el copy parla del telèfon «a la teva web», és la web del client: no és un enllaç.)
4. **Contacte:** `info@kodia.cat` amb la mateixa constant que la portada (`config.emailContacte`). Fora qualsevol `hola@kodia.cat` (HTML, JSON-LD i `js/`).
5. **Preus (sense IVA):** One Page 300 € · Corporativa 600 € · web a mida des de 900 €. **Manteniment opcional:** One Page 20 €/mes, Essencial 30 €/mes, Creixement 45 €/mes. Tots inclouen domini, allotjament, incidències i **fins a 3 petits canvis al mes**; Creixement hi afegeix SEO local (cada mes, revisió de Search Console i ajust dels títols i textos d'una pàgina) i informe mensual (mai «canvis cada mes» com a avantatge del Creixement). Els petits canvis no fets un mes no s'acumulen; només es diu a `/manteniment-web/` i a la FAQ de `/preus-pagina-web/`. Termini: 7–10 dies (One Page), unes dues setmanes (Corporativa). Resposta en 1 dia laborable. Fora «Preu habitual 450 €», «Oferta actual» i les quotes velles (15 €, des de 25 €, des de 40 €).
5b. **Reunions:** només «videotrucada o trucada, la concertem per correu». Cap reunió presencial, cap número de telèfon. **No es mantenen webs fetes per altres.**
6. **No t'inventis res:** ni xifres, ni testimonis, ni clients, ni anys d'experiència, ni ressenyes, ni resultats de Vetfar o Eleus. El testimoni de la portada continua desactivat. L'únic resultat publicable és Nivell A: «Lighthouse mòbil (landing d'anuncis): de 79 a més de 90». No es fan botigues en línia ni s'ofereixen.
7. **Formularis:** el mateix enviament que ara (`/api/contact`, payload i `formType` actuals). **No toquis `api/contact.js`, les variables d'entorn ni els destinataris.** Si alguna cosa no encaixa, atura't i pregunta.
8. **Cap URL existent canvia.** Cap font web, cap llibreria nova, cap analítica, cap bàner de galetes.
9. Un commit per tasca, amb missatges clars.

## Fase 0: preparació (i atura't)
1. Crea la branca `pagines-interiors` a partir de `redisseny-portada`. Aquesta branca contindrà **tot** el que es publica (portada + interiors + noves). Si `redisseny-portada` rep algun commit mentre treballes, el fusiones a `pagines-interiors` (mai al revés ni a `main`).
2. Resum curt: com estan fets ara la capçalera, el peu i els components de la portada (copiats a cada HTML o parcials), i quins són reutilitzables tal qual a les interiors.
3. Llista, per a cada una de les 7 pàgines interiors, les seccions actuals i el component de la portada que faràs servir per a cadascuna.
4. Confirma que a totes les pàgines ja no hi ha Material Symbols ni cap petició a Google Fonts (ho feia el prompt de la portada). Si en queda cap, digues-m'ho.
5. **Atura't i espera el meu «endavant».**

## Fase 1: ajustos de la portada i reestil de les 7 pàgines existents
Primer de tot (un commit): aplica a `content.json` i a l'HTML de la portada **exactament** els canvis de `docs/pagines/copy/portada-ajustos.md` (termini publicat, manteniment opcional, 3 petits canvis al mes, Creixement sense «canvis cada mes»). Si el JSON-LD `FAQPage` de la portada reflecteix aquestes preguntes, actualitza'l igual.

Pàgines: `/web-one-page/`, `/web-corporativa/`, `/web-a-mida/`, `/preus-pagina-web/`, `/projectes/`, `/revisio-digital/`, `/contacte/`.

Per a cada pàgina (un commit per pàgina):
- Aplica el sistema de la portada: fons paper, capçalera i peu nous, hero amb eyebrow + H1 + lead + CTA (sense imatge si no n'hi ha cap de real; mai il·lustracions genèriques), seccions amb `<h2>`, FAQ amb `<details>`/`<summary>`, CTA final cap a `/contacte/`. Reutilitza components; res de CSS en línia gegant.
- Aplica **exactament** els canvis de text, title, description, H1, preus i FAQ de `docs/pagines/copy/existents.md`. El que no s'esmenta allà es manté, passat a primera persona del singular.
- Preus: reutilitza el component de plans de la portada (One Page clar / Corporativa fosc amb selector de manteniment) a `/web-one-page/`, `/web-corporativa/`, `/preus-pagina-web/`. A `/web-a-mida/`, el preu amb poc pes.
- `/projectes/`: el patró «Feines fetes» de la portada (1 cas gran + 2 secundaris) amb les imatges WebP de `images/projectes/`. Fora els filtres.
- `/contacte/`: el formulari de 4 camps de la portada (mateix component i mateix JS), amb la casella de privacitat i la informació bàsica literals.
- `/revisio-digital/`: es mantenen els camps i el `formType` actuals, però s'hi afegeixen la casella `privacitat` (required, sense marcar) i la informació bàsica literals, amb la mateixa validació i els mateixos estats (errors per camp, «Enviant…», confirmació, error sense esborrar) que la portada.
- Afegeix el **fil d'Ariadna** visible («Inici › …») i el JSON-LD de cada pàgina segons `PLA.md` §5 (`Service`/`WebPage`/`ContactPage`/`CollectionPage` + `BreadcrumbList`, `provider` → `https://www.kodia.cat/#business`, ofertes amb els preus nous i `valueAddedTaxIncluded: false`). Si hi ha `FAQPage`, ha de coincidir exactament amb el text visible.
- **Portada (a més dels ajustos de copy):** (a) el JSON-LD de `#business` segons `PLA.md` §5 (`email` info@kodia.cat, `addressLocality` Banyoles, `postalCode` 17820, `addressRegion` Girona, sense `streetAddress`, `areaServed` nou, `knowsLanguage` `ca`, sense `priceRange` «€€»); (b) els enllaços del lead del hero a `/web-per-a-oficis/` i `/web-per-a-comercos/` **només quan aquestes pàgines existeixin** (fase 2).
- **Peu compartit:** les columnes de `PLA.md` §4. Els enllaços a pàgines que encara no existeixen s'afegeixen a la fase 2.

En acabar la fase 1, **no t'aturis**: passa directament a la fase 2. Res es publica fins al final.

## Fase 2: 6 pàgines noves
Crea, una per commit, en aquest ordre:

| # | Ruta | Fitxer de copy |
|---|---|---|
| 1 | `/web-per-a-oficis/` | `copy/web-per-a-oficis.md` |
| 2 | `/web-per-a-comercos/` | `copy/web-per-a-comercos.md` |
| 3 | `/disseny-web-banyoles/` | `copy/disseny-web-banyoles.md` |
| 4 | `/disseny-web-girona/` | `copy/disseny-web-girona.md` |
| 5 | `/web-per-a-autonoms/` | `copy/web-per-a-autonoms.md` |
| 6 | `/manteniment-web/` | `copy/manteniment-web.md` |

Per a cada pàgina:
- Carpeta amb `index.html`, afegida al `content` de `tailwind.config.js`.
- `<head>` com la resta: `lang="ca"`, title i description del fitxer de copy, canonical absolut amb barra final, `og:*` (amb `og:image` `/images/og-kodia.jpg`, `og:locale` `ca_ES`, `og:url` = canonical), `twitter:card`.
- Copy **literal** del fitxer. Un sol `<h1>`; els `##` són `<h2>`; les llistes, llistes; els enllaços, enllaços interns relatius amb barra final. El «Eyebrow» és l'eyebrow del hero. El bloc de preus de `/manteniment-web/` fa servir el component de plans de la portada.
- Composició: varia l'ordre visual dels components perquè no semblin 6 pàgines iguals (per exemple, el bloc fosc «Una sola persona» només en una o dues; la llista «Què ha de tenir la web» com a «albarà» amb línies discontínues a oficis; la llista de municipis com a bloc propi a Banyoles). No afegeixis text nou.
- Imatges: només les reals de `images/projectes/` (per exemple, Nivell A a `/disseny-web-girona/` i `/manteniment-web/`, al costat de la frase del Lighthouse). Cap foto d'estoc ni il·lustració. Si una pàgina no necessita imatge, millor sense.
- JSON-LD segons `PLA.md` §5: `Service` (a les de zona, `areaServed` la ciutat i la comarca), `BreadcrumbList`, `provider` → `#business`. **Cap `LocalBusiness` nou** per ciutat.
- Bloc CTA final cap a `/contacte/` (sense formulari).

En acabar les 6:
- **Peu:** afegeix Per a qui (Autònoms, Comerços, Oficis), Zones (Banyoles i Pla de l'Estany, Girona) i Manteniment web a Serveis.
- **Portada:** els dos enllaços del lead del hero.
- **Enllaços creuats:** comprova que cada pàgina nova rep almenys 3 enllaços interns i que en surten tots els que indica el comentari `ENLLAÇOS INTERNS` del seu fitxer de copy.
- **`sitemap.xml`:** les 14 URL indexables (8 actuals + 6 noves), amb `lastmod` d'avui, sense `changefreq` ni `priority`. Les legals, fora.
- **`vercel.json`:** `"trailingSlash": true` i una redirecció permanent de `/index.html` a `/`. Passa tots els enllaços interns (també els del peu cap a les legals) a la forma amb barra final. Prova que `POST /api/contact` continua funcionant a la vista prèvia amb tots els formularis.
- `robots.txt` no canvia.

## Comprovacions finals (sobre la vista prèvia de `pagines-interiors`, amb la portada i les 13 pàgines interiors)
- [ ] **Rendiment:** Lighthouse mòbil a la vista prèvia, **mediana de 3 execucions per pàgina**, amb el mateix mètode de `docs/redisseny/rendiment.md`. Mínims a **cada** pàgina: rendiment ≥ 90 (objectiu ≥ 95, com la portada), accessibilitat ≥ 95, bones pràctiques = 100, SEO = 100, LCP < 2,5 s, CLS < 0,1, TBT ≤ 50 ms. Taula: pàgina × mètrica, abans (producció, mateix mètode) i després.
- [ ] **Sense Google Fonts:** `grep -rn "fonts.googleapis\|fonts.gstatic" --include=*.html --include=*.css --include=*.js . | grep -v node_modules | grep -v docs/` buit, i cap petició a aquests dominis a la pestanya Network de cap pàgina. Només la Hanken Grotesk de `/fonts` i fonts del sistema.
- [ ] **Imatges:** totes WebP, amb `width` i `height`, `srcset` 640/960 on n'hi hagi variants, `loading="lazy"` i `decoding="async"` sota el plec, i sense lazy ni a l'LCP. Cap imatge de més de 150 KB.
- [ ] **JS i CSS:** cap llibreria nova; JS vanilla amb `defer`; el CSS generat no creix més d'un 20 % respecte de la portada.
- [ ] **Mides:** sense scroll horitzontal a 360, 390 i 1440 px a cap pàgina.
- [ ] **SEO per pàgina:** un sol `<h1>`; title ≤ 60 caràcters (avisa'm si n'hi ha cap de més) i únic; description 120–155 caràcters i única; canonical absolut amb barra que coincideix amb la URL; `lang="ca"`; `og:*` complets; cap `noindex` fora de les legals; JSON-LD vàlid al validador de schema.org i sense errors a la Prova de resultats enriquits de Google. Fes una taula URL × title × description × H1 × canonical.
- [ ] **Enllaços:** cap enllaç trencat ni cap `href="#"` (fes un rastreig de la vista prèvia, per exemple amb `npx linkinator <url-vista-previa> --recurse`, només per comprovar, sense instal·lar-lo com a dependència). Totes les URL del sitemap responen 200 i les variants sense barra fan 308 cap a la que té barra.
- [ ] **Contingut prohibit:** `grep -rniE "hola@kodia|instagram|linkedin|behance|whatsapp|wa\.me|tel:|castellà|Studio for|preu habitual|oferta actual|15 €/mes|des de 25|des de 40|\{\{SI|PENDENT|testimoni|canvis cada mes|en persona|presencial" --include=*.html . | grep -v docs/` no ha de tornar res que es vegi a la web (si surt «testimoni» només dins del `<template>` desactivat de la portada, està bé). Cap «Enric» fora de l'avís legal i del paràgraf de protecció de dades.
- [ ] **Formularis:** a la portada, `/contacte/` i `/revisio-digital/`: errors per camp, casella obligatòria, «Enviant…», sense doble enviament, confirmació, error simulat que no esborra res, i **un enviament real de prova** des de la vista prèvia de cadascun (nom «PROVA pàgines») que arribi al correu de sempre.
- [ ] **`git diff --stat`** respecte de la branca de partida: cap canvi a `api/` ni a les variables d'entorn.

## Informe final (i atura't)
1. Taula de commits.
2. Taula de Lighthouse abans/després per pàgina (mediana de 3).
3. Taula SEO (URL, title, description, H1, canonical, tipus de JSON-LD).
4. URL de la vista prèvia de Vercel.
5. Captures de cada pàgina a 390 i 1440 px.
6. Pendents i dubtes (textos que no t'han cabut, qualsevol cosa que hagis hagut de decidir).

**No fusionis res a `main`.** Quan tot estigui revisat, el merge de `pagines-interiors` (que porta la portada, la fase 1 i la fase 2) el fa l'Enric en un sol pas.
