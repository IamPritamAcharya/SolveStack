export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Problem {
  url: string;
  topic: string;
  difficulty: Difficulty;
  name: string;
  platform: 'leetcode' | 'geeksforgeeks' | 'other';
}

export interface TopicGroup {
  topic: string;
  easy: Problem[];
  medium: Problem[];
  hard: Problem[];
}

export interface ParsedSheet {
  name: string;
  topics: TopicGroup[];
}

function extractName(url: string): string {
  try {
    const u = new URL(url);
    // LeetCode: /problems/problem-name/
    // GFG: /problems/problem-name/1
    const parts = u.pathname.split('/').filter(Boolean);
    const problemIndex = parts.indexOf('problems');
    if (problemIndex !== -1 && parts[problemIndex + 1]) {
      return parts[problemIndex + 1]
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    }
    return parts[parts.length - 1] || url;
  } catch {
    return url;
  }
}

function detectPlatform(url: string): Problem['platform'] {
  if (url.includes('leetcode.com')) return 'leetcode';
  if (url.includes('geeksforgeeks.org')) return 'geeksforgeeks';
  return 'other';
}

function normalizeDifficulty(raw: string): Difficulty {
  const d = raw.trim().toLowerCase();
  if (d === 'easy' || d === 'medium' || d === 'hard') return d;
  return 'medium';
}

export function parseSheetContent(name: string, content: string): ParsedSheet {
  const topicsMap = new Map<string, { easy: Problem[]; medium: Problem[]; hard: Problem[] }>();

  const lines = content.split('\n').map((l) => l.trim()).filter(Boolean);

  for (const line of lines) {
    const parts = line.split(',');
    if (parts.length < 3) continue;
    const url = parts[0].trim();
    const topic = parts[1].trim().toLowerCase();
    const difficulty = normalizeDifficulty(parts[2]);

    const problem: Problem = {
      url,
      topic,
      difficulty,
      name: extractName(url),
      platform: detectPlatform(url),
    };

    if (!topicsMap.has(topic)) {
      topicsMap.set(topic, { easy: [], medium: [], hard: [] });
    }
    topicsMap.get(topic)![difficulty].push(problem);
  }

  const topics: TopicGroup[] = Array.from(topicsMap.entries()).map(([topic, groups]) => ({
    topic,
    ...groups,
  }));

  // Sort topics alphabetically
  topics.sort((a, b) => a.topic.localeCompare(b.topic));

  return { name, topics };
}
