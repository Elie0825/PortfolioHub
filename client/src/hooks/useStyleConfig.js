import { useState, useCallback, useEffect, useRef } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { styleApi } from '../services/styleApi'

const DEFAULT_STYLE_CONFIG = {
  accentColor: '',
  bgColor: '',
  textColor: '',
  fontFamily: 'system-ui',
  borderRadius: 6,
  cardStyle: 'bordered',
  layout: 'centered',
}

const ALL_SECTIONS = ['hero', 'skills', 'projects', 'experience', 'contact']

const DEFAULT_SECTION_ORDER = ALL_SECTIONS.map((id) => ({ id, visible: true }))

const normalizeSectionOrder = (raw) => {
  if (!Array.isArray(raw) || raw.length === 0) return DEFAULT_SECTION_ORDER
  // Handle legacy plain-string arrays
  if (typeof raw[0] === 'string') return raw.map((id) => ({ id, visible: true }))
  return raw
}

export const useStyleConfig = () => {
  const { portfolio } = usePortfolio()

  const [styleConfig, setStyleConfigState] = useState(() => ({
    ...DEFAULT_STYLE_CONFIG,
    ...(portfolio?.styleConfig && typeof portfolio.styleConfig === 'object'
      ? portfolio.styleConfig
      : {}),
  }))

  const [sectionOrder, setSectionOrderState] = useState(() =>
    normalizeSectionOrder(portfolio?.sectionOrder)
  )

  const [isSaving, setIsSaving] = useState(false)
  const [savedAt, setSavedAt] = useState(null)
  const [pendingStyleSave, setPendingStyleSave] = useState(null)
  const [pendingSectionSave, setPendingSectionSave] = useState(null)
  const savingRef = useRef(false)

  useEffect(() => {
    if (!pendingStyleSave) return
    const timer = setTimeout(async () => {
      savingRef.current = true
      setIsSaving(true)
      try {
        await styleApi.updateStyleConfig(pendingStyleSave)
        setSavedAt(new Date())
      } catch (_) {
        // silent
      } finally {
        setIsSaving(false)
        savingRef.current = false
      }
      setPendingStyleSave(null)
    }, 800)
    return () => clearTimeout(timer)
  }, [pendingStyleSave])

  useEffect(() => {
    if (!pendingSectionSave) return
    const timer = setTimeout(async () => {
      setIsSaving(true)
      try {
        await styleApi.updateSectionOrder(pendingSectionSave)
        setSavedAt(new Date())
      } catch (_) {
        // silent
      } finally {
        setIsSaving(false)
      }
      setPendingSectionSave(null)
    }, 800)
    return () => clearTimeout(timer)
  }, [pendingSectionSave])

  const setStyleField = useCallback((field, value) => {
    setStyleConfigState((prev) => {
      const next = { ...prev, [field]: value }
      setPendingStyleSave(next)
      return next
    })
  }, [])

  const setSectionOrder = useCallback((order) => {
    setSectionOrderState(order)
    setPendingSectionSave(order)
  }, [])

  return { styleConfig, sectionOrder, setStyleField, setSectionOrder, isSaving, savedAt }
}
