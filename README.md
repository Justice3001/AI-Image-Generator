# Axiom Mind

> AI image generation powered by Pollinations.ai — no API keys, no signup, no backend.

Axiom Mind is a single-page application that turns text prompts into AI-generated images. Built with React 19 and Vite, it runs entirely in the browser with zero server-side dependencies.

---

## Features

- **Text-to-Image Generation** — Describe what you want and get a unique image in seconds
- **Aspect Ratio Presets** — Choose from Square (1:1), Portrait (9:16), or Landscape (16:9)
- **Example Gallery** — Browse included sample images and use their prompts as a starting point
- **Generation History** — All generated images are saved automatically to your browser's local storage
- **Dark Mode** — Toggle between light and dark themes (preference is persisted)
- **Zero Dependencies** — No backend, no API keys, no signup required

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm run preview
```

Outputs a static site to `dist/` that can be deployed to any static host (Vercel, Netlify, GitHub Pages, etc.).

---

## How It Works

1. **Enter a prompt** describing the image you want
2. Optionally select an **aspect ratio** (defaults to 1:1 square)
3. Click **Generate Image**
4. The app constructs a URL and sends it to [Pollinations.ai](https://pollinations.ai), which generates the image on-demand
5. The image appears below — **Download**, **Share**, or **Retry** from there
6. Every successful generation is automatically saved to the **History** tab

---

## Project Structure

```
src/
├── main.jsx                 # Entry point
├── App.jsx                  # Router + dark mode state
├── index.css                # Global styles
├── components/
│   └── Navbar.jsx           # Navigation with dark mode toggle
└── pages/
    ├── ImageGenerator.jsx   # Main generation page
    ├── History.jsx          # Local-storage generation history
    └── About.jsx            # About / info page
```

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [React 19](https://react.dev) | UI framework |
| [Vite](https://vitejs.dev) | Build tool and dev server |
| [Bootstrap 5](https://getbootstrap.com) | CSS framework and components |
| [React Router 7](https://reactrouter.com) | Client-side routing |
| [Pollinations.ai](https://pollinations.ai) | Free, no-auth image generation API |

---

## Contributing

Contributions are welcome. Open an issue or pull request for bugs, features, or improvements.

---

## License

[MIT](LICENSE)
