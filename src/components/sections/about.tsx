import Image from 'next/image'
import { aboutSection } from '@/content/about'
import { courseGroups } from '@/content/education'
import { site } from '@/content/site'
import { ButtonLink } from '@/components/ui/button'
import { ArrowUpRightIcon, BrandIcon } from '@/components/ui/icons'
import { Section } from '@/components/ui/section'
import { SectionLabel } from '@/components/ui/section-label'

const profile = (network: 'linkedin' | 'github') =>
  site.social.find((link) => link.network === network)?.href

/*
 * Quién está detrás, para el cliente (texto corto, en primera persona) y para el
 * visitante técnico (datos, formación con enlaces a cada diploma). La foto aparece
 * cuando exista (TODO en content/about.ts); mientras, la columna lleva solo los datos.
 */
export function About() {
  const { photo, facts } = aboutSection
  const linkedin = profile('linkedin')
  const github = profile('github')

  return (
    <Section id="sobre-mi" label={aboutSection.label} title={aboutSection.title}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="reveal">
          {photo && (
            <div className="relative mb-8 aspect-[4/5] max-w-sm overflow-hidden rounded-xl border border-hairline bg-surface sm:rounded-2xl">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 24rem, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <dl className="grid max-w-sm gap-4">
            {facts.map((fact) => (
              <div key={fact.term} className="border-t border-hairline pt-4">
                <dt className="section-label">{fact.term}</dt>
                <dd className="mt-1">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="reveal">
          <div className="space-y-6 text-lead text-fg-muted">
            {aboutSection.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {(linkedin || github) && (
            <div className="mt-8 flex flex-wrap gap-4">
              {linkedin && (
                <ButtonLink
                  href={linkedin}
                  external
                  variant="secondary"
                  icon={<BrandIcon brand="linkedin" />}
                >
                  {aboutSection.linkedin}
                </ButtonLink>
              )}
              {github && (
                <ButtonLink
                  href={github}
                  external
                  variant="secondary"
                  icon={<BrandIcon brand="github" />}
                >
                  {aboutSection.github}
                </ButtonLink>
              )}
            </div>
          )}

          <div className="mt-12 border-t border-hairline pt-10">
            <h3 className="text-title-3 font-semibold">{aboutSection.learningTitle}</h3>
            <p className="mt-2 text-small text-fg-muted">{aboutSection.learningIntro}</p>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {courseGroups.map((group, index) => (
                <div key={group.area}>
                  <SectionLabel id={`cursos-${index}`}>{group.area}</SectionLabel>
                  <ul role="list" aria-labelledby={`cursos-${index}`} className="mt-2">
                    {group.courses.map((course) => (
                      <li key={course.href}>
                        <a
                          href={course.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/course inline-block py-3 text-small transition-colors duration-(--duration-fast) hover:text-accent-text"
                        >
                          {course.name}
                          <ArrowUpRightIcon className="ml-1 inline size-4 align-[-0.125em] text-fg-muted transition-[color,transform] duration-(--duration-fast) ease-out-soft group-hover/course:text-accent-text motion-safe:group-hover/course:translate-x-0.5 motion-safe:group-hover/course:-translate-y-0.5" />
                          <span className="sr-only">
                            {' '}
                            ({aboutSection.courseContext}) {site.ui.newTab}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <a
              href={site.platzi.profile}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center font-semibold text-accent-text underline decoration-current/40 underline-offset-4 transition-[text-decoration-color] duration-(--duration-fast) ease-out-soft hover:decoration-current"
            >
              {aboutSection.allCourses}
              <span className="sr-only"> {site.ui.newTab}</span>
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}
