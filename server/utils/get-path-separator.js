export default function (path) {
  return path.includes('\/') ? '\/' : path.includes('\\\\') ? '\\\\' : '\\'
}
