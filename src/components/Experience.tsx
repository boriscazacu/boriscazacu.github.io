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
    <section id="experience" className="py-20 md:py-32 bg-section-alt">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('experience.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
              } ${index > 0 ? '-mt-24' : ''}`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-md z-10" />

              {/* Content card */}
              <div
                className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'md:pr-0 md:mr-auto md:pl-0' : 'md:pl-0 md:ml-auto md:pr-0'
                }`}
              >
                <div className="p-6 rounded-xl bg-card border border-border hover-lift">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{item.company}</h3>
                      <p className="text-sm font-medium text-primary">{item.role}</p>
                    </div>
                    <Briefcase className="h-5 w-5 text-primary shrink-0 mt-1" />
                  </div>

                  {/* Period & Team */}
                  <div className="flex flex-wrap gap-3 mb-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {t('experience.team')}: {item.teamSize}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>

                  {/* Responsibilities */}
                  <h3 className="text-sm font-semibold">{t('experience.responsibilities')}</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                    {item.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="text-primary font-bold text-xl shrink-0">•</span>
                        {resp}
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
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
