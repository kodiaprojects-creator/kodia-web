"""Helpers per generar pàgines interiors amb el sistema de la portada."""
from __future__ import annotations

import json
import re
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT = json.loads((ROOT / "docs/redisseny/content.json").read_text())
EMAIL = CONTENT["config"]["emailContacte"]["valor"]
SHOW_EMAIL = CONTENT["config"]["emailContacte"]["mostrar"]


def md_inline(text: str) -> str:
    """Markdown lleuger: **bold**, [text](url)."""

    def link_sub(m):
        return f"@@@L@@@{m.group(2)}@@@T@@@{m.group(1)}@@@E@@@"

    s = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", link_sub, text)
    s = escape(s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(
        r"@@@L@@@(.+?)@@@T@@@(.+?)@@@E@@@",
        lambda m: f'<a class="lnk" href="{m.group(1)}">{m.group(2)}</a>',
        s,
    )
    return s


def paragraphs(text: str) -> str:
    blocks = [b.strip() for b in re.split(r"\n\s*\n", text.strip()) if b.strip()]
    out = []
    for b in blocks:
        if b.startswith("- "):
            items = [md_inline(x[2:].strip()) for x in b.split("\n") if x.startswith("- ")]
            out.append("<ul>" + "".join(f"<li>{i}</li>" for i in items) + "</ul>")
        else:
            lines = [md_inline(x.strip()) for x in b.split("\n") if x.strip()]
            out.append("<p>" + "<br>".join(lines) + "</p>")
    return "\n".join(out)


def site_nav(active: str | None = None) -> str:
    nav = CONTENT["nav"]
    links = []
    for l in nav["enllacos"]:
        href = l["altresPagines"]
        links.append(f'<li><a href="{href}">{escape(l["text"])}</a></li>')
    cta = nav["cta"]["altresPagines"]
    return f'''<header class="nav site-nav" data-site-header>
<div class="wrap">
 <a class="logo" href="/">KODIA<i>.</i></a>
 <ul>{"".join(links)}</ul>
 <a class="btn" href="{cta}"><span class="mb">{escape(nav["cta"]["textMobil"])}</span><span class="dk">{escape(nav["cta"]["textEscriptori"])}</span></a>
</div>
</header>'''


def site_footer() -> str:
    peu = CONTENT["peu"]
    cols = peu.get("columnes")
    legal = "".join(f'<a href="{escape(l["href"])}">{escape(l["text"])}</a>' for l in peu["legal"])
    email_block = f'<div><a href="mailto:{EMAIL}">{EMAIL}</a></div>' if SHOW_EMAIL else "<div></div>"
    if cols:
        def col(title, items):
            links = "".join(f'<a href="{escape(i["href"])}">{escape(i["text"])}</a>' for i in items)
            return f'<div class="foot-col"><p class="foot-h">{escape(title)}</p><nav>{links}</nav></div>'

        mid = (
            col("Serveis", cols["serveis"])
            + col("Per a qui", cols["perAQui"])
            + col("Zones", cols["zones"])
        )
        extra = "".join(f'<a href="{escape(i["href"])}">{escape(i["text"])}</a>' for i in cols.get("extra", []))
        return f'''<footer class="site-footer">
<div class="wrap">
 <div><a class="logo" href="/">KODIA<i>.</i></a><p style="margin:10px 0 0">{escape(peu["descripcio"])}</p>
 <nav class="foot-extra" aria-label="Enllaços">{extra}</nav>
 {email_block}
 </div>
 <div class="foot-cols">{mid}</div>
 <div class="legal"><span>{escape(peu["copyright"])}</span>{legal}</div>
</div>
</footer>'''
    links = "".join(f'<a href="{escape(l["href"])}">{escape(l["text"])}</a>' for l in peu["enllacos"])
    return f'''<footer class="site-footer">
<div class="wrap">
 <div><a class="logo" href="/">KODIA<i>.</i></a><p style="margin:10px 0 0">{escape(peu["descripcio"])}</p></div>
 <nav aria-label="Peu">{links}</nav>
 {email_block}
 <div class="legal"><span>{escape(peu["copyright"])}</span>{legal}</div>
</div>
</footer>'''


def breadcrumb(items: list[tuple[str, str | None]]) -> str:
    """items: [(label, href|None), ...] last has href None."""
    lis = []
    ld = []
    for i, (label, href) in enumerate(items, 1):
        if href:
            lis.append(f'<li><a href="{href}">{escape(label)}</a></li>')
            ld.append(
                {
                    "@type": "ListItem",
                    "position": i,
                    "name": label,
                    "item": f"https://www.kodia.cat{href}",
                }
            )
        else:
            lis.append(f'<li aria-current="page">{escape(label)}</li>')
            ld.append({"@type": "ListItem", "position": i, "name": label})
    html = f'<nav class="crumbs" aria-label="Fil d\'Ariadna"><ol>{"".join(lis)}</ol></nav>'
    script = (
        '<script type="application/ld+json">\n'
        + json.dumps(
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": ld,
            },
            ensure_ascii=False,
            indent=2,
        )
        + "\n</script>"
    )
    return html, script


