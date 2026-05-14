import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function History() {
  const [images, setImages] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('generatedImages') || '[]')
    setImages(data.reverse())
  }, [])

  const clearHistory = () => {
    localStorage.removeItem('generatedImages')
    setImages([])
  }

  if (images.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="mb-3">History</h2>
        <p className="text-muted">No images generated yet.</p>
        <Link to="/" className="btn btn-primary">Generate one</Link>
      </div>
    )
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">History ({images.length})</h2>
        <button className="btn btn-outline-danger btn-sm" onClick={clearHistory}>Clear All</button>
      </div>
      <div className="row g-4">
        {images.map((item, i) => (
          <div className="col-6 col-md-4 col-lg-3" key={i}>
            <div className="card h-100 shadow-sm">
              <img src={item.url} alt={item.prompt} className="card-img-top history-img" />
              <div className="card-body d-flex flex-column">
                <p className="card-text small text-muted flex-grow-1">"{item.prompt}"</p>
                <div className="d-flex gap-2">
                  <a href={item.url} download={`image-${i}.jpg`} className="btn btn-sm btn-success flex-grow-1">Download</a>
                  <button className="btn btn-sm btn-outline-primary" onClick={() => navigator.clipboard.writeText(item.prompt)}>Copy</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
