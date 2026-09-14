import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useKeywordSearch } from '@/hooks/useKeywordSearch'
import type { Keyword } from '@/types'

const keywords: Keyword[] = [
  { id: '1', key: 'Hello', translations: { en: 'Hello' } },
  { id: '2', key: 'World', translations: { en: 'World' } },
  { id: '3', key: 'Apple', translations: { en: 'Apple' } },
]

describe('useKeywordSearch', () => {
  it('returns all keywords when query is empty', () => {
    const { result } = renderHook(() => useKeywordSearch(keywords))
    expect(result.current.filtered).toHaveLength(3)
  })

  it('filters by keyword key', () => {
    const { result } = renderHook(() => useKeywordSearch(keywords))
    act(() => result.current.setQuery('hel'))
    expect(result.current.filtered).toHaveLength(1)
    expect(result.current.filtered[0].key).toBe('Hello')
  })

  it('is case insensitive', () => {
    const { result } = renderHook(() => useKeywordSearch(keywords))
    act(() => result.current.setQuery('WORLD'))
    expect(result.current.filtered).toHaveLength(1)
    expect(result.current.filtered[0].key).toBe('World')
  })

  it('returns empty array when no match', () => {
    const { result } = renderHook(() => useKeywordSearch(keywords))
    act(() => result.current.setQuery('xyz'))
    expect(result.current.filtered).toHaveLength(0)
  })

  it('ignores whitespace-only query', () => {
    const { result } = renderHook(() => useKeywordSearch(keywords))
    act(() => result.current.setQuery('   '))
    expect(result.current.filtered).toHaveLength(3)
  })
})
