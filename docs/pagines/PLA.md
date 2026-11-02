# Pla de pàgines de kodia.cat (2/11/2026)

Fonts: web en producció llegida el 2/11/2026 a les 17:50 (hora de Madrid) amb `curl` (còpies a `live/`), material de la portada a `/workspace/kodia/maqueta/cursor/`, Search Console a `/workspace/kodia/gsc/SUMMARY.md` (3 últims mesos).

## 0. Què hi ha publicat ara

**La portada nova encara no és a producció.** https://www.kodia.cat/ serveix la portada antiga (title «KODIA | Disseny web a Girona per fer créixer el teu negoci», H1 «Disseny web a Girona per fer créixer el teu negoci», menú amb desplegable «Serveis», peu amb Instagram/LinkedIn/Behance i la frase en anglès «Studio for technical precision…», `hola@kodia.cat` al JSON-LD). La captura que ha enviat l'Enric és la portada nova, però ha de ser la vista prèvia o la branca `redisseny-portada`, que encara no s'ha fusionat a `main` (tal com demanava el prompt).

| URL | Estat a producció | Estil | Notes |
|---|---|---|---|
| `/` | 200 | **Antic** | La nova és a la vista prèvia |
| `/web-one-page/` | 200 | Antic | «Preu habitual 450 € / Oferta 300 €», manteniment 15 €/mes |
| `/web-corporativa/` | 200 | Antic | Manteniment «des de 25 €/mes» |
| `/web-a-mida/` | 200 | Antic | Des de 900 €, manteniment des de 40 €/mes. **726 impressions, 0 clics** |
| `/preus-pagina-web/` | 200 | Antic | Taula de manteniment vella (15 / 25 / 40) |
| `/projectes/` | 200 | Antic | Filtres per tipus amb 3 projectes |
| `/revisio-digital/` | 200 | Antic | Formulari de 6 camps sense casella de privacitat; parla d'«una trucada curta» |
| `/contacte/` | 200 | Antic | Formulari amb telèfon opcional i tipus de projecte; «hola@kodia.cat», «en català o castellà» |
| `/avis-legal`, `/politica-de-privacitat`, `/politica-de-galetes` | **404** | – | Només existeixen a la branca nova |

Totes les pàgines antigues carreguen Google Fonts (Material Symbols) i tenen els enllaços a xarxes al peu. El prompt de la portada ja treu Material Symbols de les 8 pàgines i canvia la capçalera i el peu compartits, així que **quan es fusioni la branca, les pàgines interiors tindran capçalera i peu nous però el cos antic**. Per això cal la fase 1 d'aquest pla abans o just després de publicar la portada.

Altres coses detectades:
- `/web-a-mida` (sense barra) i `/web-a-mida/` responen totes dues 200, i `/index.html` també. El canonical ho resol, però és millor forçar la barra final (vegeu §6).
- `kodia.cat` → `www.kodia.cat` és un **307** (temporal). Hauria de ser permanent (308/301).
- Sitemap: 8 URL amb `lastmod` del 18/8/2026. Search Console: 7 indexades, 2 «pàgina amb redirecció» (probablement les variants sense www / sense barra) i 1 «descoberta, sense indexar».

## 1. Mapa del web (fase 1 + fase 2)

```
/                         Portada (feta)
├─ /web-one-page/         Servei · One Page
├─ /web-corporativa/      Servei · Corporativa
├─ /manteniment-web/      Servei · Manteniment (NOVA)
├─ /web-a-mida/           Servei · A mida (perfil baix, fora del menú)
├─ /preus-pagina-web/     Preus
├─ /projectes/            Feines fetes
├─ /revisio-digital/      Revisió gratuïta
├─ /contacte/             Pressupost
├─ Per a qui
│  ├─ /web-per-a-autonoms/   (NOVA)
│  ├─ /web-per-a-comercos/   (NOVA)
│  └─ /web-per-a-oficis/     (NOVA, lampistes, electricistes, reformes)
├─ Zones
│  ├─ /disseny-web-banyoles/ (NOVA)
│  └─ /disseny-web-girona/   (NOVA)
└─ Legal (noindex): /avis-legal/ · /politica-de-privacitat/ · /politica-de-galetes/
```

