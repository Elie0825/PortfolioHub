import { useStyleConfig } from '../hooks/useStyleConfig'
import ColorPicker from '../components/style/ColorPicker'
import FontSelector from '../components/style/FontSelector'
import BorderRadiusSlider from '../components/style/BorderRadiusSlider'
import CardStyleSelector from '../components/style/CardStyleSelector'
import LayoutSelector from '../components/style/LayoutSelector'
import SectionManager from '../components/style/SectionManager'
import StylePreview from '../components/style/StylePreview'
import '../styles/pages/StyleEditorPage.css'
import '../styles/components/StyleControls.css'
import '../styles/components/StylePreview.css'

const StyleEditorPage = () => {
  const { styleConfig, sectionOrder, setStyleField, setSectionOrder, isSaving, savedAt } =
    useStyleConfig()

  const savedLabel = isSaving ? 'Saving…' : savedAt ? 'Saved' : ''

  return (
    <div className="style-editor">
      <div className="style-editor__header editor-section__header">
        <h1 className="editor-section__title">Style</h1>
        {savedLabel && <span className="editor-saved">{savedLabel}</span>}
      </div>

      <div className="style-editor__body">
        <div className="style-editor__controls">
          <section className="style-editor__group">
            <h2 className="style-editor__group-title">Colors</h2>
            <ColorPicker
              label="Accent color"
              value={styleConfig.accentColor}
              onChange={(v) => setStyleField('accentColor', v)}
            />
            <ColorPicker
              label="Background color"
              value={styleConfig.bgColor}
              onChange={(v) => setStyleField('bgColor', v)}
            />
            <ColorPicker
              label="Text color"
              value={styleConfig.textColor}
              onChange={(v) => setStyleField('textColor', v)}
            />
          </section>

          <section className="style-editor__group">
            <h2 className="style-editor__group-title">Typography</h2>
            <FontSelector
              value={styleConfig.fontFamily}
              onChange={(v) => setStyleField('fontFamily', v)}
            />
          </section>

          <section className="style-editor__group">
            <h2 className="style-editor__group-title">Layout & cards</h2>
            <BorderRadiusSlider
              value={styleConfig.borderRadius}
              onChange={(v) => setStyleField('borderRadius', v)}
            />
            <CardStyleSelector
              value={styleConfig.cardStyle}
              onChange={(v) => setStyleField('cardStyle', v)}
            />
            <LayoutSelector
              value={styleConfig.layout}
              onChange={(v) => setStyleField('layout', v)}
            />
          </section>

          <section className="style-editor__group">
            <h2 className="style-editor__group-title">Sections</h2>
            <SectionManager sections={sectionOrder} onChange={setSectionOrder} />
          </section>
        </div>

        <div className="style-editor__preview-col">
          <p className="style-editor__preview-label">Live preview</p>
          <div className="style-editor__preview-wrap">
            <StylePreview styleConfig={styleConfig} sectionOrder={sectionOrder} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StyleEditorPage
