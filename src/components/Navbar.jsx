import { Link, useLocation } from 'react-router-dom'

export default function Navbar({ darkMode, toggleDarkMode }) {
  const location = useLocation()

  const linkClass = (path) =>
    `nav-link ${location.pathname === path ? 'active fw-semibold' : ''}`

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Axiom Mind</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={linkClass('/')} to="/">Generate</Link>
            </li>
            <li className="nav-item">
              <Link className={linkClass('/history')} to="/history">History</Link>
            </li>
            <li className="nav-item">
              <Link className={linkClass('/about')} to="/about">About</Link>
            </li>
          </ul>
          <button className="btn btn-outline-light btn-sm" onClick={toggleDarkMode}>
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>
    </nav>
  )
}
