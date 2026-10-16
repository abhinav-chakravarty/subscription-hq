import { describe, expect, it } from 'vitest'
import { addCalendarMonths, nextRenewalDate } from './dates'

describe('billing dates', () => {
  it('preserves end-of-month intent safely', () => expect(addCalendarMonths('2025-01-31', 1)).toBe('2025-02-28'))
  it('handles leap years', () => expect(nextRenewalDate('2024-02-29', 'yearly')).toBe('2025-02-28'))
  it('handles custom and quarterly intervals', () => { expect(nextRenewalDate('2025-01-01', 'custom', 45)).toBe('2025-02-15'); expect(nextRenewalDate('2025-01-31', 'quarterly')).toBe('2025-04-30') })
})
