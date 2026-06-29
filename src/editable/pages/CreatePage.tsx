'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, ImageIcon, Lock, Send, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const taskIcon: Record<string, typeof FileText> = {
  image: ImageIcon,
  profile: Sparkles,
  pdf: FileText,
  sbm: ArrowRight,
}

const fieldClass = 'rounded-[1rem] border border-white/10 bg-white px-4 py-3 text-sm font-bold text-[#10001c] outline-none transition placeholder:text-[#10001c]/35 focus:border-[var(--slot4-accent)]'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const createTasks = useMemo(() => enabledTasks.filter((item) => item.key !== 'article' && item.key !== 'listing' && item.key !== 'classified'), [enabledTasks])
  const [task, setTask] = useState<TaskKey>((createTasks[0]?.key || 'image') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = createTasks.find((item) => item.key === task) || createTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-[var(--editable-page-bg,#fff7ee)] px-4 py-16 text-[var(--editable-page-text,#2f1d16)] sm:px-6 lg:px-8">
          <section className="mx-auto grid max-w-5xl gap-8 rounded-[2rem] border border-[var(--editable-border)] bg-[#160024] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.25)] md:grid-cols-[0.9fr_1.1fr] md:p-10">
            <div className="editable-grid-glow flex h-full min-h-72 items-center justify-center rounded-[1.4rem] bg-[#10001c] text-[var(--slot4-accent)]">
              <Lock className="h-20 w-20 opacity-90" />
            </div>
            <div className="self-center">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.create.locked.badge}</p>
              <h1 className="mt-5 text-5xl font-black leading-[0.92] tracking-[-0.08em] sm:text-7xl">{pagesContent.create.locked.title}</h1>
              <p className="mt-6 max-w-xl text-base font-semibold leading-8 text-[var(--slot4-muted-text)]">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="editable-gradient-button inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-black text-white">Login <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-black text-white/85 transition hover:border-[var(--slot4-accent)] hover:text-white">Sign up</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--editable-page-bg,#fff7ee)] text-[var(--editable-page-text,#2f1d16)]">
        <section className="relative mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(176,95,244,0.32),transparent_35rem)]" />
          <div className="relative grid gap-8 rounded-[2rem] border border-[var(--editable-border)] bg-[#160024]/92 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
            <aside>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.create.hero.badge}</p>
              <h1 className="mt-5 text-5xl font-black leading-[0.92] tracking-[-0.08em] sm:text-7xl">{pagesContent.create.hero.title}</h1>
              <p className="mt-6 max-w-xl text-base font-semibold leading-8 text-[var(--slot4-muted-text)]">{pagesContent.create.hero.description}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {createTasks.map((item) => {
                  const Icon = taskIcon[item.key] || FileText
                  const active = item.key === task
                  return (
                    <button key={item.key} type="button" onClick={() => setTask(item.key)} className={`rounded-[1rem] border p-4 text-left transition ${active ? 'border-[var(--slot4-accent)] bg-[var(--slot4-accent-soft)] text-white' : 'border-white/12 bg-[#251b31] text-white hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]/60'}`}>
                      <Icon className="h-5 w-5" />
                      <span className="mt-3 block text-sm font-black">{item.label}</span>
                      <span className="mt-1 block text-xs font-semibold text-[var(--slot4-muted-text)]">{item.description}</span>
                    </button>
                  )
                })}
              </div>
            </aside>

            <form onSubmit={submit} className="rounded-[1.5rem] border border-[var(--editable-border)] bg-[#090014] p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">Create {activeTask?.label || 'post'}</p>
                  <h2 className="mt-1 text-3xl font-black tracking-[-0.06em]">{pagesContent.create.formTitle}</h2>
                </div>
                <span className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#10001c]">{session.name}</span>
              </div>

              <div className="mt-6 grid gap-4">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${fieldClass} min-h-24`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${fieldClass} min-h-48`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
              </div>

              {created ? (
                <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  <p className="flex items-center gap-2 text-sm font-black"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-sm font-semibold opacity-80">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="editable-gradient-button mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[1rem] px-6 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:brightness-110">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
