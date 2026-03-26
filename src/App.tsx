import { Layout } from './components/Layout/Layout';
import { useSheets } from './features/sheets/hooks/useSheets';
import { TopicGroup } from './features/problems/TopicGroup';
import { Spinner } from './components/Spinner';
import { EmptyState } from './components/EmptyState';
import { ThemeProvider } from './features/theme/ThemeProvider';
import './App.css';

function AppContent() {
  const { sheetFiles, activeSheet, setActiveSheet, parsedSheet, loading, contentLoading, error } =
    useSheets();

  const renderMain = () => {
    if (loading) return <Spinner label="Fetching sheets..." />;
    if (error) return <EmptyState title="Failed to load" description={error} />;
    if (contentLoading) return <Spinner label="Loading problems..." />;
    if (!parsedSheet || parsedSheet.topics.length === 0) {
      return (
        <EmptyState
          title="No problems found"
          description="Select a sheet from the sidebar or add problems to the sheet file."
        />
      );
    }

    return (
      <div className="sheet-content">
        <div className="sheet-content__header">
          <h1 className="sheet-content__title">{parsedSheet.name}</h1>
          <div className="sheet-content__stats">
            <span className="stat-chip">
              {parsedSheet.topics.length} topics
            </span>
            <span className="stat-chip">
              {parsedSheet.topics.reduce(
                (acc, t) => acc + t.easy.length + t.medium.length + t.hard.length,
                0
              )}{' '}
              problems
            </span>
          </div>
        </div>

        <div className="topic-list">
          {parsedSheet.topics.map((group, i) => (
            <TopicGroup key={group.topic} group={group} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <Layout sheets={sheetFiles} activeSheet={activeSheet} onSelectSheet={setActiveSheet}>
      {renderMain()}
    </Layout>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
