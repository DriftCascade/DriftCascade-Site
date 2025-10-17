export * from 'url';

export function fileURLToPath(url) {
  if (typeof url === 'string') {
    url = new URL(url);
  }
  
  if (url.protocol !== 'file:') {
    throw new Error('The URL must be of scheme file');
  }
  
  return decodeURIComponent(url.pathname.replace(/^\/([A-Za-z]:)/, '$1'));
}
