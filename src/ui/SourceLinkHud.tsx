import { GITHUB_REPO_URL } from '../constants/repo'
import { useAppStore } from '../store/useAppStore'

export function SourceLinkHud() {
  const introActive = useAppStore((s) => s.introActive)

  if (introActive) return null

  return (
    <a
      className="source-hud"
      href={GITHUB_REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Ver codigo fuente en GitHub"
    >
      Codigo Fuente
    </a>
  )
}
