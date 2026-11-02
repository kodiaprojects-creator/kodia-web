# Prompt per a Cursor: redisseny de la portada de kodia.cat

Copia des d'aquí fins al final i enganxa-ho a Cursor (mode Agent), amb el repositori de kodia.cat obert.

---

Volem refer la portada de kodia.cat seguint una maqueta aprovada. Treballa **per fases** i **atura't on t'ho indico**. No fusionis res a `main` ni publiquis res a producció.

## Material de referència (és al repositori, a `docs/redisseny/`)
- `maqueta-referencia.html`: és la guia visual. **No l'enganxis tal qual** i no hi copiïs les imatges en base64.
- `captures/escriptori-fold.png`, `escriptori-sencera.png`, `mobil-fold.png` i `mobil-sencera.png`: el resultat esperat a 1440 i 390 px.
- `content.json`: **la font única del copy.** Fes servir els textos exactes. Tot el que porta `"publicar": false` o `"publicarTermini": false` no pot sortir a l'HTML publicat, ni visible ni en comentaris: s'amaga la frase o l'element sencer.
- `assets/*.webp`: les captures dels projectes, amb variants de 640 i 960 px.
- `legal/`: els textos legals definitius (fragments `.html`) i `textos-formulari.md`. **No els reescriguis.**
- `rendiment.md`: la base de Lighthouse i els criteris de rendiment.

