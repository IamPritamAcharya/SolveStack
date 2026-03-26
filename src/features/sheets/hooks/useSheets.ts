import { useState, useEffect } from 'react';
import { fetchSheetsList, fetchSheetContent, SheetFile } from '../api';
import { parseSheetContent, ParsedSheet } from '../parser';

export function useSheets() {
  const [sheetFiles, setSheetFiles] = useState<SheetFile[]>([]);
  const [activeSheet, setActiveSheet] = useState<string | null>(null);
  const [parsedSheet, setParsedSheet] = useState<ParsedSheet | null>(null);
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchSheetsList()
      .then((files) => {
        setSheetFiles(files);
        if (files.length > 0) {
          setActiveSheet(files[0].name);
        }
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!activeSheet) return;
    const file = sheetFiles.find((f) => f.name === activeSheet);
    if (!file) return;

    setContentLoading(true);
    setParsedSheet(null);
    fetchSheetContent(file.download_url)
      .then((content) => {
        setParsedSheet(parseSheetContent(file.name, content));
        setContentLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setContentLoading(false);
      });
  }, [activeSheet, sheetFiles]);

  return {
    sheetFiles,
    activeSheet,
    setActiveSheet,
    parsedSheet,
    loading,
    contentLoading,
    error,
  };
}
