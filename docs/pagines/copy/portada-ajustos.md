# Ajustos de copy a la portada (`content.json`, branca `redisseny-portada`)

La portada ja està implementada, però les decisions de l'Enric del 2/11/2026 (D1, D3, D4) en canvien alguns textos. Cursor els aplica **a `content.json` i a l'HTML de la portada** a la fase 1, abans de res més. Tota la resta de la portada no es toca.

| Clau de `content.json` | Ara | Passa a ser | Per què |
|---|---|---|---|
| `seo.description` | «…Des de 300 €, amb domini i allotjament inclosos. Una sola persona…» | «Webs a preu tancat per a autònoms, oficis i comerços. Des de 300 €, i manteniment opcional amb domini i allotjament. Una sola persona t'atén de principi a fi.» | D3 |
| `hero.tiquet.files[1]` (Termini) | `publicar: false` | `publicar: true`, valor «7–10 dies». Fora la clau `pendent`. | D1 (el tiquet és de la One Page de 300 €) |
| `hero.tiquet.files[2]` (Domini i allotjament) | «Inclosos» | «Inclosos al manteniment» | D3 |
| `unaPersona.punts[3].text` | «El manteniment inclou domini, allotjament i incidències. Amb el pla Creixement, també canvis cada mes.» | «El manteniment inclou domini, allotjament, incidències i fins a 3 petits canvis al mes. Amb el pla Creixement, també SEO local i un informe mensual.» | D4 |
| `preus.h2` | «Un preu per fer-la. Una quota perquè funcioni.» | igual (la quota continua existint, ara opcional) | — |
| `preus.intro` | «Tria el tipus de web i, si és corporativa, el manteniment. Totes les quotes inclouen domini i allotjament. Preus sense IVA.» | «Tria el tipus de web i, si vols, el manteniment. Tots els manteniments inclouen domini, allotjament i fins a 3 petits canvis al mes. Preus sense IVA.» | D3, D4 |
| `preus.onePage.manteniment` | «20 €/mes» | «20 €/mes» amb l'etiqueta visual «Manteniment opcional» al costat (o «+ 20 €/mes opcional»). | D3 |
| `preus.onePage.inclou[4]` | «Domini, allotjament i incidències» | «Manteniment: domini, allotjament, incidències i fins a 3 petits canvis al mes» | D4 |
| `preus.corporativa.triaManteniment` | «I tria el manteniment:» | «I tria el manteniment (opcional):» | D3 |
| `preus.corporativa.manteniments[0].inclou` | Domini i allotjament · Incidències i suport | Domini i allotjament · Incidències i suport · **Fins a 3 petits canvis al mes** | D4 |
| `preus.corporativa.manteniments[1].inclou` | Tot el de l'Essencial · Canvis cada mes · SEO local · Informe mensual | Tot el de l'Essencial · SEO local: cada mes, revisió de Search Console i ajust d'una pàgina · Informe mensual | D4 |
| `proces.total` | `publicar: false` | `publicar: true`, text «Total: 7–10 dies per a una One Page i unes dues setmanes per a una Corporativa, des que tinc el teu material.» Fora `pendent`. | D1 |
| `faq.items[1].a` | «…La quota mensual comença quan la web està publicada.» | «El 50 % en començar i el 50 % en acabar. Si contractes el manteniment, la quota comença quan la web està publicada.» | D3 |
| `faq.items[2].q` / `.a` | «Què inclou la quota mensual?» / «Sempre: domini, allotjament i incidències. El pla Creixement hi afegeix canvis cada mes, SEO local i un informe mensual…» | «Què inclou el manteniment? És obligatori?» / «És opcional. Inclou sempre domini, allotjament, incidències i fins a 3 petits canvis al mes (una imatge, un text, el logotip). El pla Creixement hi afegeix SEO local (cada mes reviso Search Console i ajusto els títols i els textos d'una pàgina) i un informe mensual. Les seccions o funcions noves es pressuposten a part.» | D3, D4 |

La resta de blocs amb `publicar: false` (resultats de Vetfar i Eleus, testimonis) continuen ocults.

Si la portada té JSON-LD amb `Offer`, no canvia: 300 € i 600 € d'alta.
