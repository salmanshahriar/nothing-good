export function getViewportHeight() {
  return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
}
