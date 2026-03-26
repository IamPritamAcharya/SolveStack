import { GITHUB_API_BASE, RAW_BASE, SHEETS_PATH } from '../../constants/github';

export interface SheetFile {
  name: string;
  path: string;
  download_url: string;
}

export async function fetchSheetsList(): Promise<SheetFile[]> {
  const url = `${GITHUB_API_BASE}/${SHEETS_PATH}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch sheets list: ${res.status}`);
  const data = await res.json();
  return data.filter((f: any) => f.name.endsWith('.txt')).map((f: any) => ({
    name: f.name.replace('.txt', ''),
    path: f.path,
    download_url: `${RAW_BASE}/${f.path}`,
  }));
}

export async function fetchSheetContent(downloadUrl: string): Promise<string> {
  const res = await fetch(downloadUrl);
  if (!res.ok) throw new Error(`Failed to fetch sheet content: ${res.status}`);
  return res.text();
}
