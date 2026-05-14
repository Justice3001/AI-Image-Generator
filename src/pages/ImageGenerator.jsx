import { useState } from 'react'

const cards = [
  { id: 1, img: '/assets/girl.webp', title: 'LINE ART', text: 'An elegant woman in a 1920s flapper dress, pearls, and a feathered headband.' },
  { id: 2, img: '/assets/boat.webp', title: 'CRAFT CLAY', text: 'Seaside Town with clay boats bobbing on gentle waves.' },
  { id: 3, img: '/assets/catus.webp', title: 'STICKER ART', text: 'A dancing cactus with a sombrero at desert sunset.' },
  { id: 4, img: '/assets/fox.webp', title: 'PAPER ART', text: 'Orange and white paper fox with pointed ears.' },
  { id: 5, img: '/assets/girl moon.webp', title: 'ANIME', text: 'Enchanted Library with a mysterious girl reading an ancient tome.' },
  { id: 6, img: '/assets/castle.webp', title: 'LOW POLY', text: 'Medieval Castle on a hill surrounded by a moat.' },
  { id: 7, img: '/assets/beach.webp', title: 'ISOMETRIC', text: 'Tropical Resort with bungalows over clear waters.' },
  { id: 8, img: '/assets/dancing.webp', title: 'WATERCOLOR', text: 'Flamenco dancer in mid-twirl in vivid reds and blacks.' },
  { id: 9, img: '/assets/cyberpunk.webp', title: 'CYBERPUNK', text: 'Cyberpunk girl with colorful tattoos in neon streets.' },
]

const cardContentMap = {
  1: { content: 'LINE ART, An elegant woman in a 1920s flapper dress, pearls, and a feathered headband...', extra: 'Negative Prompt: scary, cartoon, painting' },
  2: { content: 'Seaside Town, clay boats bobbing on the gentle waves, fisherfolk mending nets, seagulls overhead, captured in Craft Clay style.', extra: '' },
  3: { content: 'STICKER, An energetic portrayal of a dancing cactus with a sombrero, amidst a desert sunset...', extra: '' },
  4: { content: 'Fox, orange and white paper, pointed ears, curled tail, sly expression with sharp folded eyes.', extra: '' },
  5: { content: 'Enchanted Library, a mysterious girl with flowing hair, reading an ancient tome, surrounded by floating books...', extra: '' },
  6: { content: 'Medieval Castle, standing tall on a hill, surrounded by a moat, with banners flying...', extra: '' },
  7: { content: 'Tropical Resort, bungalows over clear waters, palm trees, sunbathers on sandy beaches, rendered in Isometric style.', extra: '' },
  8: { content: 'WATERCOLOR, Flamenco dancer in mid-twirl, vivid reds and blacks of her attire...', extra: '' },
  9: { content: 'Cyberpunk style, a beautiful girl wearing a gospel warrior style mecha, Hong Kong street city, neon colors...', extra: '' },
}

const predeterminedPrompts = [
  'a quasar forms at the end of a long hallway + liminal space + hyperrealistic + unreal engine',
  'a little girl with light brown short wavy curly hair and blue eyes floating in space, gazing in wonder at a quasar',
  'sci-fi cosmic diarama of a quasar and jellyfish in a resin cube, volumetric lighting, Photorealism',
  'maze, Narrow steep staircase, Old Building, Floating buildings, Urban, City rain, art by miyazaki',
  'albino girl wrapped in kelp algae seaweeds in a white minimalist room, theatrical lighting',
  'happy marshmallows, in style of adventure time, intricate detail, concept art',
  'man in a ruin of an ancient city invaded by the jungle, unreal engine 5, photorealistic, cinematic',
  'water, flow, dreams, universe, watercolor',
  'The parametric hotel lobby is a sleek and modern space with plenty of natural light.',
  'modern living room minimalistic, marble, white and black, architectural, bright, octane render, 8k',
]

const sizes = [
  { label: '1:1 Square', w: 1024, h: 1024 },
  { label: '9:16 Portrait', w: 768, h: 1024 },
  { label: '16:9 Landscape', w: 1024, h: 768 },
]

