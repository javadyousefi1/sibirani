import { describe, it, expect, beforeEach } from 'vitest'
import { loadState, saveState } from '@/store/appState'
import { PRESET_KEYWORDS, STORAGE_KEYS } from '@/constants'

describe('loadState', () => {
  beforeEach(() => localStorage.clear())

  it('returns preset keywords when localStorage is empty', () => {
    const state = loadState()
    expect(state.keywords).toEqual(PRESET_KEYWORDS)
    expect(state.activeLanguage).toBe('en')
  })

  it('returns preset keywords when localStorage is corrupt', () => {
    localStorage.setItem(STORAGE_KEYS.APP_STATE, 'not valid json')
    expect(loadState().keywords).toEqual(PRESET_KEYWORDS)
  })

  it('returns preset keywords when schema does not match', () => {
    localStorage.setItem(STORAGE_KEYS.APP_STATE, JSON.stringify({ wrong: true }))
    expect(loadState().keywords).toEqual(PRESET_KEYWORDS)
  })

  it('returns saved state when valid', () => {
    const saved = { keywords: [], activeLanguage: 'fa' }
    saveState(saved)
    const state = loadState()
    expect(state.keywords).toEqual([])
    expect(state.activeLanguage).toBe('fa')
  })
})

describe('saveState', () => {
  beforeEach(() => localStorage.clear())

  it('persists state to localStorage', () => {
    saveState({ keywords: [], activeLanguage: 'es' })
    const raw = localStorage.getItem(STORAGE_KEYS.APP_STATE)
    expect(raw).not.toBeNull()
    expect(JSON.parse(raw!).activeLanguage).toBe('es')
  })
})