Cap URL existent canvia de nom, així que **no cal cap redirecció 301 de contingut**. El menú de la capçalera no canvia (Feines fetes, Preus, Com treballem, Preguntes + «Demana pressupost»): les pàgines noves s'enllacen des del peu, des dels textos i entre elles.

## 2. Pàgines existents: reestil amb el sistema de la portada

Totes es **mantenen** (cap fusió ni redirecció). Textos exactes a `copy/existents.md`.

| URL | Decisió | Title (≤60) | Meta description | H1 | Paraula clau objectiu |
|---|---|---|---|---|---|
| `/` | Feta + ajustos de copy per D1/D3/D4 (`copy/portada-ajustos.md`) | Pàgines web per a autònoms i comerços a Girona i Catalunya \| KODIA *(ja aprovat; 66 caràcters, Google el pot tallar)* | `content.json → seo.description` | La web del teu negoci, a preu tancat i sense intermediaris. | kodia, pàgina web per a negocis |
| `/web-one-page/` | Mantenir + reestil + preus nous | Web One Page des de 300 € + 20 €/mes \| KODIA | Tot el teu negoci en una sola pàgina clara i ràpida. per 300 €. Manteniment opcional de 20 €/mes amb domini, allotjament i petits canvis. | Web One Page: tot el teu negoci en una sola pàgina | web one page (sec.: web d'una sola pàgina, one page preu) |
| `/web-corporativa/` | Mantenir + reestil + preus nous | Web corporativa des de 600 € per a negocis \| KODIA | Portada i fins a 4 pàgines interiors per explicar bé els teus serveis. 600 € d'alta i manteniment opcional de 30 o 45 €/mes amb domini i allotjament. | Web corporativa per explicar bé tot el que fa el teu negoci | disseny web corporatiu, web corporativa (17 + 16 impr. a GSC) |
| `/web-a-mida/` | **Mantenir URL, title i H1** (és el que més impressions té); copy més curt i amb poc pes; fora del menú | Programació web a mida a Girona \| KODIA | Webs amb reserves, gestor de continguts o connexions amb altres eines, a Girona i a tot Catalunya. T'escolto, et dic si cal i et faig un pressupost tancat. | Programació web a mida a Girona | programació web a mida girona (435 impr., pos. 18,8), web a mida, disseny web a mida |
| `/preus-pagina-web/` | Mantenir + reestil + preus nous | Quant costa una pàgina web? Preus tancats \| KODIA | Preus clars, sense IVA: One Page 300 € i Corporativa 600 €. Manteniment opcional de 20, 30 o 45 €/mes amb domini i allotjament. | Quant costa una pàgina web? Preus i quotes | preu pàgina web, quant costa una pàgina web, pressupost pàgina web |
| `/projectes/` | Mantenir URL, reanomenar a «Feines fetes» | Feines fetes: webs reals per a negocis \| KODIA | Webs reals fetes des de zero: Nivell A Oposicions, Vetfar i Eleus. Mira com són abans de demanar pressupost per a la teva. | Feines fetes | (pàgina de confiança; marca) |
| `/revisio-digital/` | Mantenir (serveix de destí dels correus de prospecció) + casella de privacitat al formulari | Revisió gratuïta de la teva web \| KODIA | Et reviso la web i la presència a Google del teu negoci i t'envio per escrit què milloraria primer. Gratuïta i sense compromís. | Revisió digital gratuïta del teu negoci | revisió web gratuïta, auditoria web gratuïta |
| `/contacte/` | Mantenir + formulari de 4 camps de la portada | Demana pressupost per a la teva web \| KODIA | Explica'm el teu negoci i et responc en 1 dia laborable amb el que necessites i el preu. Sense compromís. info@kodia.cat | Explica'm el teu negoci i et dic què necessites. | pressupost pàgina web (5 impr., pos. 1) |

Per què no es fusiona res: amb 8 URL i només 7 indexades no hi ha canibalització greu, i `/web-a-mida/` i `/web-corporativa/` són les úniques que Google ja ensenya. Fusionar-les ara faria perdre el poc posicionament que hi ha.

## 3. Pàgines noves (fase 2), per prioritat

Criteri: primer les que serveixen de **destí als correus de prospecció** (oficis i comerços), després les de **zona** (Banyoles té poca competència i és on és el negoci) i, al final, autònoms i manteniment. No tinc dades de volum de cerca (no hi ha cap eina de paraules clau connectada); la prioritat ve de Search Console, de la intenció de cerca i de la prospecció.

Les variants en castellà es posen **només com a paraules clau de referència** per a Search Console: no es fan pàgines en castellà ni es posen al text.

### P1 · `/web-per-a-oficis/` — copy: `copy/web-per-a-oficis.md`
- **Objectiu:** pàgina web per a lampistes; pàgina web per a reformes. **Secundàries:** web per a electricistes, web per a instal·ladors, web per a autònoms d'oficis. *(es: página web para fontaneros, web para empresas de reformas, página web electricista)*
- **Intenció:** comercial. Un ofici que ha decidit fer-se una web i busca qui.
- **Esquema:** hero → què ha de tenir la web d'un ofici (serveis, zona, feina feta, contacte) → la fitxa de Google i la web han de coincidir → One Page o Corporativa (preus) → procés curt («no tens temps») → FAQ (fotos, telèfon, ja tinc Wix) → CTA.
- **Enllaços:** surt a `/web-one-page/`, `/web-corporativa/`, `/preus-pagina-web/`, `/revisio-digital/`, `/contacte/`. Hi entra des de la portada (lead del hero), `/web-per-a-autonoms/`, les dues pàgines de zona i el peu. Els correus del lot 1 d'oficis hi poden enllaçar.

### P2 · `/web-per-a-comercos/` — copy: `copy/web-per-a-comercos.md`
- **Objectiu:** pàgina web per a comerços; pàgina web per a botigues. **Secundàries:** web per a botiga de barri, web comerç local, alternativa a botiga online. *(es: página web para tiendas, web para comercio local)*
- **Intenció:** comercial i informacional (botiga en línia que no ven → què faig).
- **Esquema:** hero → què busca qui et vol visitar (horaris, com arribar, què hi ha, contacte) → **tens una botiga en línia que no ven?** (no faig e-commerce; passar a corporativa) → quina web et convé (preus) → com ho fem → FAQ → CTA.
- **Enllaços:** `/web-one-page/`, `/web-corporativa/`, `/manteniment-web/`, `/preus-pagina-web/`, zones, `/contacte/`. És el destí natural dels correus del lot 2 (botigues en línia que no funcionen).

### P3 · `/disseny-web-banyoles/` — copy: `copy/disseny-web-banyoles.md`
- **Objectiu:** disseny web Banyoles; pàgina web Banyoles. **Secundàries:** disseny web Pla de l'Estany, programació web Banyoles, webs per a negocis de Banyoles. *(es: diseño web Banyoles, página web Banyoles)*
- **Intenció:** local i transaccional.
- **Contingut propi (no és la de Girona amb el nom canviat):** Kodia és d'aquí; els 11 municipis del Pla de l'Estany (llista verificada a Idescat) i per què la zona de treball ha de sortir a la web; el to «de poble» (clients que et coneixen); reunions per videotrucada o trucada, concertades per correu (mai presencials, D5); el pla Creixement (SEO local) per a cerques comarcals.
- **Enllaços:** les tres pàgines «per a qui», `/projectes/`, `/preus-pagina-web/`, `/disseny-web-girona/`, `/revisio-digital/`, `/contacte/`.

### P4 · `/disseny-web-girona/` — copy: `copy/disseny-web-girona.md`
- **Objectiu:** disseny web Girona; pàgina web Girona. **Secundàries:** dissenyador web Girona, programació web Girona, webs per a autònoms a Girona, disseny web Gironès. *(es: diseño web Girona, diseñador web Girona, páginas web Girona)*
- **Intenció:** local i transaccional, amb molta competència d'agències.
- **Contingut propi:** l'angle és **«sense agència»** (comparativa honesta amb una agència) i **com destacar en una ciutat amb molta competència** (concreció, zona i municipis del Gironès, velocitat al mòbil amb el cas Nivell A). Diu clarament que Kodia és de Banyoles (no s'inventa cap oficina a Girona).
- **Enllaços:** `/projectes/`, `/preus-pagina-web/`, `/web-a-mida/` (per als que busquen «programació web a mida girona»), les pàgines «per a qui», `/disseny-web-banyoles/`, `/revisio-digital/`, `/contacte/`.
- **Canibalització:** la portada té «Girona» al title. Si d'aquí a 2–3 mesos Search Console mostra la portada i aquesta pàgina alternant-se per «disseny web girona», es treu «Girona» del title de la portada.

