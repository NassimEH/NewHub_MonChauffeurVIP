"""Recolore les visuels hero du template (violet) vers la charte MonChauffeurVIP (or)."""

from colorsys import hsv_to_rgb, rgb_to_hsv
from PIL import Image, ImageDraw, ImageFont
import os
import shutil

IMAGES = os.path.normpath(
    os.path.join(os.path.dirname(__file__), "..", "images")
)

GOLD = (196, 165, 116)
GOLD_DARK = (166, 139, 91)
GOLD_LIGHT = (232, 214, 184)
CREAM = (250, 247, 240)


def is_purple(r: int, g: int, b: int) -> bool:
    return b > r + 25 and b > g + 15 and b > 80


def is_lavender(r: int, g: int, b: int) -> bool:
    return (
        r > 230
        and g > 225
        and b > 245
        and b > r
        and (b - r) < 25
    )


def shift_pixel(r: int, g: int, b: int, a: int) -> tuple[int, int, int, int]:
    if a < 8:
        return r, g, b, a

    if is_lavender(r, g, b):
        t = min(1.0, (b - r) / 30.0)
        nr = int(CREAM[0] * (1 - t * 0.3) + r * t * 0.3)
        ng = int(CREAM[1] * (1 - t * 0.3) + g * t * 0.3)
        nb = int(CREAM[2] * (1 - t * 0.3) + b * t * 0.2)
        return nr, ng, nb, a

    if not is_purple(r, g, b):
        return r, g, b, a

    h, s, v = rgb_to_hsv(r / 255, g / 255, b / 255)
    if s < 0.12:
        return r, g, b, a

  # Violet vif → or ; violet pâle → or clair
    if v > 0.75 and s < 0.35:
        target = GOLD_LIGHT
    elif v > 0.45:
        target = GOLD
    else:
        target = GOLD_DARK

    blend = min(1.0, s * 1.2 + 0.35)
    nr = int(r * (1 - blend) + target[0] * blend)
    ng = int(g * (1 - blend) + target[1] * blend)
    nb = int(b * (1 - blend) + target[2] * blend)
    return nr, ng, nb, a


def recolor_image(path: str) -> None:
    im = Image.open(path).convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            px[x, y] = shift_pixel(r, g, b, a)
    im.save(path, "PNG", optimize=True)
    print(f"Recolored {os.path.basename(path)}")


def update_user_card(path: str) -> None:
    im = Image.open(path).convert("RGBA")
    recolor_image(path)
    im = Image.open(path).convert("RGBA")
    draw = ImageDraw.Draw(im)
    w, h = im.size

    # Masque la zone texte anglaise
    draw.rectangle((12, h - 72, w - 12, h - 10), fill=(255, 255, 255, 255))

    try:
        font_bold = ImageFont.truetype("arialbd.ttf", 22)
        font_reg = ImageFont.truetype("arial.ttf", 14)
    except OSError:
        font_bold = ImageFont.load_default()
        font_reg = ImageFont.load_default()

    draw.text((16, h - 68), "5000+", fill=(31, 27, 20, 255), font=font_bold)
    draw.text((16, h - 42), "Avis clients", fill=(62, 58, 52, 255), font=font_reg)
    im.save(path, "PNG", optimize=True)
    print(f"Updated text on {os.path.basename(path)}")


def backup(name: str) -> None:
    src = os.path.join(IMAGES, name)
    bak = os.path.join(IMAGES, f"{name.replace('.png', '')}.template.png")
    if not os.path.exists(bak):
        shutil.copy2(src, bak)


if __name__ == "__main__":
    for name in ("hero-img.png", "hero-user-img.png", "hero_bg.png"):
        backup(name)

    recolor_image(os.path.join(IMAGES, "hero-img.png"))
    recolor_image(os.path.join(IMAGES, "hero_bg.png"))
    update_user_card(os.path.join(IMAGES, "hero-user-img.png"))
