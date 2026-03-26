import { useTranslation } from 'react-i18next';
import { Briefcase, Calendar, Users } from 'lucide-react';

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  responsibilities: string[];
  teamSize: string;
  technologies: string[];
}

export function Experience() {
  const { t } = useTranslation();
  const items = t('experience.items', { returnObjects: true }) as ExperienceItem[];

  return (
    <section id="experience" className="py-16 sm:py-20 md:py-32 bg-section-alt">
      <div className="section-container">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            {t('experience.title')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            {t('experience.subtitle')}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

          {items.map((item, index) => (
            <div
              key={index}
              className={`relative flex items-start ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } ${index > 0 ? 'md:-mt-24 sm:mt-20' : ''}`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary border-4 border-background shadow-md z-10" />

              {/* Content card */}
              <div
                className={`ml-10 sm:ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'md:pr-0 md:mr-auto md:pl-0' : 'md:pl-0 md:ml-auto md:pr-0'
                }`}
              >
                <div className="p-4 sm:p-6 rounded-xl bg-card border border-border hover-lift">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-foreground">{item.company}</h3>
                      <p className="text-sm font-medium text-primary">{item.role}</p>
                    </div>
                    <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mt-0.5 sm:mt-1" />
                  </div>

                  {/* Period & Team */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-2 sm:mb-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      {t('experience.team')}: {item.teamSize}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{item.description}</p>

                  {/* Responsibilities */}
                  <h3 className="text-xs sm:text-sm font-semibold mb-2">{t('experience.responsibilities')}</h3>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1 mb-3 sm:mb-4">
                    {item.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary font-bold text-lg shrink-0 mt-0.5">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] sm:text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