def plans_block(mode: str = "both", cta_href: str = "/contacte/") -> str:
    """mode: both | one | corp"""
    preus = CONTENT["preus"]
    op, corp = preus["onePage"], preus["corporativa"]
    op_inclou = "".join(f"<li>{escape(x)}</li>" for x in op["inclou"])
    corp_inclou = "".join(f"<li>{escape(x)}</li>" for x in corp["inclou"])
    tiers = []
    for t in corp["manteniments"]:
        tag = f'<span class="tag">{escape(t["etiqueta"])}</span>' if t.get("etiqueta") else ""
        mini = "".join(f"<li>{escape(x)}</li>" for x in t["inclou"])
        hi = " hi" if t.get("etiqueta") else ""
        tiers.append(
            f'<div class="tier{hi}">{tag}<div class="th2"><b>{escape(t["nom"])}</b>'
            f'<span><strong>{escape(t["preu"].replace("/mes","").strip())}</strong>/mes</span></div>'
            f'<ul class="mini">{mini}</ul></div>'
        )
    op_mant = escape(op.get("mantenimentEtiqueta", "Manteniment"))
    op_price = escape(op["manteniment"].replace("/mes", "").strip())
    one = f'''<div class="plan op">
   <p class="eyebrow">{escape(op["eyebrow"])}</p>
   <h3>{escape(op["nom"])}</h3>
   <p class="for">{escape(op["perAQui"])}</p>
   <div class="price">
    <div><small>Alta</small><strong>{escape(op["alta"])}</strong></div>
    <div><small>{op_mant}</small><strong>{op_price}</strong><span class="u">/mes</span></div>
   </div>
   <ul>{op_inclou}</ul>
   <a class="btn" href="{cta_href}">{escape(op["cta"])}</a>
  </div>'''
    corp_html = f'''<div class="plan corp">
   <p class="eyebrow">{escape(corp["eyebrow"])}</p>
   <h3>{escape(corp["nom"])}</h3>
   <p class="for">{escape(corp["perAQui"])}</p>
   <div class="price one"><div><small>Alta</small><strong>{escape(corp["alta"])}</strong></div></div>
   <ul>{corp_inclou}</ul>
   <p class="pick">{escape(corp["triaManteniment"])}</p>
   <div class="tiers">{"".join(tiers)}</div>
   <p class="note" style="margin-top:12px"><a class="lnk" href="/manteniment-web/">Què inclou cada manteniment →</a></p>
   <a class="btn" href="{cta_href}">{escape(corp["cta"])}</a>
  </div>'''
    if mode == "one":
        return f'<div class="plans plans-single">{one}</div>'
    if mode == "corp":
        return f'<div class="plans plans-single">{corp_html}</div>'
    amida = preus["aMida"]
    m = re.search(r"\[([^\]]+)\]\(([^)]+)\)", amida)
    if m:
        amida_html = (
            escape(amida[: m.start()])
            + f'<a class="lnk" href="{escape(m.group(2))}">{escape(m.group(1))}</a>'
            + escape(amida[m.end() :])
        )
    else:
        amida_html = escape(amida)
    return f'<div class="plans">{one}{corp_html}</div><p class="note">{amida_html}</p>'


