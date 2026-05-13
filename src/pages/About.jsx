export default function About() {
  return (
    <div className="container mt-5" style={{ maxWidth: 720 }}>
      <div className="card p-5 shadow-sm">
        <h1 className="mb-4">About Axiom Mind</h1>
        <p className="lead text-muted">
          Axiom Mind is a free AI image generator powered by <a href="https://pollinations.ai" target="_blank" rel="noopener noreferrer">Pollinations.ai</a>.
          Type a prompt and get a generated image in seconds — no signup, no API key needed.
        </p>

        <h5 className="mt-4">How it works</h5>
        <p>
          Describe what you want to see. Be specific: mention subjects, styles, colors, lighting,
          or even artists. The AI interprets your words and creates a unique image.
        </p>

        <h5 className="mt-4">Tips</h5>
        <ul>
          <li>Use descriptive words: <em>beautiful, detailed, cyberpunk, cinematic</em></li>
          <li>Reference artists: <em>Van Gogh, Miyazaki, Picasso</em></li>
          <li>Specify render type: <em>Octane render, Unreal Engine, 3D</em></li>
          <li>Try different aspect ratios for varied results</li>
        </ul>

        <h5 className="mt-4">History</h5>
        <p>
          Your generated images are saved locally in your browser. Visit the History tab
          to browse, re-download, or copy prompts from past generations.
        </p>

        <p className="text-muted small mt-4 mb-0">
          Built with React 19 + Vite. No data is sent to any server beyond the image generation request.
        </p>
      </div>
    </div>
  )
}
