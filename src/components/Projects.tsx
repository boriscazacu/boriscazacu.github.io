import { useTranslation } from 'react-i18next';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

export function Projects() {
  const { t } = useTranslation();
  const projects = t('projects.items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    technologies: string[];
  }>;

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-32">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <AnimateOnScroll delay="0.1s">
            <h2 className="text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
              {t('projects.title')}
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay="0.2s">
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              {t('projects.subtitle')}
            </p>
          </AnimateOnScroll>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <AnimateOnScroll key={index} delay={`${0.3 + index * 0.1}s`}>
              <article
                className="group relative bg-card rounded-xl border border-border overflow-hidden hover-lift"
              >
                {/* Gradient top border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent-foreground opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="p-4 sm:p-6">
                  {/* Project number */}
                  <span className="inline-block text-xs font-medium text-muted-foreground mb-2 sm:mb-3">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3 sm:mb-4">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs bg-muted text-muted-foreground rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  {/*<div className="flex items-center gap-3">*/}
                  {/*  <Button variant="ghost" size="sm" className="h-8 px-3 text-xs" asChild>*/}
                  {/*    <a href="#" target="_blank" rel="noopener noreferrer">*/}
                  {/*      <Github className="h-3.5 w-3.5 mr-1.5" />*/}
                  {/*      {t('projects.viewCode')}*/}
                  {/*    </a>*/}
                  {/*  </Button>*/}
                  {/*  <Button variant="ghost" size="sm" className="h-8 px-3 text-xs" asChild>*/}
                  {/*    <a href="#" target="_blank" rel="noopener noreferrer">*/}
                  {/*      <ExternalLink className="h-3.5 w-3.5 mr-1.5" />*/}
                  {/*      {t('projects.liveDemo')}*/}
                  {/*    </a>*/}
                  {/*  </Button>*/}
                  {/*</div>*/}
                </div>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
