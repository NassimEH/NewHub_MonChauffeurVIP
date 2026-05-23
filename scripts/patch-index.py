from pathlib import Path

root = Path(__file__).resolve().parent.parent
index = (root / "index.html").read_text(encoding="utf-8")
why = (root / "snippets/mcv-hub-why-section.html").read_text(encoding="utf-8")
footer = (root / "snippets/mcv-footer-hub.html").read_text(encoding="utf-8")

head = index[: index.find("    <!--Best Features-->")]
head = head.replace('href="#mcv-features"', 'href="#mcv-hub-why"')
head = head.replace(
    'aria-label="Aller à la section suivante"',
    'aria-label="Aller à la section Pourquoi ce hub"',
)

footer_index = footer.replace(
    '<li><a href="index.html">Accueil hub</a></li>',
    '<li><a href="index.html#mcv-hero">Accueil</a></li>\n'
    '                  <li><a href="index.html#mcv-hub-why">Pourquoi ce hub ?</a></li>',
)
footer_index = footer_index.replace(
    'href="index.html" class="mcv-footer-logo"',
    'href="index.html#mcv-hero" class="mcv-footer-logo"',
)

tail_start = index.find('  <div class="purple_backdrop">')
tail = index[tail_start:]

new_index = head + "\n" + why + "\n\n" + footer_index + "\n\n" + tail
(root / "index.html").write_text(new_index, encoding="utf-8")
print("index.html updated", len(new_index))
