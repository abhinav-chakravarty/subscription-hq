export type Category = { id: string; name: string; color: string; createdAt: string; updatedAt: string }
export const DEFAULT_CATEGORIES = [
  ['ott_streaming', 'OTT & Streaming', '#8b5cf6'], ['ai_llm', 'AI & LLM', '#0f766e'], ['developer_saas', 'Developer Tools & SaaS', '#2563eb'], ['cloud_storage', 'Cloud & Storage', '#0284c7'], ['productivity', 'Productivity', '#d97706'], ['music_audio', 'Music & Audio', '#db2777'], ['gaming', 'Gaming', '#dc2626'], ['news_learning', 'News & Learning', '#7c3aed'], ['fitness', 'Fitness', '#16a34a'], ['other', 'Other', '#64748b'],
] as const
export function defaultCategories(now = new Date().toISOString()): Category[] { return DEFAULT_CATEGORIES.map(([id, name, color]) => ({ id, name, color, createdAt: now, updatedAt: now })) }
