# 🎉 Deployment Guide - Happy 50th Birthday Animation

## Easiest Option: Netlify (Recommended)

1. Go to **https://app.netlify.com/drop**
2. Drag and drop the `mom` folder (which contains `index.html`) onto the page
3. Wait for deployment to complete
4. Share the generated link with anyone!

**Link format:** `https://[random-name].netlify.app`

---

## Option 2: GitHub Pages

1. Create a GitHub account (if you don't have one)
2. Create a new repository named `birthday-animation`
3. Push your project to GitHub:
   ```bash
   cd C:\Users\khval\OneDrive\Desktop\Khadi\Coding Dojo\html_css_js_projects\moms50_bd\mom
   git init
   git add .
   git commit -m "Birthday animation"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/birthday-animation.git
   git push -u origin main
   ```
4. Go to repository Settings → Pages → Select "main" branch
5. Wait for deployment
6. Share the link: `https://YOUR_USERNAME.github.io/birthday-animation`

---

## Option 3: Vercel

1. Go to **https://vercel.com**
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Deploy with one click!

**Link format:** `https://[project-name].vercel.app`

---

## Project Structure for Deployment

Make sure your deployment folder contains:
- `index.html` (main file)
- `css/styles.css`
- `js/script.js`
- `../flowers/` (referenced folder with style.css)

✨ **The Netlify drag-and-drop method is fastest!** ✨
