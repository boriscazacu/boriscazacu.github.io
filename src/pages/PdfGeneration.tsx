import {Button} from "@/components/ui/button.tsx";
import {Download} from "lucide-react";
import {useTranslation} from "react-i18next";


const PdfGeneration = () => {
    const { t } = useTranslation();

    return (
        <div className="flex min-h-screen items-center justify-center bg-background pb-10">
            <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold">PDF Generation</h1>
                <p className="mb-5 text-xl text-muted-foreground">Genereaza CV in format pdf.</p>

                <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-base font-medium border-primary/30 text-primary hover:bg-primary/10"
                    onClick={async () => {
                        const { generateCV } = await import('@/utils/generateCV');
                        await generateCV();
                    }}
                >
                    <Download className="mr-2 h-4 w-4" />
                    {t('hero.cta.downloadCV')}
                </Button>

                <div className='mt-3'>
                    <a className='text-blue-500 hover:text-blue-400 transition-colors font-semibold' href='/'>Home</a>
                </div>
            </div>
        </div>
    );
};

export default PdfGeneration;