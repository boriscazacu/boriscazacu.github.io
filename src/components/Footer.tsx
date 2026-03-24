import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-sm text-muted-foreground">
           {t('footer.copyright', {year: currentYear})}
          </p>
        </div>
      </div>
    </footer>
  );
}
