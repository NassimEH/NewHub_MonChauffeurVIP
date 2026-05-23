from pathlib import Path

root = Path(__file__).resolve().parent.parent
footer = (root / "snippets/mcv-footer-hub.html").read_text(encoding="utf-8")

pages = {
    "monchauffeurvip.html": "sections-monchauffeurvip.html",
    "montaxivip.html": "sections-montaxivip.html",
    "tld.html": "sections-tld.html",
    "blog.html": "sections-blog.html",
    "application-mobile.html": "sections-application-mobile.html",
}


def hero_section_end(html: str) -> int:
    hero_pos = html.find('id="mcv-service-hero"')
    if hero_pos == -1:
        hero_pos = html.find('id="mcv-app-hero"')
    if hero_pos == -1:
        raise SystemExit("Hero section not found")
    scroll_pos = html.find("mcv-hero-scroll", hero_pos)
    if scroll_pos == -1:
        raise SystemExit("Hero scroll link not found")
    end = html.find("</section>", scroll_pos)
    if end == -1:
        raise SystemExit("Hero closing tag not found")
    return end + len("</section>")


for page_name, sections_file in pages.items():
    path = root / page_name
    html = path.read_text(encoding="utf-8")
    sections = (root / "snippets" / sections_file).read_text(encoding="utf-8")

    start_footer = html.find("    <footer")
    if start_footer == -1:
        raise SystemExit(f"No footer in {page_name}")

    tail_start = html.find('    <div class="purple_backdrop">', start_footer)
    if tail_start == -1:
        tail_start = html.find('  <div class="purple_backdrop">', start_footer)
    tail = html[tail_start:]

    head = html[: hero_section_end(html)]

    head = head.replace(
        'class="mcv-hero-scroll" aria-label="Retour au hub MonChauffeurVIP"',
        'class="mcv-hero-scroll" href="#mcv-features" aria-label="Aller à la section suivante"',
    )
    if 'href="index.html" class="mcv-hero-scroll"' in head:
        head = head.replace(
            'href="index.html" class="mcv-hero-scroll"',
            'href="#mcv-features" class="mcv-hero-scroll"',
        )
    head = head.replace('href="#mcv-svc-intro"', 'href="#mcv-features"')

    new_html = head + "\n\n" + sections + "\n\n" + footer + "\n\n" + tail
    path.write_text(new_html, encoding="utf-8")
    print(f"Updated {page_name}")
