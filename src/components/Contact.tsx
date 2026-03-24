import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Send, href: 'https://t.me', label: 'Telegram' }
];

export function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: t('contact.form.success'),
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div>
              {/* Email */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  {t('contact.email')}
                </h3>
                <a
                  href="mailto:boris.cazacu@outlook.com"
                  className="inline-flex items-center gap-2 text-lg text-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  boris.cazacu@outlook.com
                </a>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                  {t('contact.social')}
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                {/*<Input*/}
                {/*  type="text"*/}
                {/*  placeholder={t('contact.form.name')}*/}
                {/*  required*/}
                {/*  className="bg-muted/50 border-border focus:border-primary"*/}
                {/*/>*/}
              </div>
              <div>
                <Input
                  type="email"
                  placeholder={t('contact.form.email')}
                  required
                  className="bg-muted/50 border-border focus:border-primary"
                />
              </div>
              <div>
                <Textarea
                  placeholder={t('contact.form.message')}
                  required
                  rows={5}
                  className="bg-muted/50 border-border focus:border-primary resize-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  t('contact.form.sending')
                ) : (
                  <>
                    {t('contact.form.send')}
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
