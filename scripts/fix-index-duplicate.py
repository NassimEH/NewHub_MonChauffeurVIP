from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
index_path = ROOT / "index.html"
snippet_path = ROOT / "snippets" / "mcv-hub-why-section.html"

text = index_path.read_text(encoding="utf-8")
snippet = snippet_path.read_text(encoding="utf-8")

start = text.index('    <section id="mcv-hub-why"')
marker = "    <!-- Footer-Section start -->"
first_footer = text.index(marker, start)
second_footer = text.index(marker, first_footer + 1)

before = text[:start]
after = text[second_footer:]
after = after.replace(
    '<img src="images/logo%20header.png" alt="MonChauffeurVIP"',
    '<img class="mcv-brand-logo__img" src="images/logo%20header.png" alt="MonChauffeurVIP — Hub"',
    1,
)

out = before + snippet + "\n\n    " + after
index_path.write_text(out, encoding="utf-8", newline="\n")
print(f"Fixed {index_path.name}: {len(out.splitlines())} lines")
