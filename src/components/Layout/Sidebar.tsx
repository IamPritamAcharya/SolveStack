import { SheetFile } from '../../features/sheets/api';
import './Sidebar.css';

interface Props {
  sheets: SheetFile[];
  activeSheet: string | null;
  onSelect: (name: string) => void;
}

export function Sidebar({ sheets, activeSheet, onSelect }: Props) {
  return (
    <aside className="sidebar">
      <div className="sidebar__section-label">Sheets</div>
      <nav className="sidebar__nav">
        {sheets.map((sheet) => (
          <button
            key={sheet.name}
            className={`sidebar__item ${activeSheet === sheet.name ? 'sidebar__item--active' : ''}`}
            onClick={() => onSelect(sheet.name)}
          >
            <span className="sidebar__item-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </span>
            <span className="sidebar__item-name">{sheet.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
