import { useTranslation } from 'react-i18next';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 sm:py-8 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4">
          <AnimateOnScroll delay="0.1s">
            <p className="text-xs sm:text-sm text-muted-foreground text-center px-4">
             {t('footer.copyright', {year: currentYear})}
            </p>
          </AnimateOnScroll>
        </div>
      </div>
    </footer>
  );
}
