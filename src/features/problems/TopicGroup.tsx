import { useState } from 'react';
import { TopicGroup as TopicGroupType } from '../../features/sheets/parser';
import { ProblemCard } from './ProblemCard';
import './TopicGroup.css';

interface Props {
  group: TopicGroupType;
  defaultOpen?: boolean;
}

const difficultyOrder: Array<'easy' | 'medium' | 'hard'> = ['easy', 'medium', 'hard'];

const difficultyLabels = {
  easy: { label: 'Easy', className: 'badge--easy' },
  medium: { label: 'Medium', className: 'badge--medium' },
  hard: { label: 'Hard', className: 'badge--hard' },
};

export function TopicGroup({ group, defaultOpen = true }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const totalCount = group.easy.length + group.medium.length + group.hard.length;

  return (
    <div className={`topic-group ${isOpen ? 'topic-group--open' : ''}`}>
      <button
        className="topic-group__header"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
      >
        <span className="topic-group__icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>

        <span className="topic-group__name">{group.topic}</span>

        <span className="topic-group__counts">
          {group.easy.length > 0 && (
            <span className="count-badge count-badge--easy">{group.easy.length} easy</span>
          )}
          {group.medium.length > 0 && (
            <span className="count-badge count-badge--medium">{group.medium.length} medium</span>
          )}
          {group.hard.length > 0 && (
            <span className="count-badge count-badge--hard">{group.hard.length} hard</span>
          )}
          <span className="topic-group__total">{totalCount} total</span>
        </span>
      </button>

      {isOpen && (
        <div className="topic-group__content">
          {difficultyOrder.map((diff) => {
            const problems = group[diff];
            if (problems.length === 0) return null;

            return (
              <div key={diff} className="difficulty-section">
                <div className="difficulty-section__header">
                  <span className={`difficulty-label ${difficultyLabels[diff].className}`}>
                    {difficultyLabels[diff].label}
                  </span>
                  <span className="difficulty-section__count">{problems.length}</span>
                </div>
                <div className="problem-list">
                  {problems.map((problem, i) => (
                    <ProblemCard key={problem.url} problem={problem} index={i} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
