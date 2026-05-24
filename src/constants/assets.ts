/** Ruta publica con prefijo de Vite (GitHub Pages: /SolarSystem/). */
export function assetUrl(path: string): string {
  const normalized = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${normalized}`
}

export function texturePath(fileName: string): string {
  return assetUrl(`textures/${fileName}`)
}
