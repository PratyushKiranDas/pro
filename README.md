# 🌸 Happy Birthday, Pratyoyee! (Pro) 🌸

A responsive, romantic, pastel-themed birthday celebration website built with HTML5, CSS3, and modern vanilla JavaScript.

---

## 🎨 Design & Aesthetic Theme
- **Color Palette**: Soft Pastel Pinks (`#FFD1DC`, `#F4C2C2`, `#FFE4EC`), Lavender (`#E6E6FA`, `#DCD0FF`, `#C8B6FF`), and Creamy White (`#FFFDD0`, `#FAF8F2`).
- **Typography**: Google Fonts (*Playfair Display*, *Dancing Script*, *Outfit*, and *Sacramento*).
- **Vibe**: Romantic, soft, modern, and warm with gentle glassmorphism, washi-tape accents, 3D gift unboxing, and responsive micro-animations.

---

## ✨ Features Included

1. **Hero Section with Avatar & Name Toggle**:
   - Title: *"Happy Birthday, Pratyoyee!"*
   - Featured circular glowing portrait avatar with a *"Birthday Queen 👑"* badge and rotating pastel gradient halo.
   - Interactive badge toggle switches between **"Pratyoyee"** and **"Pro 🌸"** with an elastic bounce animation and particle sparkles.
   - Ambient canvas with continuous falling pastel confetti petals and floating pastel balloons.

2. **3D "Open Present" Gift Box & Keepsake Letter**:
   - Wrapped 3D gift box with ribbon and bow, gentle hover lift, and a pulsing *"Tap to Unwrap! 🎀"* badge.
   - On click: Plays a celebratory confetti burst cannon (110+ physics particles) and pops open a wax-sealed surprise birthday letter modal featuring a pinned mini-polaroid keepsake of best friends!
   - Includes a *"More Confetti! 🎉"* button inside the modal!

3. **Polaroid Photo Gallery with 3D Flip & Full-Screen Lightbox**:
   - 5 aesthetic Polaroid cards featuring real photos of Pratyoyee (Pro):
     - **Card 1**: Double Trouble & Birthday Joy 🎀 *(Unfiltered Smiles • Forever Duo)*
     - **Card 2**: Riverside Breeze & Free Spirit 🌊 *(Serene Days • Gentle Whispers)*
     - **Card 3**: Aesthetic Soul & Poetry 📖 *(Timeless Grace • Old Soul Vibe)*
     - **Card 4**: Festive Radiance & Grace ✨ *(Celebration Nights • Pure Glow)*
     - **Card 5**: Boss Lady Energy 💼 *(Unstoppable • Sharp & Chic)*
   - **Click to Flip**: Smoothly rotates 180° in 3D to reveal personalized handwritten memory notes, stamps, and cute doodle stickers.
   - **🔍 Zoom Button**: Tap the magnifier icon to view any photo in full HD inside a soft glassmorphic lightbox with captions.

4. **"Reasons Why You're Amazing, Pro" Accordion**:
   - Expandable accordion cards tailored to her unique personality, charm, grace, intellect, and loyalty with custom heart bullet points (`💖`).
   - Includes *"Expand All 🌸"* and *"Collapse All 🍃"* buttons.

5. **Floating Minimalist Music Player**:
   - Plays custom dedicated background melody soundtrack (**`song.mpeg`**) with seamless looping.
   - **Smart Autoplay**: Begins playback automatically with zero-friction fallback on first user interaction to comply with modern browser media policies.
   - **Animated Sound Equalizer**: Responsive sound wave equalizer bars that animate dynamically during playback.
   - **Polyphonic Web Audio Fallback**: Built-in 3-track synthesizer music box engine.

6. **"Make a Birthday Wish" Counter (Real-Time Global Sync & Persistence)**:
   - **Worldwide Real-Time Sync**: Synchronized across all users, browsers, and devices using a global cloud counter API. When any friend taps the wish button, the counter updates live across everyone's screens with a celebratory bounce animation.
   - **Persistent Storage**: Utilizes dual-layer storage (`CountAPI` + `localStorage`) so wish totals are never lost when closing the tab or browser.
   - **Micro-Interactions**: Floating multi-emoji particles (🎂, ✨, 💖, 🌸, 🎈, ⭐) float upwards with melodic ascending chimes.

---

## 📁 Project Structure

```text
├── index.html            # Main website structure & semantic HTML5 markup
├── style.css             # Pastel design system, animations, & responsive styles
├── script.js             # Interactive logic, audio engine, cloud sync, & particle canvases
├── song.mpeg             # Dedicated background music track
├── README.md             # Project documentation & setup instructions
├── .vscode/
│   └── launch.json       # VS Code one-click browser launch configurations (F5)
└── images/               # High-resolution gallery & keepsake photographs
    ├── photo-birthday-besties.jpg
    ├── photo-boss-lady.jpg
    ├── photo-candid-monochrome.jpg
    ├── photo-festive-elegance.jpg
    ├── photo-riverside-breeze.jpg
    └── photo-saree-aesthetic.jpg
```

---

## 🚀 How to Run Locally

### Option 1: Using `npx serve` (Recommended)
```bash
npx serve . -p 8888
```
Then visit: **[http://localhost:8888](http://localhost:8888)**

### Option 2: Using Python
```bash
python -m http.server 8888
```
Then visit: **[http://localhost:8888](http://localhost:8888)**

### Option 3: Via VS Code (Run & Debug)
Press **F5** or navigate to the **Run & Debug** tab in VS Code and choose **"Launch in Chrome"** or **"Launch in Edge"**.
