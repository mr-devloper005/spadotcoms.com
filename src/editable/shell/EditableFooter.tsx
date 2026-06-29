'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Search', href: '/search' },
]

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="border-t border-[var(--editable-border)] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
            </span>
            <span className="editable-display text-xl font-semibold tracking-[0.01em]">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-[var(--slot4-muted-text)]">{globalContent.footer?.description || SITE_CONFIG.description}</p>
        </div>

        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--slot4-accent)]">Navigation</h3>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {footerLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">
                {item.label}
              </Link>
            ))}
            {session ? (
              <button
                type="button"
                onClick={logout}
                className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]"
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/login" className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">
                  Sign in
                </Link>
                <Link href="/signup" className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--editable-border)] px-4 py-5 text-center text-xs font-medium tracking-[0.12em] text-[var(--slot4-muted-text)]">
        &copy; {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
