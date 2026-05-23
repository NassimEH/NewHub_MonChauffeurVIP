from colorsys import rgb_to_hsv
from PIL import Image, ImageDraw, ImageFont
import os
import shutil

IMAGES = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "images"))
GOLD = (196, 165, 116)
GOLD_DARK = (166, 139, 91)
GOLD_LIGHT = (232, 214, 184)
CREAM = (250, 247, 240)


def is_purple(r, g, b):
    return b > r + 25 and b > g + 15 and b > 80


def shift_pixel(r, g, b, a):
    if a < 8 or not is_purple(r, g, b):
        return r, g, b, a
    h, s, v = rgb_to_hsv(r / 255, g / 255, b / 255)
    if s < 0.12:
        return r, g, b, a
    target = GOLD_LIGHT if v > 0.75 and s < 0.35 else GOLD if v > 0.45 else GOLD_DARK
    blend = min(1.0, s * 1.2 + 0.35)
    return (
        int(r * (1 - blend) + target[0] * blend),
        int(g * (1 - blend) + target[1] * blend),
        int(b * (1 - blend) + target[2] * blend),
        a,
    )


src = os.path.join(IMAGES, "hero-user-img.template.png")
out = os.path.join(IMAGES, "hero-user-img.png")
shutil.copy2(src, out)
im = Image.open(out).convert("RGBA")
px = im.load()
w, h = im.size
for y in range(h):
    for x in range(w):
        px[x, y] = shift_pixel(*px[x, y])

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
print("OK")
