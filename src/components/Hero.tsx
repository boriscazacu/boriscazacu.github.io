import { useTranslation } from 'react-i18next';
import { ArrowDown, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-accent/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="section-container relative z-10 pt-12 sm:pt-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          <p className="text-xs sm:text-sm md:text-base font-medium text-primary mb-3 sm:mb-4 animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
            {t('hero.greeting')}
          </p>

          {/* Name */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-3 sm:mb-4 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
            {t('hero.name')}
          </h1>

          {/* Title */}
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground mb-4 sm:mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
            {t('hero.title')}
          </h2>

          {/* Tagline */}
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
            {t('hero.tagline')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto animate-fade-in opacity-0" style={{ animationDelay: '0.5s' }}>
            <Button
              size="lg"
              className="group bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-medium shadow-glow w-full sm:w-auto"
              asChild
            >
              <a href="#projects">
                {t('hero.cta.projects')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-medium border-border hover:bg-accent w-full sm:w-auto"
              asChild
            >
              <a href="#contact">
                {t('hero.cta.contact')}
              </a>
            </Button>
            {/*<Button*/}
            {/*  size="lg"*/}
            {/*  variant="outline"*/}
            {/*  className="px-8 py-6 text-base font-medium border-primary/30 text-primary hover:bg-primary/10"*/}
            {/*  onClick={() => {*/}
            {/*    import('@/utils/generateCV').then(({ generateCV }) => generateCV());*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <Download className="mr-2 h-4 w-4" />*/}
            {/*  {t('hero.cta.downloadCV')}*/}
            {/*</Button>*/}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute -bottom-16 sm:-bottom-20 mx-auto w-full -translate-x-1/2 animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
          <a
            href="#about"
            className="flex flex-col items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-[10px] xs:text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