def faq_block(items: list[dict], first_open: bool = True) -> str:
    parts = []
    for i, it in enumerate(items):
        op = " open" if first_open and i == 0 else ""
        parts.append(
            f'<details{op}><summary>{escape(it["q"])}</summary><p>{md_inline(it["a"])}</p></details>'
        )
    return f'<div class="faq-list">{"".join(parts)}</div>'


def faq_jsonld(items: list[dict], faq_id: str) -> str:
    data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": faq_id,
        "mainEntity": [
            {
                "@type": "Question",
                "name": it["q"],
                "acceptedAnswer": {"@type": "Answer", "text": it["a"]},
            }
            for it in items
        ],
    }
    return (
        '<script type="application/ld+json">\n'
        + json.dumps(data, ensure_ascii=False, indent=2)
        + "\n</script>"
    )


def contact_form_4() -> str:
    contacte = CONTENT["contacte"]
    fields = []
    for f in contacte["camps"]:
        err_id = f'{f["name"]}-error'
        req = " required" if f.get("obligatori") else ""
        attrs = f'id="c-{f["name"]}" name="{f["name"]}"{req}'
        if f.get("autocomplete"):
            attrs += f' autocomplete="{f["autocomplete"]}"'
        if f.get("inputmode"):
            attrs += f' inputmode="{f["inputmode"]}"'
        if f.get("placeholder"):
            attrs += f' placeholder="{escape(f["placeholder"])}"'
        attrs += f' aria-describedby="{err_id}"'
        ctrl = (
            f"<textarea {attrs}></textarea>"
            if f["type"] == "textarea"
            else f'<input type="{f["type"]}" {attrs}>'
        )
        fields.append(
            f'<div class="f" data-field="{f["name"]}"><label for="c-{f["name"]}">{escape(f["label"])}</label>'
            f'{ctrl}<p class="field-error" id="{err_id}" role="alert">{escape(f["error"])}</p></div>'
        )
    info = contacte["privacitat"]["informacioBasica"]
    info_html = md_inline(info).replace(
        EMAIL, f'<a href="mailto:{EMAIL}">{EMAIL}</a>'
    )
    # md_inline already escaped email; fix mailto
    info_html = re.sub(
        rf'(?<!mailto:)({re.escape(EMAIL)})',
        lambda m: f'<a href="mailto:{EMAIL}">{EMAIL}</a>',
        md_inline(info).replace(f'<a class="lnk" href="mailto:{EMAIL}">{EMAIL}</a>', f'<a href="mailto:{EMAIL}">{EMAIL}</a>'),
    )
    # simpler: use fragment from legal
    info_html = '''<strong>Protecció de dades.</strong> Responsable: Enric Corominas Gratacós (Kodia). Finalitat: respondre la teva consulta i, si ho demanes, enviar-te un pressupost. Legitimació: la teva sol·licitud i el teu consentiment. Destinataris: no cedim les dades a ningú, llevat d'obligació legal; els proveïdors d'allotjament i correu les tracten per compte nostre, alguns als EUA amb garanties adequades. Drets: accés, rectificació, supressió, oposició, limitació i portabilitat, escrivint a <a href="mailto:info@kodia.cat">info@kodia.cat</a>. Més informació a la <a href="/politica-de-privacitat/">política de privacitat</a>.'''
    confirm_title = escape(contacte["confirmacio"]["titol"])
    confirm_text = escape(contacte["confirmacio"]["text"])
    error_env = escape(contacte["errorEnviament"].replace("{emailContacte}", EMAIL))
    return f'''<form class="form" action="/api/contact" method="post" data-contact-form="contacte" data-validate="true" data-success-title="{confirm_title}" data-success-text="{confirm_text}" data-error-send="{error_env}" data-error-privacy="{escape(contacte["errorPrivacitat"])}" data-submitting-label="{escape(contacte["botoEnviant"])}">
  <input type="text" name="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
  {"".join(fields)}
  <div class="chk-wrap" data-field="privacitat">
  <label class="chk"><input type="checkbox" name="privacitat" value="acceptada" required aria-describedby="privacitat-error"><span>He llegit i accepto la <a href="/politica-de-privacitat/">política de privacitat</a>.</span></label>
  <p class="field-error" id="privacitat-error" role="alert">{escape(contacte["errorPrivacitat"])}</p>
  </div>
  <button class="btn or" type="submit">{escape(contacte["boto"].replace(" →",""))} <span aria-hidden="true">→</span></button>
  <p class="promise">{escape(contacte["promesa"])}</p>
  <p class="form-status" data-form-status hidden></p>
  <p class="form-info-dades">{info_html}</p>
</form>'''


