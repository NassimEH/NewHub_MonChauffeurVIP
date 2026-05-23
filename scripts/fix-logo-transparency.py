from PIL import Image
import os


def remove_black_background(src_path, dst_path, threshold=40):
    im = Image.open(src_path).convert("RGBA")
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
        pixels[x, y] = (r, g, b, 0)
        stack.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])

    im.save(dst_path, "PNG", optimize=True)
    out = Image.open(dst_path)
    alpha = out.split()[-1]
    trans = sum(1 for v in alpha.getdata() if v < 10)
    print(f"Saved {dst_path} ({w}x{h}) - {round(100 * trans / (w * h), 1)}% transparent")


def make_square_favicon(src_path, dst_path, size):
    fav = Image.open(src_path).convert("RGBA")
    fav.thumbnail((size, size), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    ox = (size - fav.width) // 2
    oy = (size - fav.height) // 2
    canvas.paste(fav, (ox, oy), fav)
    canvas.save(dst_path, "PNG", optimize=True)
    print(f"Saved {dst_path}")


if __name__ == "__main__":
    project = os.path.normpath(os.path.join(os.path.dirname(__file__), ".."))
    base = os.path.join(project, "images")
    assets = r"C:\Users\nassi\.cursor\projects\c-Users-nassi-Desktop-Projets-informatiques-MonChaufeurVIP-MonChauffeurVIP-Landing-mobile\assets"

    asset_files = os.listdir(assets)
    src_logo = next(f for f in asset_files if "MonChauffeurVIP__1_" in f)
    src_fav = next(f for f in asset_files if "Re_ductible" in f)

    remove_black_background(
        os.path.join(assets, src_logo),
        os.path.join(base, "logo-monchauffeurvip.png"),
    )
    remove_black_background(
        os.path.join(assets, src_fav),
        os.path.join(base, "favicon-source.png"),
    )
    make_square_favicon(
        os.path.join(base, "favicon-source.png"),
        os.path.join(base, "favicon.png"),
        180,
    )
    make_square_favicon(
        os.path.join(base, "favicon-source.png"),
        os.path.join(base, "favicon-32.png"),
        32,
    )
