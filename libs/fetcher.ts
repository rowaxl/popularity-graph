const API_KEY = process.env.NEXT_PUBLIC_RESAS_API_KEY || '';

export const fetcher = <T>(url: string): Promise<T> => fetch(url, {
  headers: {
  'X-API-KEY': API_KEY,
} }).then(res => res.json() as Promise<T>);
