import { z } from 'zod'
import type { Category } from './categories'
import type { Subscription } from './subscription'
import { subscriptionInputSchema } from './validation'

export const BACKUP_FORMAT = 'subscription-hq-backup'
export const BACKUP_VERSION = 1
export type Backup = { format: typeof BACKUP_FORMAT; version: number; exportedAt: string; app: { name: string }; subscriptions: Subscription[]; categories: Category[] }
const storedSubscription = subscriptionInputSchema.extend({ id:z.string().min(1), createdAt:z.string().datetime(), updatedAt:z.string().datetime(), archivedAt:z.string().datetime().optional() })
export const backupSchema = z.object({ format:z.literal(BACKUP_FORMAT), version:z.literal(BACKUP_VERSION), exportedAt:z.string().datetime(), app:z.object({name:z.literal('Subscription HQ')}), subscriptions:z.array(storedSubscription).max(10000), categories:z.array(z.object({id:z.string().min(1).max(100),name:z.string().min(1).max(100),color:z.string().max(30),createdAt:z.string().datetime(),updatedAt:z.string().datetime()})).max(500) }).strict()
const dangerous = /^(?:\t|\r|\n|\s*[=+\-@])/
export function csvCell(value: unknown) { const text = String(value ?? ''); const safe = dangerous.test(text) ? `'${text}` : text; return `"${safe.replaceAll('"','""')}"` }
export function subscriptionsCsv(rows: Subscription[]) { const columns = ['id','name','provider','planName','categoryId','priceMinorUnits','currencyCode','billingInterval','customIntervalDays','startDate','nextRenewalDate','status','paymentMethod','billingProvider','managementUrl','notes','createdAt','updatedAt','archivedAt']; const lines = rows.map(row => columns.map(column => csvCell(row[column as keyof Subscription])).join(',')); return `\uFEFF${columns.join(',')}\n${lines.join('\n')}\n` }
export function buildBackup(subscriptions: Subscription[], categories: Category[]): Backup { return {format:BACKUP_FORMAT,version:BACKUP_VERSION,exportedAt:new Date().toISOString(),app:{name:'Subscription HQ'},subscriptions,categories} }
export type ImportPreview = { valid: Subscription[]; invalid: number; duplicateIds: Subscription[]; likelyDuplicates: Subscription[] }
export function parseBackup(text:string): Backup { if(text.length>5_000_000)throw new Error('Backup must be under 5 MB'); const backup=backupSchema.parse(JSON.parse(text)); const ids=new Set<string>(); for(const row of backup.subscriptions){if(ids.has(row.id))throw new Error(`Backup contains duplicate subscription ID: ${row.id}`);ids.add(row.id)} const categoryIds=new Set<string>();for(const category of backup.categories){if(categoryIds.has(category.id))throw new Error(`Backup contains duplicate category ID: ${category.id}`);categoryIds.add(category.id)}return backup }
export function previewBackup(backup: Backup, existing: Subscription[]): ImportPreview { const ids=new Set(existing.map(x=>x.id)); const keys=new Set(existing.map(x=>`${x.provider.toLowerCase()}|${x.name.toLowerCase()}|${x.planName??''}`)); const duplicateIds=backup.subscriptions.filter(x=>ids.has(x.id)); const likelyDuplicates=backup.subscriptions.filter(x=>!ids.has(x.id)&&keys.has(`${x.provider.toLowerCase()}|${x.name.toLowerCase()}|${x.planName??''}`)); return {valid:backup.subscriptions.filter(x=>!ids.has(x.id)&&!likelyDuplicates.includes(x)),invalid:0,duplicateIds,likelyDuplicates} }
