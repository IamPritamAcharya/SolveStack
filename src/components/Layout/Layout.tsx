import { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { SheetFile } from '../../features/sheets/api';
import './Layout.css';

interface Props {
  sheets: SheetFile[];
  activeSheet: string | null;
  onSelectSheet: (name: string) => void;
  children: ReactNode;
}

export function Layout({ sheets, activeSheet, onSelectSheet, children }: Props) {
  return (
    <div className="layout">
      <Header />
      <div className="layout__body">
        <Sidebar sheets={sheets} activeSheet={activeSheet} onSelect={onSelectSheet} />
        <main className="layout__main">{children}</main>
      </div>
    </div>
  );
}
