import Link from 'next/link'
import {
  ArrowRight, BarChart3, BookOpenText, Building2, CheckSquare, Globe2,
  Layers3, Megaphone, MessageCircle, PenLine, Search, Share2, Sparkles, Target,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

function allPosts(posts: SitePost[], timeSections: HomeTimeSection[]) {
  return dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
}

function usefulImage(post?: SitePost) {
  return post ? getEditablePostImage(post) : '/placeholder.svg?height=900&width=1400'
}

const serviceCards = [
  { icon: Target, title: 'Article Publishing', text: 'Share thoughtful guides, opinions, research notes, and practical resources with a public audience.' },
  { icon: Share2, title: 'Content Discovery', text: 'Organize useful posts by category so readers can move from one topic to the next without friction.' },
  { icon: Building2, title: 'Business Profiles', text: 'Create clear listing pages for businesses, professionals, projects, and public profiles.' },
  { icon: Globe2, title: 'Resource Hubs', text: 'Collect bookmarks, PDFs, images, listings, and stories into one connected publishing space.' },
  { icon: BarChart3, title: 'Editorial Reach', text: 'Give every contribution a polished card, searchable details, and a clean route for visitors.' },
  { icon: PenLine, title: 'Creator Workspace', text: 'Members can log in, create content, and keep publishing paths easy to access.' },
]

const steps = [
  { icon: MessageCircle, title: 'Find a topic', text: 'Search or browse the section that matches what you want to read or publish.' },
  { icon: CheckSquare, title: 'Shape the post', text: 'Add a title, useful details, category, media, and a clear summary.' },
  { icon: Layers3, title: 'Connect context', text: 'Listings, articles, visuals, files, and profiles stay connected through shared navigation.' },
  { icon: BookOpenText, title: 'Keep exploring', text: 'Readers can continue into related posts, archives, comments, and business pages.' },
]

const logos = ['botanix', 'omnix', 'Healia', 'roovon', 'ovara.', 'neurova', 'publio', 'civica']

/* ----------------------------- Hero banner ----------------------------- */
export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = allPosts(posts, timeSections)
  const featured = pool[0]
  const heroImage = usefulImage(featured)
  const heroTitle = pagesContent.home.hero.title?.join(' ') || `Discover ${SITE_CONFIG.name}`

  return (
    <section className="relative overflow-hidden bg-[#12001f]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_54%_18%,rgba(190,93,245,0.32),transparent_27rem)]" />
      <div className={`${container} relative grid min-h-[680px] gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-20`}>
        <div className="max-w-2xl">
          <div className="inline-flex rounded-full border border-[var(--slot4-accent)]/80 px-4 py-2 text-sm font-extrabold text-white/95">
            Trusted publishing for articles and business listings
          </div>
          <h1 className="mt-7 text-balance text-5xl font-extrabold leading-[1.08] tracking-[-0.05em] text-white sm:text-6xl lg:text-[4.2rem]">
            {heroTitle}
          </h1>
          <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-[var(--slot4-muted-text)]">
            {pagesContent.home.hero.description}
          </p>
          <form action="/search" className="mt-8 flex max-w-xl flex-col gap-3 rounded-[1.4rem] border border-white/10 bg-white/8 p-2 backdrop-blur md:flex-row">
            <label className="flex min-w-0 flex-1 items-center gap-3 px-4">
              <Search className="h-5 w-5 shrink-0 text-[var(--slot4-accent)]" />
              <input name="q" placeholder="Search articles, listings, people..." className="h-12 min-w-0 flex-1 bg-transparent text-sm font-semibold text-white outline-none placeholder:text-white/45" />
            </label>
            <button className="editable-gradient-button rounded-full px-7 py-3 text-sm font-extrabold uppercase tracking-[0.16em] text-white">Search</button>
          </form>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/search" className="editable-gradient-button rounded-full px-7 py-3 text-sm font-extrabold uppercase tracking-[0.16em] text-white">Get started</Link>
            <Link href="/about" className="rounded-full border border-white/70 px-7 py-3 text-sm font-extrabold uppercase tracking-[0.16em] text-white transition hover:bg-white/10">Learn more</Link>
          </div>
        </div>

        <div className="relative min-h-[520px] overflow-hidden rounded-bl-[3rem] rounded-tr-[3rem] border border-white/12 bg-[#251835] shadow-[0_32px_110px_rgba(0,0,0,0.35)]">
          <img src={heroImage} alt={featured?.title || SITE_CONFIG.name} className="absolute inset-0 h-full w-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(40,0,62,0.12),rgba(21,0,34,0.92))]" />
          <div className="editable-pulse-glow absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border-[10px] border-[#f36fbd]/25" />
          <div className="editable-float absolute right-10 top-12 flex h-28 w-28 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur">
            <Megaphone className="h-10 w-10 text-[#ff8ac4]" />
          </div>
          <div className="editable-float absolute left-20 top-32 flex h-24 w-24 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur [animation-delay:1s]">
            <Share2 className="h-9 w-9 text-white/70" />
          </div>
          <div className="editable-float absolute bottom-36 right-20 flex h-24 w-24 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur [animation-delay:1.7s]">
            <Globe2 className="h-9 w-9 text-white/70" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- About split ----------------------------- */
export function EditableStoryRail({ posts, timeSections }: HomeSectionProps) {
  const pool = allPosts(posts, timeSections)
  const image = usefulImage(pool[1] || pool[0])
  return (
    <section className="bg-[#080011] py-16 sm:py-20">
      <div className={`${container} grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center`}>
        <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
          <img src={image} alt="" className="aspect-[16/10] w-full rounded-xl object-cover opacity-72" />
        </div>
        <div>
          <p className="text-xl font-extrabold text-[var(--slot4-accent)]">Who we are</p>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight tracking-[-0.05em] sm:text-5xl">Your publishing future, our polished content experience.</h2>
          <p className="mt-6 text-lg font-semibold leading-8 text-[var(--slot4-muted-text)]">
            {SITE_CONFIG.name} gives readers, writers, businesses, students, journalists, and creators a clean place to publish, browse, and connect through useful content.
          </p>
          <p className="mt-5 text-lg font-semibold leading-8 text-[var(--slot4-muted-text)]">
            Articles, listings, profiles, visuals, bookmarks, and documents sit inside one consistent interface, so every visitor can keep discovering without losing context.
          </p>
          <Link href="/about" className="editable-gradient-button mt-8 inline-flex rounded-full px-7 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-white">Discover more</Link>
        </div>
      </div>
      <div className={`${container} mt-16`}>
        <div className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#291f33] py-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(243,111,189,0.38),transparent_14rem)]" />
          <h3 className="relative mx-auto max-w-2xl text-center text-3xl font-extrabold tracking-[-0.04em]">Join a growing community creating useful public content.</h3>
          <div className="relative mt-10 overflow-hidden">
            <div className="editable-marquee-track flex w-max gap-14 px-8">
              {[...logos, ...logos].map((logo, index) => (
                <span key={`${logo}-${index}`} className="text-3xl font-extrabold text-white/60">{logo}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- Services grid ---------------------------- */
export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = allPosts(posts, timeSections)
  const featured = pool.slice(0, 3)
  return (
    <section className="relative overflow-hidden bg-[#12001f] py-20">
      <div className="absolute inset-0 editable-grid-glow opacity-70" />
      <div className={`${container} relative`}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xl font-extrabold text-[var(--slot4-accent)]">What we offer</p>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight tracking-[-0.05em] sm:text-5xl">Where useful content meets simple discovery.</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {serviceCards.map((item) => {
            const Icon = item.icon
            return (
              <article key={item.title} className="group rounded-[1.35rem] border border-white/12 bg-[#2a2035]/92 p-8 transition duration-500 hover:-translate-y-2 hover:border-[var(--slot4-accent)]/50">
                <Icon className="h-10 w-10 text-[var(--slot4-accent)]" />
                <h3 className="mt-8 text-xl font-extrabold tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-4 min-h-[96px] text-base font-semibold leading-7 text-[var(--slot4-muted-text)]">{item.text}</p>
                <Link href="/search" className="editable-gradient-button mt-7 inline-flex rounded-full px-6 py-3 text-xs font-extrabold uppercase tracking-[0.18em] text-white">Learn more</Link>
              </article>
            )
          })}
        </div>
        {featured.length ? (
          <>
            <div className="mt-20 text-center">
              <p className="text-xl font-extrabold text-[var(--slot4-accent)]">Resources and insights</p>
              <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.05em]">Fresh posts that are ready to read.</h2>
            </div>
            <div className="mt-10 grid gap-7 lg:grid-cols-3">
              {featured.map((post, index) => (
                <ImageFirstCard key={post.id || post.slug} post={post} href="/search" index={index} />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}

/* -------------------------- Time-based sections ------------------------- */
export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = allPosts(posts, timeSections)
  const rows = pool.slice(3, 15)
  if (!rows.length) return null

  return (
    <>
      <section className="bg-[#080011] py-20">
        <div className={`${container}`}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xl font-extrabold text-[var(--slot4-accent)]">How it works</p>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-[-0.05em] sm:text-5xl">From idea to published in 4 simple steps.</h2>
          </div>
          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <article key={step.title} className="text-center">
                  <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-white">
                    <Icon className="h-9 w-9" />
                  </span>
                  <h3 className="mt-6 text-lg font-extrabold">{step.title}</h3>
                  <p className="mx-auto mt-3 max-w-xs text-sm font-semibold leading-6 text-[var(--slot4-muted-text)]">{step.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#12001f] py-20">
        <div className={`${container}`}>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            {rows[0] ? <FeaturedCard post={rows[0]} href={postHref(primaryTask, rows[0], primaryRoute)} /> : null}
            <div className="grid gap-5">
              {rows.slice(1, 5).map((post, index) => (
                <HorizontalCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
              ))}
            </div>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rows.slice(5, 11).map((post, index) => (
              <CompactCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* -------------------------------- CTA band ------------------------------ */
export function EditableHomeCta() {
  return (
    <section className="bg-[#080011] py-20">
      <div className={`${container}`}>
        <div className="editable-grid-glow rounded-[1.25rem] border border-white/12 bg-[#12001f] px-6 py-16 text-center">
          <Sparkles className="mx-auto h-10 w-10 text-[var(--slot4-accent)]" />
          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-[-0.05em]">Ready to grow your public presence with better content?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-7 text-[var(--slot4-muted-text)]">Publish articles, build profiles, share resources, and connect with readers through one polished website.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/create" className="editable-gradient-button rounded-full px-7 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-white">Create a post</Link>
            <Link href="/contact" className="rounded-full border border-white/25 px-7 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-white/85 transition hover:border-[var(--slot4-accent)] hover:text-white">Contact us</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturedCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group relative min-h-[520px] overflow-hidden rounded-[1.25rem] border border-white/12 bg-[#251b31]">
      <img src={usefulImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_18%,rgba(8,0,17,0.92))]" />
      <div className="absolute inset-x-0 bottom-0 p-8">
        <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
        <h3 className="mt-4 text-4xl font-extrabold leading-tight tracking-[-0.05em]">{post.title}</h3>
        <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/72">{getEditableExcerpt(post, 170)}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-white">Read feature <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

function ImageFirstCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group overflow-hidden rounded-[1rem] bg-[#2a2035] transition duration-500 hover:-translate-y-2">
      <div className="relative aspect-[16/9] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={usefulImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        {index === 0 ? <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(243,111,189,0.38),transparent)]" /> : null}
      </div>
      <div className="p-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
        <h3 className="mt-3 line-clamp-2 text-xl font-extrabold leading-tight">{post.title}</h3>
        <p className="mt-4 line-clamp-3 text-sm font-semibold leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 135)}</p>
      </div>
    </Link>
  )
}

function HorizontalCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid gap-4 rounded-[1rem] border border-white/12 bg-[#251b31] p-4 transition duration-500 hover:border-[var(--slot4-accent)]/60 sm:grid-cols-[160px_minmax(0,1fr)]">
      <img src={usefulImage(post)} alt="" className="aspect-[16/11] w-full rounded-xl object-cover sm:h-full" />
      <div className="min-w-0">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Read {String(index + 1).padStart(2, '0')}</p>
        <h3 className="mt-2 line-clamp-2 text-xl font-extrabold leading-tight">{post.title}</h3>
        <p className="mt-3 line-clamp-2 text-sm font-semibold leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 115)}</p>
      </div>
    </Link>
  )
}

function CompactCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group rounded-[1rem] border border-white/12 bg-[#1b1026] p-5 transition duration-500 hover:-translate-y-1 hover:bg-[#2a2035]">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-sm font-extrabold text-[var(--slot4-accent)]">{index + 1}</span>
        <div className="min-w-0">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
          <h3 className="mt-2 line-clamp-2 text-lg font-extrabold leading-tight">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 105)}</p>
        </div>
      </div>
    </Link>
  )
}
