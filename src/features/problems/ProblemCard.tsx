import { Problem } from '../../features/sheets/parser';
import './ProblemCard.css';

interface Props {
  problem: Problem;
  index: number;
}

const platformLabels: Record<Problem['platform'], string> = {
  leetcode: 'LC',
  geeksforgeeks: 'GFG',
  other: '↗',
};

const platformColors: Record<Problem['platform'], string> = {
  leetcode: 'var(--lc-color)',
  geeksforgeeks: 'var(--gfg-color)',
  other: 'var(--text-secondary)',
};

export function ProblemCard({ problem, index }: Props) {
  return (
    <a
      href={problem.url}
      target="_blank"
      rel="noopener noreferrer"
      className="problem-card"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <span
        className="problem-card__platform"
        style={{ color: platformColors[problem.platform] }}
        title={problem.platform}
      >
        {platformLabels[problem.platform]}
      </span>

      <span className="problem-card__name">{problem.name}</span>

      <span className={`problem-card__badge problem-card__badge--${problem.difficulty}`}>
        {problem.difficulty}
      </span>

      <span className="problem-card__arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </span>
    </a>
  );
}
