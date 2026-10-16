export function currencyDigits(currencyCode: string): number {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: currencyCode.toUpperCase(),
  }).resolvedOptions().maximumFractionDigits ?? 2
}

export function parseMajorToMinor(value: string, currencyCode: string): number {
  const digits = currencyDigits(currencyCode)
  const match = /^(\d+)(?:\.(\d+))?$/.exec(value.trim())
  if (!match) throw new Error('Enter a non-negative amount using digits and a decimal point.')
  const fraction = match[2] ?? ''
  if (fraction.length > digits) throw new Error(`${currencyCode.toUpperCase()} supports at most ${digits} decimal places.`)
  const scale = 10n ** BigInt(digits)
  const minor = BigInt(match[1]!) * scale + BigInt((fraction + '0'.repeat(digits)).slice(0, digits) || '0')
  if (minor > BigInt(Number.MAX_SAFE_INTEGER)) throw new Error('Amount is too large.')
  return Number(minor)
}

export function minorToMajorInput(value: number, currencyCode: string): string {
  const digits = currencyDigits(currencyCode)
  const minor = BigInt(value)
  const scale = 10n ** BigInt(digits)
  const whole = minor / scale
  if (digits === 0) return whole.toString()
  return `${whole}.${(minor % scale).toString().padStart(digits, '0')}`
}

export function formatMinorUnits(value: number, currencyCode: string, locale = 'en-IN'): string {
  const digits = currencyDigits(currencyCode)
  const minor = BigInt(value)
  const scale = 10n ** BigInt(digits)
  const whole = minor / scale
  const integerFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  const parts = integerFormatter.formatToParts(whole)
  if (digits === 0) return parts.map(part => part.value).join('')

  const lastInteger = parts.findLastIndex(part => part.type === 'integer')
  const decimal = new Intl.NumberFormat(locale).formatToParts(1.1).find(part => part.type === 'decimal')?.value ?? '.'
  const fraction = new Intl.NumberFormat(locale, {
    useGrouping: false,
    minimumIntegerDigits: digits,
    maximumFractionDigits: 0,
  }).format(Number(minor % scale))
  parts.splice(lastInteger + 1, 0, { type: 'decimal', value: decimal }, { type: 'fraction', value: fraction })
  return parts.map(part => part.value).join('')
}
