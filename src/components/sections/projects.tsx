import { projectsSection, visibleProjects } from '@/content/projects'
import type { Project } from '@/content/types'
import { StatusBadge, Tag } from '@/components/ui/badge'
import { ButtonLink } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRightIcon, ArrowUpRightIcon, BrandIcon } from '@/components/ui/icons'
import { Section } from '@/components/ui/section'
import { cn } from '@/lib/cn'
import { whatsappHref } from '@/lib/whatsapp'

interface ProjectsProps {
  /** Por defecto, los proyectos visibles. /dev pasa datos extremos para probar. */
  projects?: readonly Project[]
  id?: string
}

/*
 * Se adapta a la cantidad:
 * - 0: invitación a pedir ejemplos por WhatsApp (la sección nunca queda vacía).
 * - 1: una tarjeta ancha, con el caso (problema y solución) a la derecha en escritorio.
 * - 2 o más: rejilla de dos columnas, cada tarjeta apilada.
 */
export function Projects({ projects = visibleProjects, id = 'proyectos' }: ProjectsProps) {
  const featured = projects.length === 1

  return (
    <Section
      id={id}
      label={projectsSection.label}
      title={projectsSection.title}
      intro={projects.length > 0 ? projectsSection.intro : undefined}
    >
      {projects.length === 0 ? (
        <EmptyState />
      ) : (
        <ul role="list" className={cn('grid gap-4 sm:gap-6', !featured && 'lg:grid-cols-2')}>
          {projects.map((project) => (
            <li key={project.slug} className="flex reveal">
              <ProjectCard project={project} featured={featured} />
            </li>
          ))}
        </ul>
      )}
    </Section>
  )
}

function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  const live = project.status !== 'completed'
  const context = projectsSection.linkContext(project.name)

  return (
    <Card
      as="article"
      variant="surface"
      className={cn(
        'flex w-full min-w-0 flex-col gap-8',
        featured && 'lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12',
      )}
    >
      <div className="flex min-w-0 flex-col">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="min-w-0 text-small font-medium wrap-anywhere text-fg-muted">
            {project.type}
          </p>
          <span className="shrink-0 whitespace-nowrap">
            <StatusBadge live={live}>{projectsSection.status[project.status]}</StatusBadge>
          </span>
        </div>

        <h3 className="mt-4 text-title-2 font-semibold wrap-anywhere">{project.name}</h3>
        <p className="mt-4 text-lead text-fg-muted">{project.summary}</p>

        {project.stack.length > 0 && (
          <ul
            role="list"
            aria-label={projectsSection.stackLabel}
            className="mt-6 flex flex-wrap gap-2"
          >
            {project.stack.map((tech) => (
              <li key={tech} className="max-w-full">
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
        )}

        {(project.demo || project.href || project.repo) && (
          <div className={cn('mt-8 flex flex-wrap gap-4', featured && 'lg:mt-auto lg:pt-8')}>
            {project.demo && (
              <ButtonLink href={project.demo} srSuffix={context} trailingIcon={<ArrowRightIcon />}>
                {projectsSection.tryDemoCta}
              </ButtonLink>
            )}
            {project.href && (
              <ButtonLink
                href={project.href}
                external
                srSuffix={context}
                trailingIcon={<ArrowUpRightIcon />}
              >
                {projectsSection.demoCta}
              </ButtonLink>
            )}
            {project.repo && (
              <ButtonLink
                href={project.repo}
                external
                srSuffix={projectsSection.repoContext(project.name)}
                variant="secondary"
                icon={<BrandIcon brand="github" />}
              >
                {projectsSection.repoCta}
              </ButtonLink>
            )}
          </div>
        )}
      </div>

      <dl
        className={cn(
          'grid min-w-0 content-start gap-6 border-t border-hairline pt-8',
          featured && 'lg:border-t-0 lg:pt-0',
        )}
      >
        <CaseItem term={projectsSection.problemLabel} detail={project.problem} />
        <CaseItem term={projectsSection.solutionLabel} detail={project.solution} />
        {project.result && <CaseItem term={projectsSection.resultLabel} detail={project.result} />}
      </dl>
    </Card>
  )
}

function CaseItem({ term, detail }: { term: string; detail: string }) {
  if (!detail) return null
  return (
    <div>
      <dt className="section-label">{term}</dt>
      <dd className="mt-2 text-fg-muted">{detail}</dd>
    </div>
  )
}

function EmptyState() {
  const { empty } = projectsSection
  return (
    <Card variant="outline" className="max-w-2xl reveal">
      <p className="text-lead text-fg-muted">{empty.text}</p>
      <ButtonLink
        href={whatsappHref(empty.whatsappMessage)}
        external
        variant="secondary"
        icon={<BrandIcon brand="whatsapp" />}
        className="mt-6 w-full text-center whitespace-normal sm:w-auto"
      >
        {empty.cta}
      </ButtonLink>
    </Card>
  )
}