def cta_final(title: str = "Parlem de la web que necessita el teu negoci", text: str | None = None) -> str:
    lead = text or "Explica'm el teu negoci i et dic què necessites, amb preu tancat."
    return f'''<section class="cta-final one"><div class="wrap" style="text-align:center">
  <h2>{escape(title)}</h2>
  <p style="max-width:34em;margin:14px auto 22px;color:#bdb8ae">{escape(lead)}</p>
  <a class="btn or" href="/contacte/">Demana pressupost <span aria-hidden="true">→</span></a>
</div></section>'''


def page_shell(
    *,
    title: str,
    description: str,
    canonical: str,
    breadcrumb_html: str,
    breadcrumb_ld: str,
    extra_ld: str,
    main_html: str,
    og_title: str | None = None,
) -> str:
    og_t = og_title or title
    return f'''<!DOCTYPE html>
<html class="scroll-smooth" lang="ca">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{escape(title)}</title>
    <meta name="description" content="{escape(description)}">
    <link rel="canonical" href="{canonical}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="ca_ES">
    <meta property="og:url" content="{canonical}">
    <meta property="og:title" content="{escape(og_t)}">
    <meta property="og:description" content="{escape(description)}">
    <meta property="og:site_name" content="KODIA">
    <meta property="og:image" content="https://www.kodia.cat/images/og-kodia.jpg">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{escape(og_t)}">
    <meta name="twitter:description" content="{escape(description)}">
    <meta name="twitter:image" content="https://www.kodia.cat/images/og-kodia.jpg">
    {breadcrumb_ld}
    {extra_ld}
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
    <link rel="preload" href="/fonts/hanken-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="stylesheet" href="/css/kodia.css">
</head>
<body class="kodia-portada">
{site_nav()}
<main>
<div class="wrap" style="padding-top:18px">{breadcrumb_html}</div>
{main_html}
</main>
{site_footer()}
<script src="/js/form.js" defer></script>
</body>
</html>
'''


def feines_block() -> str:
    feines = CONTENT["feines"]
    featured = None
    small = []
    for caso in feines["casos"]:
        meta_bits = [m.strip() for m in caso["meta"].split("·")]
        meta_html = "<span>·</span>".join(f"<span>{escape(m)}</span>" for m in meta_bits)
        img = "/images/projectes/" + Path(caso["imatge"]).name
        img640 = img.replace("960x600", "640x400")
        res = ""
        if caso.get("resultat") and caso["resultat"].get("publicar"):
            v = caso["resultat"]["valor"]
            # Prefer phrasing from existents if needed - keep content.json
            v_html = escape(v).replace("+90", '<span class="ar">+90</span>') if "+90" in v else escape(v)
            res = f'<div class="res"><span class="k">{escape(caso["resultat"]["etiqueta"])}</span><span class="v">{v_html}</span></div>'
        text = f'<div class="meta">{meta_html}</div><h3>{escape(caso["nom"])}</h3><p>{escape(caso["text"])}</p>{res}<p><a class="lnk" href="{escape(caso["url"])}" rel="noopener" target="_blank">{escape(caso["textEnllac"])}</a></p>'
        pic = f'<div class="pic"><img src="{img}" srcset="{img640} 640w, {img} 960w" sizes="(max-width:700px) 100vw, 560px" width="960" height="600" alt="{escape(caso["alt"])}" loading="lazy" decoding="async"></div>'
        if caso.get("destacat"):
            featured = f'<article class="case feat"><div>{text}</div>{pic}</article>'
        else:
            small.append(f'<article class="case">{pic}<div>{text}</div></article>')
    return f"{featured}<div class=\"small\">{''.join(small)}</div>"
