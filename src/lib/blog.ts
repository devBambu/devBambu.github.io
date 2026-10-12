import type { CollectionEntry } from 'astro:content';

export const projects = [
  { id: 'moha', name: '모하' },
  { id: 'leaflog', name: '잎로그' },
  { id: 'whereToFit', name: '운동갈지도' },
] as const;

export const typeNames: Record<string, string> = {
  'technical-decision': '의사결정기록',
  troubleshooting: '트러블슈팅',
  improvement: '개선',
};

export function projectName(id: string): string {
  return projects.find((project) => project.id === id)?.name ?? '일반';
}

export function postDate(post: CollectionEntry<'blog'>): Date | undefined {
  return post.data.publishedDate ?? post.data.discussionEndedAt ?? post.data.draftDate ?? undefined;
}

export function formatDate(date: Date | undefined): string {
  return date ? new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }).format(date) : '';
}

export function sortedPosts(posts: CollectionEntry<'blog'>[]): CollectionEntry<'blog'>[] {
  return [...posts].sort((a, b) => (postDate(b)?.getTime() ?? 0) - (postDate(a)?.getTime() ?? 0));
}

export function postUrl(post: CollectionEntry<'blog'>): string {
  return `/blog/${post.id}/`;
}
