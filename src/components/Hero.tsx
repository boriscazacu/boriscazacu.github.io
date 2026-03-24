import { useTranslation } from 'react-i18next';
import { ArrowDown, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="section-container relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          <p className="text-sm md:text-base font-medium text-primary mb-4 animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
            {t('hero.greeting')}
          </p>

          {/* Name */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
            {t('hero.name')}
          </h1>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
            {t('hero.title')}
          </h2>

          {/* Tagline */}
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
            {t('hero.tagline')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in opacity-0" style={{ animationDelay: '0.5s' }}>
            <Button
              size="lg"
              className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-medium shadow-glow"
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
              className="px-8 py-6 text-base font-medium border-border hover:bg-accent"
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
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
