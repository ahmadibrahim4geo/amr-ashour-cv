# Amr Ashour, PhD — Personal Website

Static personal / CV website. Ready for **GitHub Pages** (no build step).

## Files
- `index.html` — all content
- `styles.css` — design (hydro theme, responsive, dark mode, print-friendly)
- `script.js` — menu, theme, animations, skill filters, contact form
- `.nojekyll` — tells GitHub Pages to serve files as-is

## Preview locally
Just double-click `index.html`, or run:

```powershell
cd "C:\Users\ahmad\Desktop\Amr Ashour _ CV"
python -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages (3 steps)

**Option A — via web (easiest):**
1. Create a new repo on GitHub, e.g. `amr-ashour-cv`
2. Upload these files: `index.html`, `styles.css`, `script.js`, `.nojekyll`
3. Go to repo **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main` / `/ (root)` → Save.
   Your site will be live at `https://YOUR-USERNAME.github.io/amr-ashour-cv/`

**Option B — via git:**
```bash
cd "Amr Ashour _ CV"
git init
git add index.html styles.css script.js .nojekyll
git commit -m "Personal CV website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/amr-ashour-cv.git
git push -u origin main
# then enable Pages as above
```

## Customize
- Edit name, phone, emails directly in `index.html`
- Colors in `styles.css` under `:root`
- Photo: replace the `AA` avatar block with `<img src="photo.jpg">` and add `photo.jpg` to the repo.
