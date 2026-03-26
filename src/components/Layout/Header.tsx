import { ThemeToggle } from '../../features/theme/ThemeToggle';
import './Header.css';

export function Header() {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </span>
        <div className="header__title-group">
          <span className="header__title">DSA Sheet</span>
          <span className="header__subtitle">Curated Problems by Pritam</span>
        </div>
      </div>

      <div className="header__actions">
        <a
          href="https://github.com/IamPritamAcharya/Pritam-s-DSA-Sheet"
          target="_blank"
          rel="noopener noreferrer"
          className="header__github"
          aria-label="View source on GitHub"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.37.6.1.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 24 12C24 5.37 18.63 0 12 0z" />
          </svg>
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
