# Textos per a les pàgines existents (fase 1: reestil)

Regla general per a totes: **el contingut es manté** (mateixa URL, mateix tema, mateixes preguntes freqüents si no s'indica el contrari), però:
- Veu en **primera persona del singular** («et responc», «faig»), com a la portada. Fora «estudi», «el nostre equip», «un professional revisarà», «analitzem», «us proposem».
- Fora «hola@kodia.cat» → `info@kodia.cat` (la constant de `config.emailContacte`).
- Fora «en català o castellà», «Studio for technical precision...», qualsevol xarxa social, telèfon o WhatsApp.
- Preus nous: One Page 300 € + 20 €/mes · Corporativa 600 € + 30 €/mes (Essencial) o 45 €/mes (Creixement). Fora «Preu habitual 450 € / Oferta actual» (preu de referència que no es pot justificar), fora «manteniment opcional 15 € / des de 25 € / des de 40 €».
- **Manteniment opcional (D3)** i, en tots els plans (One Page, Essencial, Creixement), **fins a 3 petits canvis al mes** (una imatge, un text, el logotip; no seccions senceres) (D4). Creixement = Essencial + SEO local + informe mensual.
- Reunions només **per videotrucada o trucada, concertades per correu** (D5). El telèfon no es publica.
- Només s'atén en català: no es diu enlloc «castellà» (D7). Webs fetes per altres **no es mantenen** (D8).
- Cap testimoni. Vetfar i Eleus sense resultat. Nivell A: «Lighthouse mòbil de 79 a més de 90» (només la landing d'anuncis).

---

## / (portada)
Ja feta a la branca `redisseny-portada`. Ara té **ajustos de copy obligatoris** per les decisions D1, D3 i D4: vegeu `copy/portada-ajustos.md`. A més, dos retocs d'enllaçat intern:
- Al `lead` del hero, enllaça «lampistes, reformes» → `/web-per-a-oficis/` i «botigues» → `/web-per-a-comercos/`.
- Al peu, els grups d'enllaços nous (vegeu PLA.md §4).

---

## /web-one-page/
- **Title:** Web One Page des de 300 € + 20 €/mes | KODIA
- **Description:** Tot el teu negoci en una sola pàgina clara i ràpida, per 300 €. Manteniment opcional de 20 €/mes amb domini, allotjament i petits canvis.
- **H1:** Web One Page: tot el teu negoci en una sola pàgina
- **Intro (substitueix els dos paràgrafs actuals):**
  Una One Page concentra tot el que ha de saber un client en una sola pàgina: què fas, on treballes, per què confiar en tu i com contactar-te. És la manera més senzilla i econòmica de tenir una web ben feta.
  És la que recomano a la majoria d'autònoms, oficis i petits negocis. Si tens molts serveis per explicar, t'ho diré i et proposaré una [Corporativa](/web-corporativa/).
- **Bloc de preu (substitueix «Preu habitual 450 € / Oferta actual 300 € / Manteniment opcional 15 €/mes»):** component «One Page» de la portada: **300 € d'alta + manteniment opcional de 20 €/mes**, preus sense IVA, amb la llista `preus.onePage.inclou` de `content.json` (ja ajustada segons `portada-ajustos.md`).
- **Seccions:** es mantenen «Què és una Web One Page?», «Per a qui és…» (afegeix enllaç «Autònoms» → `/web-per-a-autonoms/` i «Negocis locals» → `/web-per-a-comercos/`), «Què inclou…» i «Una web pensada per convertir visites en contactes» (passa a singular: «Treballo l'ordre de la informació…»).
- **FAQ, canvis:**
  - «Quant costa una Web One Page?» → «300 € d'alta, sense IVA. El manteniment és opcional: 20 €/mes, amb el domini, l'allotjament, les incidències i fins a 3 petits canvis al mes. Si el contractes, comença quan la web està publicada.»
  - «Quant trigueu…» → pregunta «Quant triga a estar llesta?» i resposta «Habitualment, entre 7 i 10 dies des que tinc la informació i el material. Te'n confirmo el calendari a la proposta.»
  - Resta de preguntes: igual, en singular («T'ajudo a ordenar la informació…», «no et puc garantir una posició concreta…»).
- **Fora:** el bloc «Demana una revisió digital gratuïta» es pot quedar com a enllaç secundari.

## /web-corporativa/
- **Title:** Web corporativa des de 600 € per a negocis | KODIA
- **Description:** Portada i fins a 4 pàgines interiors per explicar bé els teus serveis. 600 € d'alta i manteniment opcional de 30 o 45 €/mes amb domini i allotjament.
- **H1:** Web corporativa per explicar bé tot el que fa el teu negoci
- **Intro:**
  Una web corporativa té una portada i fins a quatre pàgines interiors. Et dona espai per explicar cada servei per separat, qui sou, on treballeu i com contactar-vos, i fa que cada servei pugui sortir a Google per si mateix.
  És la que recomano a botigues, oficis amb molts serveis i negocis que tenen més coses per explicar que les que caben en una sola pàgina.
- **Bloc de preu:** component «Corporativa» fosc de la portada: **600 € d'alta** + selector «I tria el manteniment (opcional)»: Essencial 30 €/mes / Creixement 45 €/mes (etiqueta «Per créixer»). Enllaç «Què inclou cada manteniment →» `/manteniment-web/`.
- **Nova línia sota «Quan necessites una web corporativa?»:** «També és la sortida natural si tens una botiga en línia que no et funciona i vols passar a una web que porti gent a la botiga. Més informació a [web per a comerços](/web-per-a-comercos/).»
- **FAQ, canvis:**
  - «Quant costa…» → «600 € d'alta, sense IVA. El manteniment és opcional: 30 €/mes (Essencial: domini, allotjament, incidències i fins a 3 petits canvis al mes) o 45 €/mes (Creixement: a més, SEO local, és a dir, cada mes reviso Search Console i ajusto els títols i els textos d'una pàgina, i un informe mensual).»
  - «Quant trigueu…» → pregunta «Quant triga a estar llesta?» i resposta «Habitualment, unes dues setmanes des que tinc la informació i el material. Te'n confirmo el termini a la proposta.»
  - «Feu servir plantilles?» → «Fas servir plantilles?» «No. Cada web es fa des de zero per al negoci que la fa servir.»

## /web-a-mida/  (perfil baix, però NO es toca el posicionament)
Aquesta URL té 726 impressions en 3 mesos i la cerca «programació web a mida girona» (435 impressions, posició 18,8). Es manté la URL, el title i l'H1 alineats amb aquesta cerca. Simplement no es destaca al menú.
- **Title:** Programació web a mida a Girona | KODIA
- **Description:** Webs amb reserves, gestor de continguts o connexions amb altres eines, a Girona i a tot Catalunya. T'escolto, et dic si cal i et faig un pressupost tancat.
- **H1:** Programació web a mida a Girona (igual)
- **Intro:**
  Hi ha negocis que necessiten alguna cosa més que una web informativa: reserves, un gestor per editar els continguts, contingut que canvia sovint o connectar la web amb una altra eina.
  En aquests casos, primer t'escolto i et dic amb sinceritat si de debò ho necessites o si una [web corporativa](/web-corporativa/) ja t'ho resol. Si cal programar a mida, et passo una proposta tècnica i econòmica tancada abans de començar.
  «Els projectes a mida comencen a partir de 900 €, sense IVA.» (D2: es manté, vegeu `estudi-preu-web-a-mida.md`.)
- **Llista «Quan necessites una web a mida?»:** CMS personalitzat, sistema de reserves, contingut dinàmic, integracions, automatitzacions. Fora «Animacions avançades» i «Directoris» (D10: es manté simple).
- **Bloc de preu:** fora «Manteniment opcional des de 40 €/mes». «Des de 900 €» amb poc pes visual.
- **FAQ:** igual en singular. «Quant costa una web a mida?» → «A partir de 900 € sense IVA. El preu final depèn de les funcionalitats i les integracions, i el manteniment, opcional, es pressuposta segons el projecte.» «Feu botigues online?» → «Fas botigues en línia?» «No. No faig botigues en línia.»
- **Enllaços nous:** a `/disseny-web-girona/` («Si només necessites una web per al teu negoci a Girona…»).

## /preus-pagina-web/
- **Title:** Quant costa una pàgina web? Preus tancats | KODIA
- **Description:** Preus clars, sense IVA: One Page 300 € i Corporativa 600 €. Manteniment opcional de 20, 30 o 45 €/mes amb domini i allotjament.
- **H1:** Quant costa una pàgina web? Preus i quotes
- **Intro:** «El preu d'una web depèn de quanta informació ha d'explicar i de què ha de fer. Treballo amb dos formats a preu tancat i, per als projectes especials, amb pressupost a mida. Tots els preus són sense IVA.»
- **Cos:** el bloc de plans de la portada (One Page + Corporativa amb selector), i a sota la línia «web a mida» amb poc pes (`preus.aMida`).
- **«Què passa després de publicar?»:** substitueix la taula vella (15 / des de 25 / des de 40 €/mes) per la dels plans: One Page 20 €/mes · Essencial 30 €/mes · Creixement 45 €/mes, i enllaç a `/manteniment-web/`. Tots els plans hi diuen «fins a 3 petits canvis al mes» (D4). Fora la frase vella «fins a tres canvis de textos o imatges al mes» (se substitueix per la nova).
- **FAQ, canvis:**
  - «El manteniment web és obligatori?» → «No. És opcional. Si no el contractes, necessitaràs el teu propi domini i allotjament, i els canvis que em demanis te'ls pressuposto un per un.»
  - «Quants canvis inclou el manteniment?» → «Tots els plans inclouen fins a 3 petits canvis al mes: canviar una imatge, un text o el logotip. Els que no facis un mes no s'acumulen al següent. Les seccions senceres o les funcions noves es pressuposten a part. El pla Creixement hi afegeix SEO local (cada mes reviso Search Console i ajusto els títols i els textos d'una pàgina) i un informe mensual.»
  - Pregunta nova «Mantens webs que no has fet tu?» → «No. Només mantinc les webs que faig jo. Si la teva et dona problemes, et puc fer una web nova.»
  - «Qui serà el titular del domini?», «Com es paga…», «Què passa si deixo de treballar…»: igual, en singular, amb «et dono els arxius de la web».
- **Schema:** les `Offer` passen a 300 € (One Page) i 600 € (Corporativa), `priceCurrency: EUR`, `valueAddedTaxIncluded: false`. L'`Offer` de 900 € (web a mida) es manté.

## /projectes/  →  «Feines fetes»
- **Title:** Feines fetes: webs reals per a negocis | KODIA
- **Description:** Webs reals fetes des de zero: Nivell A Oposicions, Vetfar i Eleus. Mira com són abans de demanar pressupost per a la teva.
- **H1:** Feines fetes
- **Intro:** «Cada web es fa des de zero per al negoci que la fa servir. Aquestes són algunes de les últimes.»
- **Cos:** el mateix patró que la secció «Feines fetes» de la portada (un cas gran + dos de secundaris), amb els textos de `content.json → feines.casos`. Nivell A amb «Lighthouse mòbil (landing d'anuncis): de 79 a més de 90». Vetfar i Eleus sense caixa de resultat. Fora els filtres «Tots / One Page / Corporatives / A mida» (amb tres projectes no aporten res).
- **FAQ:** «Quins projectes de disseny web heu fet a Girona?» → «Quines webs has fet?» «Al portfoli hi ha Nivell A Oposicions (web i landing d'anuncis per a una acadèmia d'oposicions), Vetfar (One Page per a una empresa de farratge) i Eleus (One Page per a una associació).» La resta, en singular.

## /revisio-digital/
- **Title:** Revisió gratuïta de la teva web | KODIA
- **Description:** Et reviso la web i la presència a Google del teu negoci i t'envio per escrit què milloraria primer. Gratuïta i sense compromís.
- **H1:** Revisió digital gratuïta del teu negoci
- **Intro:** «No tens clar què falla de la teva web? Me la miro, juntament amb com et troben a Google, i t'envio un resum per escrit amb el que funciona, el que no i què milloraria primer. És gratuïta i sense compromís.»
- **«Què analitzem?» → «Què miro?»:** Web, Fitxa de Google, Xarxes, Captació. (Les icones, en SVG.)
- **«Com funciona?»:** pas 5 «Si cal, fem una trucada curta per comentar els resultats» → «Si vols, en parlem en una videotrucada o trucada curta, que concertem per correu.» (D6: la revisió continua sent gratuïta.)
- **Formulari:** es mantenen els camps i el `formType` actuals (el que l'API ja accepta), però s'hi afegeixen la **casella de privacitat** i la **informació bàsica** literals de `legal/textos-formulari.md`. «Un professional revisarà…» → «La revisaré jo mateix. No és un informe automàtic.»

## /contacte/
- **Title:** Demana pressupost per a la teva web | KODIA
- **Description:** Explica'm el teu negoci i et responc en 1 dia laborable amb el que necessites i el preu. Sense compromís. info@kodia.cat
- **H1:** Explica'm el teu negoci i et dic què necessites (igual que `contacte.h2` de la portada)
- **Intro:** `contacte.intro` de la portada + «No cal que sàpigues quin tipus de web vols ni que ho tinguis tot preparat.»
- **Formulari:** el mateix component de 4 camps de la portada (Nom, Negoci, Correu electrònic, Què necessites?), amb la casella i la informació bàsica literals. Fora els camps Telèfon, Web actual (el placeholder de «Què necessites?» ja demana l'adreça) i Tipus de projecte.
- **Bloc «No tens clar per on començar?»:** es manté, amb enllaç a `/revisio-digital/`.
- **FAQ:** «On sou?» → «On és Kodia?» «Kodia és de Banyoles i fa webs per a negocis de tot Catalunya. Tot es fa a distància: pots escriure a info@kodia.cat o fer servir aquest formulari, i si cal en parlem per videotrucada o trucada, que concertem per correu.» «Quant trigueu a respondre?» → «Quant trigues a respondre?» «En 1 dia laborable, amb les primeres preguntes o una proposta d'enfocament.»
- **Schema:** `ContactPage`, amb `email` = info@kodia.cat i `addressLocality` Banyoles (vegeu PLA.md §5).
