import Dexie, { type EntityTable } from 'dexie'
import type { Category } from '../domain/categories'
import type { Subscription } from '../domain/subscription'
import { defaultCategories } from '../domain/categories'

export type ReminderEvent = { id: string; subscriptionId: string; renewalDate: string; daysBefore: number; firedAt: string }
export class SubscriptionDatabase extends Dexie { subscriptions!: EntityTable<Subscription, 'id'>; categories!: EntityTable<Category, 'id'>; reminderEvents!: EntityTable<ReminderEvent, 'id'>; constructor(name = 'subscription-hq') { super(name); this.version(1).stores({ subscriptions: 'id, categoryId, status, nextRenewalDate, archivedAt, [status+archivedAt]', categories: 'id, name' }); this.version(2).stores({ subscriptions: 'id, categoryId, status, nextRenewalDate, archivedAt, [status+archivedAt]', categories: 'id, name', reminderEvents: 'id, subscriptionId, renewalDate' }); this.on('populate', async () => { await this.categories.bulkPut(defaultCategories()) }) } }
export const db = new SubscriptionDatabase()
export async function seedDefaultCategories(database = db) { const existing = await database.categories.toCollection().primaryKeys(); const defaults = defaultCategories(); await database.categories.bulkPut(defaults.filter(category => !existing.includes(category.id))) }
