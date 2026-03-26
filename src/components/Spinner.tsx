import './Spinner.css';

export function Spinner({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="spinner-wrap">
      <div className="spinner" aria-label={label}>
        <div className="spinner__ring" />
      </div>
      <span className="spinner__label">{label}</span>
    </div>
  );
}
