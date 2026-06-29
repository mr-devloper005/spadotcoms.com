'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, PlusCircle, Search, UserRound, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const authItems = [
  { label: 'Sign in', href: '/login' },
  { label: 'Sign up', href: '/signup' },
]

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const displayName = session?.name || session?.email?.split('@')[0] || 'Member'
  const mobileSessionItems = session
    ? [
        { label: `Signed in: ${displayName}`, href: '/create' },
        { label: 'Create', href: '/create' },
      ]
    : authItems

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)]/95 text-[var(--editable-nav-text)] backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[88px] w-full max-w-[var(--editable-container)] items-center gap-5 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
          </span>
          <span className="hidden min-w-0 md:block">
            <span className="editable-display block max-w-[220px] truncate text-2xl font-semibold leading-none tracking-[-0.04em]">{SITE_CONFIG.name}</span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-[13px] font-extrabold uppercase tracking-[0.22em] transition ${
                  active ? 'text-[var(--slot4-accent)]' : 'text-white/88 hover:text-white'
                }`}
              >
                {item.label}
                {active ? <span className="absolute -bottom-3 left-1/2 h-[3px] w-7 -translate-x-1/2 rounded-full bg-[var(--slot4-accent)]" /> : null}
              </Link>
            )
          })}
        </div>

        <form action="/search" className="hidden min-w-0 justify-center md:flex">
          <label className="flex w-full max-w-md items-center gap-2 border-b border-[var(--slot4-accent)]/30 pb-2 transition focus-within:border-[var(--slot4-accent)]">
            <Search className="h-4 w-4 shrink-0 text-[var(--slot4-accent)]" />
            <input
              name="q"
              type="search"
              placeholder="Search posts"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-[var(--slot4-muted-text)]"
            />
          </label>
        </form>

        {session ? (
          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <span className="inline-flex max-w-[150px] items-center gap-2 truncate rounded-full border border-white/15 bg-white/5 px-3 py-3 text-[12px] font-extrabold uppercase tracking-[0.14em] text-white/88">
              <UserRound className="h-3.5 w-3.5 shrink-0 text-[var(--slot4-accent)]" />
              {displayName}
            </span>
            <Link
              href="/create"
              className="editable-gradient-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.18em] text-white transition hover:brightness-110"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              Create
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-white/18 px-4 py-3 text-[12px] font-extrabold uppercase tracking-[0.18em] text-white/78 transition hover:border-[var(--slot4-accent)]/60 hover:text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <Link
              href="/login"
              className="rounded-full border border-white/18 px-4 py-3 text-[12px] font-extrabold uppercase tracking-[0.18em] text-white/78 transition hover:border-[var(--slot4-accent)]/60 hover:text-white"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="editable-gradient-button rounded-full px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.18em] text-white transition hover:brightness-110"
            >
              Sign up
            </Link>
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-lg border border-[var(--editable-border)] bg-white/5 p-2 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-5 lg:hidden">
          <form action="/search" className="mb-5 flex items-center gap-2 border-b border-[var(--slot4-accent)]/30 pb-2">
            <Search className="h-4 w-4 text-[var(--slot4-accent)]" />
            <input name="q" type="search" placeholder="Search posts" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-muted-text)]" />
          </form>
          <div className="grid gap-1">
            {[...navItems, { label: 'Search', href: '/search' }, ...mobileSessionItems].map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`border-l-2 px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] ${
                    active
                      ? 'border-[var(--slot4-accent)] bg-[var(--slot4-surface-bg)] text-[var(--slot4-accent)]'
                      : 'border-transparent text-[var(--slot4-muted-text)] hover:border-[var(--slot4-accent)]/40 hover:bg-[var(--slot4-surface-bg)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            {session ? (
              <button
                type="button"
                onClick={() => {
                  logout()
                  setOpen(false)
                }}
                className="border-l-2 border-transparent px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.16em] text-[var(--slot4-muted-text)] hover:border-[var(--slot4-accent)]/40 hover:bg-[var(--slot4-surface-bg)]"
              >
                Logout
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