function saveToHistory(prompt, url) {
  const data = JSON.parse(localStorage.getItem('generatedImages') || '[]')
  data.push({ prompt, url, date: Date.now() })
  if (data.length > 100) data.shift()
  localStorage.setItem('generatedImages', JSON.stringify(data))
}

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [generatedImage, setGeneratedImage] = useState(null)
  const [error, setError] = useState(null)
  const [modalContent, setModalContent] = useState('')
  const [isModalOpen, setModalOpen] = useState(false)
  const [additionalText, setAdditionalText] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [sizeIdx, setSizeIdx] = useState(0)

  const generateRandomPrompt = () => {
    setPrompt(predeterminedPrompts[Math.floor(Math.random() * predeterminedPrompts.length)])
  }

  const generateImage = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    setError(null)

    const { w, h } = sizes[sizeIdx]
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${w}&height=${h}&seed=${Date.now()}`

    const loadImage = (src) => new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(src)
      img.onerror = reject
      img.src = src
    })

    for (let i = 0; i < 3; i++) {
      try {
        await loadImage(url)
        setGeneratedImage(url)
        saveToHistory(prompt, url)
        setLoading(false)
        return
      } catch {
        if (i < 2) await new Promise(r => setTimeout(r, 1500))
      }
    }

    setError('Timed out. You can try opening the URL directly:')
    setGeneratedImage(url)
    setLoading(false)
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = generatedImage
    link.target = '_blank'
    link.download = 'generated_image.jpg'
    link.click()
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: 'AI Generated Image', text: 'Check this out!', url: generatedImage })
    } else {
      await navigator.clipboard.writeText(generatedImage)
      alert('Image URL copied!')
    }
  }

  const handleCardButtonClick = (id) => {
    const data = cardContentMap[id]
    if (data) {
      setModalContent(data.content)
      setAdditionalText(data.extra)
      setModalOpen(true)
    }
  }

  const setPromptFromCard = (id) => {
    const data = cardContentMap[id]
    if (data) setPrompt(data.content)
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <div className="text-center">
          <h1 className="mb-3 display-5">Axiom Mind</h1>
          <p className="lead text-muted">Unleash your creativity with AI image generation.</p>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="prompt" className="fw-bold fs-5">Prompt:</label>
          <textarea
            id="prompt"
            className="form-control"
            rows="4"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
          />
        </div>

        <div className="d-flex flex-wrap gap-2 justify-content-center mb-3">
          {sizes.map((s, i) => (
            <button
              key={i}
              className={`btn btn-sm ${i === sizeIdx ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => setSizeIdx(i)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="d-flex flex-wrap gap-3 justify-content-center mb-3">
          <button className="btn btn-primary px-4 py-3" onClick={generateImage} disabled={isLoading || !prompt}>
            {isLoading ? 'Generating...' : 'Generate Image'}
          </button>
          <button className="btn btn-outline-secondary px-4 py-3" onClick={generateRandomPrompt}>
            Random Prompt
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {isLoading && (
          <div className="d-flex justify-content-center my-4">
            <div className="spinner-border text-primary" style={{ width: '5rem', height: '5rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {generatedImage && !isLoading && (
          <div className="mt-4">
            <h2 className="h4">Generated Image:</h2>
            <div className="card shadow-sm">
              <img src={generatedImage} alt="Generated" className="card-img-top img-fluid" />
              <div className="card-body d-flex flex-column gap-2">
                <div className="d-flex gap-2">
                  <button className="btn btn-success" onClick={handleDownload}>Download</button>
                  <button className="btn btn-info" onClick={handleShare}>Share</button>
                  <button className="btn btn-outline-primary" onClick={generateImage}>Retry</button>
                </div>
                {error && error.includes('Timed out') && (
                  <a href={generatedImage} target="_blank" rel="noopener noreferrer" className="small text-break">
                    Open image directly in new tab →
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="card p-4 mt-4 bg-light border-0">
          <h3 className="h5 mb-3">Tips</h3>
          <div className="row">
            <div className="col-md-6">
              <p>1. Use simple words like king, queen, knight, wizard.</p>
              <p>2. Be specific with your description.</p>
              <p>3. Combine adjectives: beautiful, detailed, intricate.</p>
              <p>4. Add artist names for style: Van Gogh, Picasso.</p>
            </div>
            <div className="col-md-6">
              <p>5. Specify styles: Abstract, Cyberpunk, Surrealism.</p>
              <p>6. Use render types: Octane, Unreal Engine, Ray tracing.</p>
              <p>7. Share and have fun!</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-5 mb-4 text-center">Gallery</h2>
      <div className="row g-4">
        {cards.map((card) => (
          <div className="col-6 col-md-4 col-lg-3" key={card.id}>
            <div className="card h-100 shadow-sm model-card">
              <img src={card.img} alt={card.title} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text small text-muted flex-grow-1">{card.text}</p>
                <div className="d-flex gap-2 mt-auto">
                  <button className="btn btn-sm btn-primary flex-grow-1" onClick={() => handleCardButtonClick(card.id)}>
                    View Prompt
                  </button>
                  <button className="btn btn-sm btn-outline-primary" onClick={() => setPromptFromCard(card.id)} title="Use this prompt">
                    Use
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`modal fade ${isModalOpen ? 'show' : ''}`} style={{ display: isModalOpen ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title">Prompt Used</h5>
              <button type="button" className="btn-close btn-close-white" onClick={() => setModalOpen(false)} />
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '18px' }}>{modalContent}</p>
              {additionalText && <p style={{ fontSize: '16px', color: '#555' }}>{additionalText}</p>}
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => { setPrompt(modalContent); setModalOpen(false) }}>
                Use This Prompt
              </button>
              <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