### P5 · `/web-per-a-autonoms/` — copy: `copy/web-per-a-autonoms.md`
- **Objectiu:** pàgina web per a autònoms. **Secundàries:** web per a autònoms preu, web professional per a autònoms, web per a professionals. *(es: página web para autónomos, web autónomo precio)*
- **Intenció:** comercial.
- **Diferència amb `/web-one-page/`:** aquella explica el **format**; aquesta parla al **públic** (Instagram no n'hi ha prou, què posar-hi, sense temps ni textos, què és teu). L'H1 i el title no repeteixen «One Page».
- **Enllaços:** `/web-one-page/`, `/web-corporativa/`, `/projectes/`, `/web-per-a-oficis/`, `/preus-pagina-web/`, `/manteniment-web/`, `/contacte/`.

### P6 · `/manteniment-web/` — copy: `copy/manteniment-web.md`
- **Objectiu:** manteniment web. **Secundàries:** manteniment pàgina web preu, manteniment web Girona, allotjament i domini inclosos. *(es: mantenimiento web, mantenimiento página web precio)*
- **Intenció:** comercial (també gent que ja té web).
- **Esquema:** per què una web necessita manteniment → els tres plans opcionals (20 / 30 / 45 €/mes, tots amb fins a 3 petits canvis al mes) → què vol dir cada cosa → velocitat (cas Nivell A) → «si ja tens una web feta per algú altre» (no es mantenen webs d'altres, D8) → FAQ → CTA.
- **Enllaços:** `/preus-pagina-web/`, `/web-one-page/`, `/web-corporativa/`, `/projectes/`, `/revisio-digital/`, `/contacte/`. Hi enllacen `/preus-pagina-web/` i `/web-corporativa/` (selector de manteniment).

### Més endavant (fase 3, no ara)
- Zones: Olot / la Garrotxa, Figueres / l'Alt Empordà, Salt i el Gironès. **Només si hi ha contingut real** (un client o un projecte d'aquella zona, o un angle diferent). Sense això serien pàgines de «canvi de ciutat» i és millor no fer-les.
- Un cas per projecte (`/projectes/nivell-a/`…) quan hi hagi resultats i permís.
- Sectors addicionals (salut, formació) segons el que respongui la prospecció.

## 4. Enllaçat intern

- **Peu (compartit), tres columnes:** *Serveis*: One Page · Web corporativa · Manteniment web · Web a mida · Revisió digital · Preus. *Per a qui*: Autònoms · Comerços · Oficis. *Zones*: Banyoles i Pla de l'Estany · Girona. A més, Feines fetes, Contacte, `info@kodia.cat` i la línia legal (com a la portada).
- **Portada:** al lead del hero, «lampistes, reformes» → `/web-per-a-oficis/`, «botigues» → `/web-per-a-comercos/` (no canvia el text).
- **Fil d'Ariadna** visible i en JSON-LD a totes les pàgines interiors: «Inici › [pàgina]».
- Text dels enllaços descriptiu («web per a comerços»), mai «clica aquí».
- Totes les pàgines de servei i de zona acaben amb el mateix bloc CTA cap a `/contacte/` (no s'hi repeteix el formulari: només hi és a la portada, a `/contacte/` i a `/revisio-digital/`).

## 5. Dades estructurades (JSON-LD)

**Decisió proposada: negoci d'àrea de servei, sense adreça de carrer a les pàgines públiques.** L'adreça completa ja surt a l'avís legal perquè la llei ho exigeix, però no cal posar-la al JSON-LD ni convidar visites a casa. Sense `streetAddress` el marcatge continua sent vàlid; només es perd l'opció de resultat enriquit de «negoci local», que per a un negoci d'àrea de servei aporta poc. El que pesa de debò als resultats locals és la fitxa de Google Business (decisió D9).

- **Una sola entitat** a la portada, `@id: https://www.kodia.cat/#business`, tipus `ProfessionalService` (subtipus de `LocalBusiness`):
  - `name` KODIA, `url`, `logo`, `image` (og-kodia.jpg), `email` **info@kodia.cat** (ara hi diu hola@).
  - `address`: `PostalAddress` amb `addressLocality` **Banyoles** (ara hi diu Girona), `postalCode` 17820, `addressRegion` Girona, `addressCountry` ES. **Sense** `streetAddress`.
  - `areaServed`: `AdministrativeArea` Pla de l'Estany, Gironès i Catalunya; `City` Banyoles i Girona.
  - `knowsLanguage`: `ca` (vegeu decisió D7).
  - `priceRange`: «300 €–600 €» o es treu (no «€€»).
  - Sense `telephone`, sense `sameAs` (no hi ha xarxes), sense `aggregateRating` ni `review` (no hi ha testimonis).
- **Pàgines de servei** (`/web-one-page/`, `/web-corporativa/`, `/manteniment-web/`, `/web-a-mida/`, les tres «per a qui»): `Service` amb `provider: {"@id": ".../#business"}`, `serviceType`, `areaServed` Catalunya i `offers` amb el preu real (One Page 300 EUR; Corporativa 600 EUR; manteniment amb `UnitPriceSpecification` 20 / 30 / 45 EUR per mes, `valueAddedTaxIncluded: false`). A `/web-a-mida/`, sense preu si no es confirma.
- **Pàgines de zona:** `Service` amb `areaServed` `City` Banyoles (+ `AdministrativeArea` Pla de l'Estany) o `City` Girona (+ Gironès), i `provider` → `#business`. **No** es crea cap `LocalBusiness` nou per ciutat (seria una ubicació falsa).
- **Totes les interiors:** `BreadcrumbList` i `WebPage` (o `ContactPage` / `CollectionPage`).
- **FAQPage:** opcional i només si el text coincideix exactament amb el visible. Google ja quasi no ensenya aquests resultats enriquits per a webs comercials, així que no hi ha cap pressa.
- Validar cada pàgina amb el validador de schema.org i amb la Prova de resultats enriquits.

## 6. Canonical, redireccions, sitemap i robots

- **Canonical** absolut i amb barra final a cada pàgina indexable: `https://www.kodia.cat/<slug>/`. Les legals també porten canonical però `noindex, follow`.
- **Barra final:** `"trailingSlash": true` a `vercel.json`, perquè `/web-a-mida` faci 308 cap a `/web-a-mida/`. Comprovar que `POST /api/contact` continua funcionant (s'ha de provar a la vista prèvia) i passar els enllaços a les legals a `/avis-legal/` etc., amb barra, perquè no facin una redirecció de més. Afegir una redirecció de `/index.html` → `/`.
- **Domini:** a Vercel → Domains, posar `kodia.cat` → `www.kodia.cat` com a redirecció **permanent (308)**. Ara és 307. Això ho ha de fer l'Enric al panell, no Cursor.
- **Redireccions 301 de contingut:** cap, perquè no es canvia cap URL. Si mai es canvia un slug, redirecció a `vercel.json` i actualitzar enllaços interns i sitemap.
- **Sitemap:** les 8 URL actuals + les 6 noves (14), amb `lastmod` real del dia del canvi. Fora `changefreq` i `priority` (Google no els fa servir). Les legals, fora.
- **robots.txt:** igual (`Allow: /` i el sitemap).
- **Després de publicar:** reenviar el sitemap a Search Console i demanar la indexació de les 6 noves.

## 7. Mapa de paraules clau (perquè cada pàgina tingui la seva)

| Cerca | Pàgina |
|---|---|
| kodia, pàgina web per a negocis | `/` |
| programació web a mida girona, web a mida, disseny web a mida | `/web-a-mida/` |
| disseny web girona, pàgina web girona | `/disseny-web-girona/` |
| disseny web banyoles, pàgina web banyoles | `/disseny-web-banyoles/` |
| web one page | `/web-one-page/` |
| pàgina web per a autònoms | `/web-per-a-autonoms/` |
| web corporativa, disseny web corporatiu | `/web-corporativa/` |
| pàgina web per a comerços / botigues | `/web-per-a-comercos/` |
| pàgina web per a lampistes / reformes / electricistes | `/web-per-a-oficis/` |
| manteniment web | `/manteniment-web/` |
| preu pàgina web, quant costa una web | `/preus-pagina-web/` |
| pressupost pàgina web | `/contacte/` |
| revisió web gratuïta | `/revisio-digital/` |

## 8. Decisions de l'Enric (2/11/2026)

Totes aplicades al copy i al prompt. Ja no queda cap marca `{{SI:…}}`.

| # | Tema | Decisió | On s'aplica |
|---|---|---|---|
| D1 | Termini | Es publica: **7–10 dies** (One Page) i **unes dues setmanes** (Corporativa), des que tinc el material. | Pàgines noves, FAQ de One Page i Corporativa, portada (`hero.tiquet` i `proces.total` passen a `publicar: true`, vegeu `copy/portada-ajustos.md`) |
| D2 | Web a mida | Es manté **«des de 900 €»** sense IVA. L'estudi de mercat ho avala: és dels preus més baixos publicats (vegeu `estudi-preu-web-a-mida.md`). | `/web-a-mida/` (intro, bloc de preu, FAQ), `Offer` de 900 € al JSON-LD |
| D3 | Quota | El manteniment és **opcional**. Sense manteniment, el client necessita el seu propi domini i allotjament, i els canvis es pressuposten un per un. | Tots els blocs de preu («manteniment opcional»), FAQ «És obligatori?» a `/preus-pagina-web/` i `/manteniment-web/`, portada |
| D4 | Què inclouen els plans | **Tots els plans** (One Page, Essencial, Creixement) inclouen **fins a 3 petits canvis al mes** (una imatge, un text, el logotip; no seccions senceres). Creixement = Essencial + **SEO local** (cada mes, revisió de Search Console i ajust dels títols i textos d'una pàgina) **+ informe mensual**. Els canvis no fets un mes **no s'acumulen** al següent. Desapareix «canvis cada mes» com a avantatge del Creixement. | `/manteniment-web/`, `/preus-pagina-web/`, totes les pàgines noves, portada |
| D5 | Reunions | Només **videotrucada o trucada, concertades per correu**. Mai presencials. El telèfon no es publica. | `/disseny-web-banyoles/` (bloc «Si t'estimes més parlar-ne»), `/disseny-web-girona/`, FAQ de `/contacte/` |
| D6 | Revisió digital | Continua sent **gratuïta**; si el client vol, una videotrucada o trucada curta concertada per correu. | `/revisio-digital/` |
| D7 | Idioma | Només català. No es diu enlloc que es respon en castellà. | Tot el web (`knowsLanguage: ca`) |
| D8 | Webs d'altres | **No es mantenen webs que no ha fet Kodia.** Es diu clarament i s'ofereix fer-ne una de nova. | `/manteniment-web/` (secció i FAQ), FAQ de `/preus-pagina-web/`, `/disseny-web-girona/`, `/web-per-a-oficis/` |
| D9 | Google Business Profile | **Pendent.** No es menciona enlloc ni es crea res. | — |
| D10 | `/web-a-mida/` | Es manté simple: fora «Animacions avançades» i «Directoris». | `/web-a-mida/` |
| D11 | Publicació | **Tot junt**: portada + fase 1 + fase 2 en un sol desplegament. No es fusiona res fins que tot estigui fet i revisat. El merge el fa l'Enric. | `prompt-cursor-pagines.md` |

### Encara obert
- **D9 · Google Business Profile.** És el que més ajudaria a sortir a «disseny web Banyoles» (negoci d'àrea de servei, amb l'adreça amagada). Quan l'Enric decideixi, s'afegeix l'enllaç `sameAs` al JSON-LD.
- ~~Essencial vs Creixement~~ **Tancat (2/11):** el «SEO local» del Creixement és, cada mes, una revisió de Search Console i l'ajust dels títols i textos d'una pàgina, més l'informe mensual. Descrit així a `/manteniment-web/`, `/web-corporativa/`, `/preus-pagina-web/`, Banyoles i la portada.
- ~~Petits canvis~~ **Tancat (2/11):** els canvis no fets un mes no s'acumulen. Es diu només on s'expliquen en detall (`/manteniment-web/` i FAQ de `/preus-pagina-web/`).
