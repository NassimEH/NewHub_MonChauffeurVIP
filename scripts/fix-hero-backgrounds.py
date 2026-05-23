"""Supprime les fonds noirs des PNG hero et restaure hero_bg d'origine."""

from PIL import Image, ImageDraw, ImageFont
import os
import shutil

IMAGES = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "images"))

GOLD = (196, 165, 116)
GOLD_DARK = (166, 139, 91)
GOLD_LIGHT = (232, 214, 184)


def is_purple(r: int, g: int, b: int) -> bool:
    return b > r + 25 and b > g + 15 and b > 80


def recolor_purple(im: Image.Image) -> Image.Image:
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 8 or not is_purple(r, g, b):
                continue
            if b > 200:
                target = GOLD
            elif b > 120:
                target = GOLD_DARK
            else:
                target = GOLD_DARK
            blend = 0.85
            px[x, y] = (
                int(r * (1 - blend) + target[0] * blend),
                int(g * (1 - blend) + target[1] * blend),
                int(b * (1 - blend) + target[2] * blend),
                a,
            )
    return im


def remove_edge_black(im: Image.Image, threshold: int = 42) -> Image.Image:
    im = im.convert("RGBA")
    w, h = im.size
    pixels = im.load()

    def is_bg(r, g, b, a):
        if a < 10:
            return True
        return r <= threshold and g <= threshold and b <= threshold

    visited = [[False] * w for _ in range(h)]
    stack = []
    for x in range(w):
        for y in (0, h - 1):
            if is_bg(*pixels[x, y]):
                stack.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if is_bg(*pixels[x, y]):
                stack.append((x, y))

    while stack:
        x, y = stack.pop()
        if x < 0 or x >= w or y < 0 or y >= h or visited[y][x]:
            continue
        r, g, b, a = pixels[x, y]
        if not is_bg(r, g, b, a):
            continue
        visited[y][x] = True
        pixels[x, y] = (0, 0, 0, 0)
        stack.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])

    return im


def fix_hero_img():
    src = os.path.join(IMAGES, "hero-img.template.png")
    out = os.path.join(IMAGES, "hero-img.png")
    im = recolor_purple(Image.open(src))
    im = remove_edge_black(im)
    im.save(out, "PNG", optimize=True)
    trans = sum(1 for v in im.split()[-1].getdata() if v < 10)
    print(f"hero-img.png — {round(100 * trans / (im.size[0] * im.size[1]), 1)}% transparent")


def fix_hero_user():
    src = os.path.join(IMAGES, "hero-user-img.template.png")
    out = os.path.join(IMAGES, "hero-user-img.png")
    im = recolor_purple(Image.open(src))
    im = remove_edge_black(im)
    w, h = im.size
    draw = ImageDraw.Draw(im)
    draw.rectangle((6, h - 82, w - 6, h - 4), fill=(255, 255, 255, 255))
    try:
        fb = ImageFont.truetype("arialbd.ttf", 26)
        fr = ImageFont.truetype("arial.ttf", 15)
    except OSError:
        fb = fr = ImageFont.load_default()
    draw.text((18, h - 74), "5000+", fill=(31, 27, 20, 255), font=fb)
    draw.text((18, h - 42), "Avis clients", fill=(80, 72, 60, 255), font=fr)
    im.save(out, "PNG", optimize=True)
    print("hero-user-img.png — OK")


def restore_hero_bg():
    src = os.path.join(IMAGES, "hero_bg.template.png")
    dst = os.path.join(IMAGES, "hero_bg.png")
    shutil.copy2(src, dst)
    print("hero_bg.png — restauré (template original)")


if __name__ == "__main__":
    restore_hero_bg()
    fix_hero_img()
    fix_hero_user()
