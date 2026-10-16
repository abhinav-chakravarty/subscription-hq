import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../data/database'
import { subscriptionRepository } from '../../data/repository'
import type { Category } from '../../domain/categories'
import type { Subscription } from '../../domain/subscription'
import { formatMinorUnits } from '../../domain/currency'
import { isRecurring } from '../../domain/spending'

const dateToday = () => new Date().toISOString().slice(0, 10)
const horizonDate = (from: string, days: number) => {
  const end = new Date(`${from}T00:00:00Z`)
  end.setUTCDate(end.getUTCDate() + days)
  return end.toISOString().slice(0, 10)
}

function useManagementData() {
  const [items, setItems] = useState<Subscription[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    let current = true
    void (async () => {
      try {
        await subscriptionRepository.initialize()
        const [records, categoryRecords] = await Promise.all([
          subscriptionRepository.list(),
          db.categories.toArray(),
        ])
        if (current) {
          setItems(records)
          setCategories(categoryRecords)
        }
      } catch (cause) {
        if (current) setError(cause instanceof Error ? cause.message : 'Could not load local data.')
      } finally {
        if (current) setLoading(false)
      }
    })()
    return () => { current = false }
  }, [])
  return { items, categories, loading, error }
}

export function UpcomingRenewals() {
  const { items, loading, error } = useManagementData()
  const today = dateToday()
  const until = horizonDate(today, 30)
  const upcoming = items
    .filter(item => (isRecurring(item) || (item.status === 'trial' && !item.archivedAt)) && item.nextRenewalDate >= today && item.nextRenewalDate <= until)
    .sort((a, b) => a.nextRenewalDate.localeCompare(b.nextRenewalDate) || a.name.localeCompare(b.name))

  if (loading) return <p className="state" role="status">Loading upcoming renewals…</p>
  if (error) return <p className="error" role="alert">{error}</p>
  return <section>
    <div className="section-heading"><div><p className="eyebrow">Next 30 days</p><h2>Upcoming renewals</h2></div></div>
    <p className="muted">Active plans and trials with a valid renewal date. Cancelled, paused, expired, and archived plans are excluded.</p>
    {upcoming.length ? <div className="subscription-list">{upcoming.map(item => <article key={item.id} className="subscription-row">
      <div><Link className="row-title" to={`/subscriptions/${item.id}`}>{item.name}</Link><p>{item.provider} · {item.status === 'trial' ? 'Trial ends' : 'Renewal'} {item.nextRenewalDate}</p></div>
      <div className="row-price">{formatMinorUnits(item.priceMinorUnits, item.currencyCode)}<small>{item.currencyCode}</small></div>
    </article>)}</div> : <div className="empty-panel"><h2>Nothing due in the next 30 days</h2><p>Eligible active renewals and trial end dates will appear here.</p></div>}
  </section>
}

export function Categories() {
  const { items, categories, loading, error } = useManagementData()
  if (loading) return <p className="state" role="status">Loading categories…</p>
  if (error) return <p className="error" role="alert">{error}</p>
  return <section>
    <div className="section-heading"><div><p className="eyebrow">Organize your inventory</p><h2>Categories</h2></div></div>
    <div className="analytics-grid">{categories.map(category => {
      const count = items.filter(item => item.categoryId === category.id && !item.archivedAt).length
      return <article className="panel" key={category.id}>
        <h3><span className="service-dot" aria-hidden style={{ background: category.color }} />{category.name}</h3>
        <p>{count} {count === 1 ? 'subscription' : 'subscriptions'}</p>
        <Link className="quiet-button" to={`/subscriptions?category=${encodeURIComponent(category.id)}`}>View subscriptions</Link>
      </article>
    })}</div>
  </section>
}
