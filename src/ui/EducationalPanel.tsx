import { useEffect } from 'react'
import {
  PLANET_TAB_LABEL,
  modelContent,
  physicsContent,
  solarSystemContent,
} from '../data/content'
import type { EducationalTabId } from '../data/content/types'
import { useAppStore } from '../store/useAppStore'
import { PlanetTabContent } from './PlanetTabContent'
import { TabContentView } from './TabContentView'

const TAB_ITEMS: { id: EducationalTabId; label: string }[] = [
  { id: 'planet', label: PLANET_TAB_LABEL },
  { id: 'system', label: solarSystemContent.label },
  { id: 'model', label: modelContent.label },
  { id: 'physics', label: physicsContent.label },
]

export function EducationalPanel() {
  const activeTab = useAppStore((s) => s.activeEducationalTab)
  const setActiveTab = useAppStore((s) => s.setActiveEducationalTab)
  const selectedPlanetId = useAppStore((s) => s.selectedPlanetId)

  useEffect(() => {
    if (selectedPlanetId) setActiveTab('planet')
  }, [selectedPlanetId, setActiveTab])

  return (
    <Box className="edu-panel">
      <Box className="edu-tabs" role="tablist">
        {TAB_ITEMS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`edu-tabs__btn ${activeTab === tab.id ? 'edu-tabs__btn--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </Box>

      <Box className="edu-panel__body" role="tabpanel">
        {activeTab === 'planet' && <PlanetTabContent />}
        {activeTab === 'system' && <TabContentView content={solarSystemContent} />}
        {activeTab === 'model' && <TabContentView content={modelContent} />}
        {activeTab === 'physics' && <TabContentView content={physicsContent} />}
      </Box>
    </Box>
  )
}

function Box(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} />
}

