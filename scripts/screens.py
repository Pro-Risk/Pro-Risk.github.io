"""Готовит скриншоты для сайта.

Берёт картинки из ../screenshots/<slug>/ (PNG, JPG, WebP), сжимает в WebP
в public/screenshots/<slug>/ и пишет размеры в src/data/screenshots.json.

Запуск из папки site:  python scripts/screens.py
"""
import json
import sys
from pathlib import Path

from PIL import Image

SITE = Path(__file__).resolve().parent.parent
SRC = SITE.parent / "screenshots"
OUT = SITE / "public" / "screenshots"
MANIFEST = SITE / "src" / "data" / "screenshots.json"
MAX_W = 1920
MAX_H = 1800
EXTS = {".png", ".jpg", ".jpeg", ".webp"}


def main() -> None:
    manifest: dict[str, list[dict]] = {}
    # папки с подчёркиванием (например _unused) пропускаем
    for folder in sorted(p for p in SRC.iterdir() if p.is_dir() and not p.name.startswith("_")):
        slug = folder.name
        files = sorted(f for f in folder.iterdir() if f.suffix.lower() in EXTS)
        if not files:
            continue
        (OUT / slug).mkdir(parents=True, exist_ok=True)
        items = []
        for f in files:
            im = Image.open(f)
            im = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") else "RGB")
            # широкие кадры ограничиваем по ширине, мобильные по высоте
            scale = min(1, MAX_W / im.width, MAX_H / im.height)
            if scale < 1:
                im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
            dst = OUT / slug / (f.stem + ".webp")
            im.save(dst, "WEBP", quality=84, method=6)
            items.append({
                "src": f"/screenshots/{slug}/{dst.name}",
                "width": im.width,
                "height": im.height,
                "name": f.stem,
            })
        manifest[slug] = items
        print(f"{slug}: {len(items)}")
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print("manifest:", MANIFEST)


if __name__ == "__main__":
    sys.exit(main())
