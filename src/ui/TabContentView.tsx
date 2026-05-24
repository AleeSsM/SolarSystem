import type { TabContent } from '../data/content/types'

interface TabContentViewProps {
  content: TabContent
}

export function TabContentView({ content }: TabContentViewProps) {
  return (
    <article className="edu-content">
      <h2 className="edu-content__title">{content.title}</h2>
      <p className="edu-content__intro">{content.intro}</p>

      {content.blocks.map((block) => (
        <section key={block.heading} className="edu-content__block">
          <h3 className="edu-content__heading">{block.heading}</h3>
          {block.paragraphs.map((paragraph, index) => (
            <p key={index} className="edu-content__paragraph">
              {paragraph}
            </p>
          ))}
          {block.bullets && (
            <ul className="edu-content__bullets">
              {block.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </article>
  )
}