## Què sabem de l'stack (comprovat des de fora el 2/11/2026; verifica-ho al repositori)
- HTML estàtic, amb una carpeta per pàgina (`index.html`, `contacte/index.html`, etc.), sense framework.
- Tailwind CLI: `npm run build:css` genera `css/kodia.css`. `tailwind.config.js` té una llista `content` amb les carpetes de cada pàgina, i té colors propis (`kodia-black #0F0F0F`, `secondary #FF9933`...).
- Vercel: `vercel.json` amb `outputDirectory: "."` (es publica l'arrel), capçaleres de memòria cau per a /fonts, /css, /js i /images, i `kodia.cat` → `www` amb un 307.
- Formulari: `js/form.js` envia en JSON a `POST /api/contact` (la funció de Vercel `api/contact.js`, amb Resend, `RESEND_API_KEY`, `RESEND_TO` i `RESEND_FROM`). L'API exigeix `nom`, `email`, `empresa` i, quan `formType` és `contacte`, `necessitat`. Té el camp esquer (honeypot) `website`. Ara mateix només hi ha formularis a /contacte i /revisio-digital.
- Fonts: Hanken Grotesk allotjada a `/fonts` (amb preload) i **Material Symbols des de fonts.googleapis.com**, que es carrega dues vegades a totes les pàgines.
- No hi ha analítica, GTM, GA4 ni cap banner de galetes. No n'afegeixis cap.
- Les meta de la portada: title, description, canonical `https://www.kodia.cat/`, Open Graph i Twitter (`/images/og-kodia.jpg`), i JSON-LD amb ProfessionalService/LocalBusiness i WebSite. Sitemap amb 8 URL i `robots.txt`.

## Regles que no es poden trencar
1. **Abast:** la portada (`index.html`), els components o fitxers nous que siguin només de la portada, la capçalera i el peu compartits (el canvi d'enllaços afecta tota la web), les tres pàgines legals noves i la retirada de Material Symbols de totes les pàgines. No toquis el contingut de cap altra pàgina.
2. **Formulari:** fes servir el mateix enviament que ja hi ha (`/api/contact` amb el payload actual). **No canviïs destinataris, remitent, claus, variables d'entorn ni `api/contact.js`.** No afegeixis cap correu automàtic per a l'usuari ni cap seguiment. Si al repositori l'enviament funciona d'una altra manera del que descric, **atura't i pregunta**.
3. **Res de telèfon, WhatsApp, xarxes socials ni enllaços a `#`.** Tot ha de ser en català.
4. **L'Enric no pot sortir a la web ni amb nom ni amb foto,** excepte als textos legals d'en Jimmy (l'avís legal i la informació bàsica de protecció de dades del formulari), que es fan servir literalment.
5. **El correu de contacte** és `info@kodia.cat`, i ha de quedar en una sola constant o atribut que es pugui amagar fàcilment (`config.emailContacte.mostrar` a `content.json`). Si s'amaga, desapareixen la línia «Prefereixes el correu?» i el correu del peu. Els textos legals no canvien.
6. **No es pot publicar cap dada pendent.** Els pendents són: el resultat de Vetfar, el resultat d'Eleus, el termini total de 7–10 dies, els terminis de cada pas del procés i els testimonis. **No t'inventis cap xifra, testimoni ni dada fiscal o de proveïdor.**
7. **Rendiment i SEO, iguals o millors** (vegeu `rendiment.md` i els criteris del final). Cap font web nova ni cap llibreria.

## Fase 0: preparació (i atura't)
1. Crea la branca `redisseny-portada` a partir de `main`.
2. Llegeix el repositori i fes-me un resum curt de: l'stack i el build, l'estructura de carpetes, com es comparteixen la capçalera i el peu (si estan copiats a cada HTML o hi ha includes), on es fa servir Material Symbols (llista de les icones per pàgina), com funciona el formulari de punta a punta (`form.js` → `api/contact.js`: camps obligatoris, honeypot, missatges) i si existeix `.vercelignore`.
3. Digues-me quins fitxers preveus tocar.
4. **Atura't i espera el meu «endavant».**

## Fase 1: estructura i base
- Afegeix `docs/` a `.vercelignore` (crea'l si no existeix) perquè la carpeta de referència no es publiqui. **No hi afegeixis `api/` ni res que el build faci servir.**
- Prepara els estils amb el sistema del projecte (classes de Tailwind i, si cal, colors nous a `tailwind.config.js`: `paper #F6F3EE`, `card #FFFDF9`, `line #D9D3C8`, `mut #6A6760`, `ink2 #3B3A37`, `or2 #C4600A` per al taronja de text sobre clar, i `ok #1F6B3A`). Res de CSS en línia gegant. Per als títols, fes servir la Hanken Grotesk existent; per al cos, la font del sistema actual del projecte; i per al monoespai, `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`, que és una pila del sistema i no una font nova.
- Copia `docs/redisseny/assets/*.webp` a `images/projectes/` (o a la carpeta d'imatges que ja feu servir) amb els mateixos noms.
- Si fas una carpeta nova d'HTML, afegeix-la al `content` de `tailwind.config.js`.

## Fase 2: seccions de la portada
Tradueix la maqueta amb l'ordre, la jerarquia i el copy de `content.json`:
1. **Capçalera** (compartida): el logotip «KODIA.» amb el punt taronja; els enllaços Feines fetes, Preus, Com treballem i Preguntes; i el botó «Demana pressupost» («Pressupost» en mòbil). Treu el desplegable «Serveis»: les pàgines de servei passen al peu. A la portada, els enllaços són àncores. A les altres pàgines, porten a les URL de `content.json` (`nav.*.altresPagines`), i el CTA, a `/contacte/`. En mòbil no hi ha menú hamburguesa, només el logotip i el botó. Totes les icones han de ser SVG en línia.
2. **Hero:** en escriptori, dues columnes (text i el «pressupost tipus» a l'esquerra, captures de Nivell A a la dreta). En mòbil, el text, el CTA i el tiquet han de quedar a la primera pantalla de 390x844. El tiquet té 3 files publicables (el termini queda amagat). La imatge del hero és l'LCP: `fetchpriority="high"`, sense lazy, amb `srcset` de 640 i 960 i amb `width` i `height`.
3. **«Una sola persona. De principi a fi.»:** fons fosc i 4 punts numerats.
4. **Feines fetes:** un cas destacat (Nivell A, amb el resultat «De 79 a +90») i dos de secundaris (Vetfar i Eleus) **sense la caixa de resultat**, perquè és pendent. No ha de quedar com una graella de targetes iguals.
5. **Testimonis:** desactivats. Deixa'ls en un `<template id="testimonis">` (o en un parcial desactivat) **sense text inventat**, amb un comentari que expliqui com reactivar-los. No en pot quedar res a l'HTML visible.
6. **Plans i preus:** dues peces diferents, no tres targetes iguals. A l'esquerra, One Page en clar (300 € d'alta + 20 €/mes). A la dreta, Corporativa en fosc (600 € d'alta), amb el selector visual «I tria el manteniment» i dues opcions: Essencial (30 €/mes) i Creixement (45 €/mes, amb l'etiqueta «Per créixer»: canvis cada mes, SEO local i informe mensual). A sota, la línia de «web a mida», amb poc pes. Preus sense IVA.
7. **Com treballem:** 5 passos amb el termini a la dreta. Només el primer té termini publicable («1 dia laborable»); als altres no hi surt res. La frase del total queda amagada. Al costat, la caixa «Per escrit, abans de començar» (sticky en escriptori).
8. **Preguntes:** un acordió amb `<details>` i `<summary>`, el primer obert. Opcional: un JSON-LD `FAQPage` que coincideixi exactament amb el text visible.
9. **Contacte:** el text a l'esquerra i el formulari a la dreta (en mòbil, un sota l'altre). Vegeu la fase 3.
10. **Peu** (compartit): el text, els enllaços de `content.json` (`peu.enllacos`), `info@kodia.cat` (amb la constant) i la línia legal amb `/avis-legal`, `/politica-de-privacitat` i `/politica-de-galetes`. Treu Instagram, LinkedIn, Behance, Manifest, TOS, la frase en anglès «Studio for technical precision...» i qualsevol `href="#"`.

### SEO de la portada
- Title i description nous de `content.json` (`seo.*`), i també `og:title`, `og:description` i `twitter:*`. Es mantenen el canonical, `og:url`, `og:image`, `og:locale` i el JSON-LD; del JSON-LD, només n'actualitzes la `description`.
- Un sol `<h1>`, i les seccions amb `<h2>`.
- No canviïs cap URL. Si en canviés alguna, caldria afegir una redirecció 301 a `vercel.json`.

## Fase 3: formulari de 4 camps
- Camps i textos exactes de `content.json` → `contacte.camps`: **Nom** (`nom`), **Negoci** (`empresa`), **Correu electrònic** (`email`) i **Què necessites?** (`necessitat`). Es manté el honeypot `website` ocult, i s'envia `formType: "contacte"`. Així l'API actual l'accepta sense cap canvi.
- **Casella de privacitat i informació bàsica, exactament com a `docs/redisseny/legal/textos-formulari.md` / `.html`:** la casella `name="privacitat"`, `required`, **sense marcar per defecte**, amb el text «He llegit i accepto la política de privacitat.» (amb l'enllaç). A sota del botó, el paràgraf «Protecció de dades. Responsable: ...» literal, a 12,5 px.
- Atributs: `autocomplete` i `inputmode`, `type="email"`, mida de lletra de 16 px als camps (perquè l'iPhone no faci zoom) i almenys 44 px d'alçada.
- **Errors per camp:** una validació al client amb els missatges de `contacte.camps[].error` i `errorPrivacitat`, mostrats sota cada camp amb `aria-describedby` i `aria-invalid`. El focus va al primer camp amb error.
- **Estat «Enviant…»:** el botó es desactiva i porta `aria-busy`, i no es pot enviar dues vegades.
- **Confirmació:** si va bé, el formulari se substitueix per la confirmació de `contacte.confirmacio` (amb el nom). Si falla, surt `contacte.errorEnviament` i **no s'esborra** el que s'ha escrit.
- Implementació: amplia `js/form.js` de manera **compatible**, amb opcions activades per atributs `data-*` (per exemple, `data-validate`, `data-success-title` i `data-success-text`), o crea un `js/form-portada.js` que enviï al mateix `/api/contact` amb el mateix payload. Comprova que /contacte i /revisio-digital funcionen exactament igual que abans.
- Corregeix només el text de recanvi de l'error a `form.js` si cal, perquè hi digui `info@kodia.cat` (ja és l'adreça bona).

## Fase 4: pàgines legals i retirada de Google Fonts
- Crea `/avis-legal/index.html`, `/politica-de-privacitat/index.html` i `/politica-de-galetes/index.html` amb la mateixa capçalera, el mateix peu i el mateix `<head>` base que la resta. Insereix-hi **literalment** el fragment `<article class="legal-page">` de `docs/redisseny/legal/*.html` dins del `<main>`. Dona'ls estils de lectura (amplada màxima de ~70 caràcters, títols i llistes). Cada pàgina porta el seu title i el seu canonical, i `<meta name="robots" content="noindex, follow">`. Afegeix les carpetes al `content` de Tailwind. No les posis al sitemap.
- **No t'inventis ni completis cap dada.** La política de privacitat ja és completa (Gmail com a proveïdor del correu i la gestoria Vergé Teixidor i Associats, SL). Copia-la literal i, si hi trobes cap marcador entre claudàtors, atura't i avisa'm: no es pot publicar.
- **Treu Material Symbols de totes les pàgines.** Elimina els dos `<link>` a fonts.googleapis.com de cada HTML i substitueix cada `<span class="material-symbols-outlined">nom</span>` per un SVG en línia equivalent (24x24, `fill="currentColor"` o `stroke`, `aria-hidden="true"` i `focusable="false"`, amb la mateixa mida i el mateix color que tenia). Si es repeteixen, fes servir un `<symbol>` amb `<use>`, o un parcial. Les icones fetes servir ara són: expand_more, arrow_forward, arrow_back, menu, close, open_in_new, share, search_insights, public, location_on, trending_up, sync_alt, south, near_me, hub, edit, description, database, check, calendar_month, bolt i account_tree. Comprova la llista amb un grep. Pots fer servir els camins SVG oficials de Material Symbols (llicència Apache 2.0), copiats al codi, sense cap dependència. Treu de `tailwind.config.js` i del CSS qualsevol referència a la font Material Symbols.
- Comprova visualment totes les pàgines (/, /web-one-page/, /web-corporativa/, /web-a-mida/, /projectes/, /preus-pagina-web/, /revisio-digital/, /contacte/ i les tres legals) a 390 i 1440 px: les icones han de ser al seu lloc i el menú i els desplegables que quedin han de funcionar.

## Fase 5: poliment i QA (i atura't)
Fes passar aquesta llista i ensenya'm el resultat de cada punt:
- [ ] **Mides:** la portada a 360, 390 i 1440 px sense scroll horitzontal (`document.documentElement.scrollWidth === innerWidth`), comparada amb `docs/redisseny/captures/`. En mòbil, el CTA del hero es veu a la primera pantalla.
- [ ] **Cap pendent visible:** `grep -rn "PENDENT" --include=*.html . | grep -v docs/` no ha de retornar res. A la portada no hi ha cap «7–10 dies», cap caixa de resultat de Vetfar o Eleus, cap testimoni ni cap termini, excepte el primer.
- [ ] **Sense Google Fonts:** `grep -rn "fonts.googleapis\|fonts.gstatic" --include=*.html --include=*.css --include=*.js . | grep -v node_modules | grep -v docs/` retorna buit, i a la pestanya Network de cada pàgina no hi ha cap petició a aquests dominis.
- [ ] **Sense enllaços morts:** cap `href="#"`, cap xarxa social, cap telèfon (`tel:`) i cap WhatsApp.
- [ ] **Formulari:** errors per camp, «Enviant…», sense doble enviament, la confirmació, i una fallada simulada que no esborra res. **Enviament real de prova des de la vista prèvia** amb el nom «PROVA portada» i el negoci «PROVA»: ha d'arribar al correu de sempre (el de `RESEND_TO`), amb el `replyTo` correcte. Els formularis de /contacte i /revisio-digital s'han d'enviar igual que abans.
- [ ] **Lighthouse mòbil** a la vista prèvia, 3 execucions: rendiment ≥ 96, accessibilitat ≥ 95, bones pràctiques i SEO = 100, LCP < 2,5 s, CLS < 0,1 i TBT ≤ 50 ms. Les imatges tenen mides, les de sota el plec porten `loading="lazy"`, i no hi ha cap font web ni cap llibreria nova.
- [ ] **SEO:** title, description, canonical, OG i JSON-LD vàlids (prova-ho amb el validador de schema.org). El sitemap no canvia (les legals hi queden fora) i totes les URL actuals retornen 200.
- [ ] **`git diff --stat main...redisseny-portada`:** només hi ha la portada, els fitxers nous de la portada, la capçalera i el peu, les icones SVG (la retirada de Material Symbols), les tres legals, `tailwind.config.js`, el CSS generat, els assets, `.vercelignore` i `js/form.js` (només si s'ha ampliat de manera compatible). No hi ha canvis a `api/` ni a les variables d'entorn.
- [ ] **Vista prèvia de Vercel:** fes push de la branca, dona'm l'URL de la vista prèvia i **atura't**. No fusionis res a `main` fins que jo hi doni el vistiplau.
