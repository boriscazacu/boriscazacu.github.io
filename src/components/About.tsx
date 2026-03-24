import {useTranslation} from 'react-i18next';

export function About() {
    const {t} = useTranslation();
    const techStack = t('about.techStack', {returnObjects: true}) as {
        backend: string[];
        frontend: string[];
        tools: string[];
        database: string[];
        other: string[];
    };

    function parseExperienceYears() {
        const startMonth = 4;
        const startYear = 2020;
        const now = new Date();
        return now.getFullYear() - (startYear + (now.getMonth() > startMonth ? 0 : 1));
    }

    return (
        <section id="about" className="py-20 md:py-32 bg-section-alt">
            <div className="section-container">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        {t('about.title')}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('about.subtitle')}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Left: Bio and Stats */}
                    <div>
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
                            {t('about.description')}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6">
                            <div className="text-center p-6 rounded-xl bg-card border border-border hover-lift">
                                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                                    {parseExperienceYears()}+
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {t('about.experience.label')}
                                </div>
                            </div>
                            <div className="text-center p-6 rounded-xl bg-card border border-border hover-lift">
                                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                                    10+
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {t('about.projects.label')}
                                </div>
                            </div>
                            <div className="text-center p-6 rounded-xl bg-card border border-border hover-lift">
                                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                                    8+
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {t('about.clients.label')}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Skills */}
                    <div className="space-y-8">
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                            {t('about.skills.title')}
                        </h3>

                        {/* Frontend */}
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                                {t('about.skills.frontend')}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {techStack.frontend.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-full border border-primary/20"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Backend */}
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                                {t('about.skills.backend')}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {techStack.backend.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 text-sm bg-accent text-accent-foreground rounded-full border border-border"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Database */}
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                                {t('about.skills.database')}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {techStack.database.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 text-sm bg-accent text-accent-foreground rounded-full border border-border"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Tools */}
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                                {t('about.skills.tools')}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {techStack.tools.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-full border border-border"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Other */}
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                                {t('about.skills.other')}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {techStack.other.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-full border border-border"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
