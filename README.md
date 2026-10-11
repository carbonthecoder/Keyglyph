# keyglyph

> generative keystroke calligraphy & vector signature synthesis.

[**Live Demo ↗**](https://keyglyph.vercel.app/) • [**Portfolio**](https://ibrahim.is-cool.dev/) • [**GitHub**](https://github.com/carbonthecoder)

---

### ~/preview

<!-- Add your replay video or gif here -->
<!-- ![Keyglyph Demo](public/demo.gif) -->

Turn your name into a kinetic vector signature based on physical keyboard geometry.

---

### ~/what-is-it

Every time you type a word, your fingers travel through physical 2D coordinates across your keyboard. **Keyglyph** maps every character to its spatial centroid, interpolating sequential keystrokes into a continuous vector path.

The result is a generative visual fingerprint shaped by the spelling of your name and the layout of the keys.

---

### ~/features

- **Multiple Layouts**: QWERTY, Colemak, Dvorak, AZERTY, and Workman.
- **Curve Mathematics**: Linear vectors, Simple Curves, Quadratic Bezier, Cubic Bezier, and Catmull-Rom splines.
- **Parametric Controls**: Adjustable curve tension slider and line weight (1px – 8px).
- **Aesthetics**: Solid color picker, dual-stop custom Gradients, and Neon Glow.
- **Kinetic Replay**: Real-time stroke-by-stroke animated replay.
- **Distraction-Free Canvas**: Physical keys smoothly fade out after 2 seconds of inactivity to isolate the pure signature. Hovering the keys brings them back instantly.
- **Acoustic Feedback**: Synthetic mechanical switch audio generated via the Web Audio API.
- **Lossless Exports**: One-click **Copy SVG** (paste directly into Figma & Illustrator), plus **Export SVG** and high-res **PNG** downloads.

---

### ~/quickstart

```bash
# Clone repository
git clone https://github.com/carbonthecoder/Keyglyph.git

# Navigate to folder
cd Keyglyph

# Install packages
npm install

# Run locally
npm run dev
```

---

### ~/tech-stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Vector Engine**: Custom SVG Bezier & Catmull-Rom Spline generation
- **Audio Engine**: Web Audio API mechanical oscillator synthesis
- **Icons**: Lucide React

---

### ~/inspiration

A creative nod to [cnrad's](https://signature.cnrad.dev/) digitized signatures, expanded with extra layouts, curve tension controls, replay animation, audio feedback, and vector export tools.

---

### ~/license

MIT License © 2026 [Carbon](https://github.com/carbonthecoder)
