export type EducationalTabId = 'planet' | 'system' | 'model' | 'physics'

export interface ContentBlock {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export interface TabContent {
  id: EducationalTabId
  label: string
  title: string
  intro: string
  blocks: ContentBlock[]
}
