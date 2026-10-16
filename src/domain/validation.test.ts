import { describe, expect, it } from 'vitest'
import { subscriptionInputSchema } from './validation'

const valid = { name:'Netflix', provider:'Netflix', categoryId:'ott_streaming', priceMinorUnits:19900, currencyCode:'inr', billingInterval:'monthly', startDate:'2025-01-01', nextRenewalDate:'2025-02-01', status:'active', paymentMethod:'upi', billingProvider:'provider_website', managementUrl:'https://netflix.com/account', reminderSettings:{enabled:true,daysBefore:[7]}, notes:'' }
describe('subscription validation', () => {
  it('normalizes ISO currency to uppercase', () => expect(subscriptionInputSchema.parse(valid).currencyCode).toBe('INR'))
  it('rejects invalid prices and dates', () => { expect(() => subscriptionInputSchema.parse({...valid,priceMinorUnits:-1})).toThrow(); expect(() => subscriptionInputSchema.parse({...valid,nextRenewalDate:'2024-12-31'})).toThrow() })
  it('requires custom interval days only for custom plans', () => { expect(() => subscriptionInputSchema.parse({...valid,billingInterval:'custom'})).toThrow(); expect(subscriptionInputSchema.parse({...valid,billingInterval:'custom',customIntervalDays:30}).customIntervalDays).toBe(30) })
})
