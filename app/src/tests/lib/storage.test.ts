import { describe, it, expect, beforeEach } from 'vitest'
import { z } from 'zod'
import { safeParse, storageGet, storageSet } from '@/lib/storage'

describe('safeParse', () => {
  it('parses valid JSON', () => {
    expect(safeParse<{ a: number }>('{"a":1}')).toEqual({ a: 1 })
  })

  it('returns null for invalid JSON', () => {
    expect(safeParse('not json')).toBeNull()
  })

  it('returns null for empty string', () => {
    expect(safeParse('')).toBeNull()
  })
})

describe('storageGet / storageSet', () => {
  const schema = z.object({ name: z.string() })
  const key = 'test_key'

  beforeEach(() => localStorage.clear())

  it('returns null when key is missing', () => {
    expect(storageGet(key, schema)).toBeNull()
  })

  it('returns null when value is corrupt JSON', () => {
    localStorage.setItem(key, 'bad json')
    expect(storageGet(key, schema)).toBeNull()
  })

  it('returns null when value does not match schema', () => {
    storageSet(key, { name: 42 })
    expect(storageGet(key, schema)).toBeNull()
  })

  it('returns parsed value when valid', () => {
    storageSet(key, { name: 'hello' })
    expect(storageGet(key, schema)).toEqual({ name: 'hello' })
  })
})
