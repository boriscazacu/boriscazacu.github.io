import jsPDF from 'jspdf';
import i18n from '@/i18n';

interface ExperienceItem {
    company: string;
    role: string;
    period: string;
    description: string;
    responsibilities: string[];
    teamSize: string;
    technologies: string[];
}

interface ProjectItem {
    title: string;
    description: string;
    technologies: string[];
    role: string;
    teamSize: string;
}

export function generateCV() {
    const t = i18n.t.bind(i18n);
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const pageHeight = 297;
    const marginLeft = 20;
    const marginRight = 20;
    const contentWidth = pageWidth - marginLeft - marginRight;
    let y = 0;

    // Colors
    const green = {r: 34, g: 139, b: 94}; // primary green
    const dark = {r: 30, g: 41, b: 59};
    const gray = {r: 100, g: 116, b: 139};
    const lightGray = {r: 241, g: 245, b: 249};

    function checkPageBreak(needed: number) {
        if (y + needed > pageHeight - 20) {
            doc.addPage();
            y = 20;
        }
    }

    function drawSectionTitle(title: string) {
        checkPageBreak(15);
        y += 6;
        doc.setFillColor(green.r, green.g, green.b);
        doc.rect(marginLeft, y, contentWidth, 0.8, 'F');
        y += 6;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(green.r, green.g, green.b);
        doc.text(title.toUpperCase(), marginLeft, y);
        y += 8;
    }

    function drawText(text: string, size: number, color: {
        r: number;
        g: number;
        b: number
    }, style: string = 'normal', indent = 0) {
        doc.setFont('helvetica', style);
        doc.setFontSize(size);
        doc.setTextColor(color.r, color.g, color.b);
        const lines = doc.splitTextToSize(text, contentWidth - indent);
        for (const line of lines) {
            checkPageBreak(size * 0.5 + 2);
            doc.text(line, marginLeft + indent, y);
            y += size * 0.45 + 1.5;
        }
    }

    // ========== HEADER ==========
    // Green header bar
    doc.setFillColor(green.r, green.g, green.b);
    doc.rect(0, 0, pageWidth, 45, 'F');

    // Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.setTextColor(255, 255, 255);
    doc.text(t('hero.name'), marginLeft, 22);

    // Title
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text(t('hero.title'), marginLeft, 33);

    // Tagline
    doc.setFontSize(9);
    doc.setTextColor(220, 255, 235);
    doc.text(t('hero.tagline'), marginLeft, 41);

    y = 55;

    // ========== ABOUT ==========
    drawSectionTitle(t('about.title'));
    drawText(t('about.description'), 10, gray);
    y += 2;

    // Stats row
    const stats = [
        {value: t('about.experience.years'), label: t('about.experience.label')},
        {value: t('about.projects.count'), label: t('about.projects.label')},
        {value: t('about.clients.count'), label: t('about.clients.label')},
    ];

    checkPageBreak(18);
    const statWidth = contentWidth / 3;
    for (let i = 0; i < stats.length; i++) {
        const x = marginLeft + i * statWidth;
        doc.setFillColor(lightGray.r, lightGray.g, lightGray.b);
        doc.roundedRect(x, y, statWidth - 4, 14, 2, 2, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(green.r, green.g, green.b);
        doc.text(stats[i].value, x + (statWidth - 4) / 2, y + 7, {align: 'center'});
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(gray.r, gray.g, gray.b);
        doc.text(stats[i].label, x + (statWidth - 4) / 2, y + 12, {align: 'center'});
    }
    y += 20;

    // ========== TECH STACK ==========
    drawSectionTitle(t('about.skills.title'));
    const techStack = t('about.techStack', {returnObjects: true}) as {
        backend: string[];
        frontend: string[];
        tools: string[]
    };

    const categories = [
        {label: t('about.skills.backend'), items: techStack.backend},
        {label: t('about.skills.frontend'), items: techStack.frontend},
        {label: t('about.skills.tools'), items: techStack.tools},
    ];

    for (const cat of categories) {
        checkPageBreak(12);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(dark.r, dark.g, dark.b);
        doc.text(cat.label + ':', marginLeft, y);
        y += 5;

        // Draw skill tags inline
        let tagX = marginLeft;
        for (const skill of cat.items) {
            const tagWidth = doc.getTextWidth(skill) + 6;
            if (tagX + tagWidth > pageWidth - marginRight) {
                tagX = marginLeft;
                y += 7;
                checkPageBreak(8);
            }
            doc.setFillColor(220, 245, 230);
            doc.roundedRect(tagX, y - 4, tagWidth, 6, 1.5, 1.5, 'F');
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            doc.setTextColor(green.r, green.g, green.b);
            doc.text(skill, tagX + 3, y);
            tagX += tagWidth + 3;
        }
        y += 10;
    }

    // ========== WORK EXPERIENCE ==========
    drawSectionTitle(t('experience.title'));
    const experiences = t('experience.items', {returnObjects: true}) as ExperienceItem[];

    for (const exp of experiences) {
        checkPageBreak(30);

        // Company & Role
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(dark.r, dark.g, dark.b);
        doc.text(exp.company, marginLeft, y);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(gray.r, gray.g, gray.b);
        doc.text(exp.period + '  |  Team: ' + exp.teamSize, pageWidth - marginRight, y, {align: 'right'});
        y += 5;

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.setTextColor(green.r, green.g, green.b);
        doc.text(exp.role, marginLeft, y);
        y += 5;

        // Description
        drawText(exp.description, 9, gray, 'normal', 0);
        y += 1;

        // Responsibilities
        for (const resp of exp.responsibilities) {
            checkPageBreak(6);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            doc.setTextColor(gray.r, gray.g, gray.b);
            const lines = doc.splitTextToSize(resp, contentWidth - 8);
            doc.text('•', marginLeft + 2, y);
            for (let li = 0; li < lines.length; li++) {
                doc.text(lines[li], marginLeft + 7, y);
                if (li < lines.length - 1) {
                    y += 4;
                    checkPageBreak(5);
                }
            }
            y += 4;
        }

        // Technologies
        checkPageBreak(8);
        let tx = marginLeft;
        for (const tech of exp.technologies) {
            doc.setFontSize(7);
            const tw = doc.getTextWidth(tech) + 5;
            if (tx + tw > pageWidth - marginRight) {
                tx = marginLeft;
                y += 6;
                checkPageBreak(6);
            }
            doc.setFillColor(lightGray.r, lightGray.g, lightGray.b);
            doc.roundedRect(tx, y - 3, tw, 5, 1, 1, 'F');
            doc.setTextColor(dark.r, dark.g, dark.b);
            doc.text(tech, tx + 2.5, y);
            tx += tw + 2;
        }
        y += 10;

        // Separator
        doc.setDrawColor(230, 230, 230);
        doc.line(marginLeft, y - 4, pageWidth - marginRight, y - 4);
    }

    // ========== PROJECTS ==========
    drawSectionTitle(t('projects.title'));
    const projects = t('projects.items', {returnObjects: true}) as ProjectItem[];

    for (const proj of projects) {
        checkPageBreak(20);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(dark.r, dark.g, dark.b);
        doc.text(proj.title, marginLeft, y);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(gray.r, gray.g, gray.b);
        doc.text(proj.role + '  |  Team: ' + proj.teamSize, pageWidth - marginRight, y, {align: 'right'});
        y += 5;

        drawText(proj.description, 8.5, gray, 'normal', 0);

        // Tech tags
        checkPageBreak(7);
        let px = marginLeft;
        for (const tech of proj.technologies) {
            doc.setFontSize(7);
            const pw = doc.getTextWidth(tech) + 5;
            if (px + pw > pageWidth - marginRight) {
                px = marginLeft;
                y += 6;
                checkPageBreak(6);
            }
            doc.setFillColor(220, 245, 230);
            doc.roundedRect(px, y - 3, pw, 5, 1, 1, 'F');
            doc.setTextColor(green.r, green.g, green.b);
            doc.text(tech, px + 2.5, y);
            px += pw + 2;
        }
        y += 8;
    }

    // ========== FOOTER ==========
    checkPageBreak(15);
    y += 5;
    doc.setFillColor(green.r, green.g, green.b);
    doc.rect(0, y, pageWidth, 0.5, 'F');
    y += 6;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(gray.r, gray.g, gray.b);
    doc.text(t('cv.generatedNote'), pageWidth / 2, y, {align: 'center'});

    // Save
    doc.save('Boris_Cazacu_CV.pdf');
}
