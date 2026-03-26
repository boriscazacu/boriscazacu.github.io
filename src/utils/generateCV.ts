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

    // Page dimensions
    const pageWidth = 210;
    const pageHeight = 297;

    // Margins
    const marginLeft = 15;
    const marginRight = 15;
    const marginTop = 15;
    const contentWidth = pageWidth - marginLeft - marginRight;

    // Sidebar dimensions (left column)
    const sidebarWidth = 55;
    const sidebarPadding = 4; // Left padding for sidebar content
    const mainContentWidth = contentWidth - sidebarWidth - 5; // 5mm gap
    const mainContentStart = marginLeft + sidebarWidth + 5;

    // Colors - Professional modern palette
    const colors = {
        primary: {r: 34, g: 139, b: 94},      // Green
        accent: {r: 22, g: 163, b: 74},       // Brighter green accent
        dark: {r: 30, g: 41, b: 59},          // Dark slate
        mediumGray: {r: 75, g: 85, b: 99},    // Gray
        lightGray: {r: 156, g: 163, b: 175},  // Light gray
        bgLight: {r: 243, g: 244, b: 246},    // Very light gray
        white: {r: 255, g: 255, b: 255}
    };

    let yPos = marginTop;

    // ========== HELPER FUNCTIONS ==========

    function checkPageBreak(needed: number) {
        if (yPos + needed > pageHeight - 20) {
            doc.addPage();
            yPos = 43;
            drawSidebarBackground();
        }
    }

    function drawSidebarBackground() {
        // Draw only the light gray sidebar background (starts below header)
        doc.setFillColor(colors.bgLight.r, colors.bgLight.g, colors.bgLight.b);
        doc.rect(marginLeft, 35, sidebarWidth, pageHeight - 35 - marginTop, 'F');
    }

    function drawSidebar() {
        // Draw sidebar background
        drawSidebarBackground();
        
        // Draw sidebar content (only on first page)
        let sidebarY = 45;
        const sidebarContentWidth = sidebarWidth - sidebarPadding * 2;
        
        // Professional Description in sidebar
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(colors.primary.r, colors.primary.g, colors.primary.b);
        const sidebarDesc = doc.splitTextToSize('Passionate developer creating innovative solutions', sidebarContentWidth);
        doc.text(sidebarDesc, marginLeft + sidebarPadding, sidebarY);
        sidebarY += sidebarDesc.length * 2 + 8;
        
        // Separator line
        doc.setDrawColor(colors.lightGray.r, colors.lightGray.g, colors.lightGray.b);
        doc.setLineWidth(0.3);
        doc.line(marginLeft, sidebarY, marginLeft + sidebarWidth, sidebarY);
        sidebarY += 8;
        
        // Tech Stack in sidebar
        const techStack = t('about.techStack', { returnObjects: true }) as {
            backend: string[];
            frontend: string[];
            tools: string[];
            database: string[];
        };
        
        const techCategories = [
            { label: 'Backend', items: techStack.backend },
            { label: 'Frontend', items: techStack.frontend },
            { label: 'Tools', items: techStack.tools },
            { label: 'Database', items: techStack.database }
        ];
        
        techCategories.forEach(cat => {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);
            doc.setTextColor(colors.primary.r, colors.primary.g, colors.primary.b);
            doc.text(cat.label, marginLeft + sidebarPadding, sidebarY);
            sidebarY += 5;
            
            let tagX = marginLeft + sidebarPadding;
            let tagY = sidebarY;
            
            cat.items.forEach(skill => {
                const advance = drawSkillTag(skill, tagX, tagY, sidebarContentWidth);
                if (advance) {
                    tagX += advance;
                    if (tagX + 20 > marginLeft + sidebarWidth - sidebarPadding) {
                        tagX = marginLeft + sidebarPadding;
                        tagY += 7;
                    }
                } else {
                    tagX = marginLeft + sidebarPadding;
                    tagY += 7;
                    drawSkillTag(skill, tagX, tagY, sidebarContentWidth);
                    tagX += 20;
                }
            });
            
            sidebarY = tagY + 10;
        });
        
        sidebarY += 5;
        
        // Separator line
        doc.setDrawColor(colors.lightGray.r, colors.lightGray.g, colors.lightGray.b);
        doc.setLineWidth(0.3);
        doc.line(marginLeft, sidebarY, marginLeft + sidebarWidth, sidebarY);
        sidebarY += 8;
        
        // Languages
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(colors.primary.r, colors.primary.g, colors.primary.b);
        doc.text('LANGUAGES', marginLeft + sidebarPadding, sidebarY);
        sidebarY += 6;
        
        const languagesData = t('about.languages', { returnObjects: true }) as { title: string; items: { name: string; level: string }[] };
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(colors.mediumGray.r, colors.mediumGray.g, colors.mediumGray.b);
        languagesData.items.forEach(lang => {
            const langText = doc.splitTextToSize(lang.name, sidebarContentWidth - 15);
            doc.text(langText, marginLeft + sidebarPadding, sidebarY);
            doc.setFont('helvetica', 'italic');
            const levelText = doc.splitTextToSize(lang.level, 20);
            doc.text(levelText, marginLeft + sidebarWidth - 18, sidebarY, { align: 'right' });
            doc.setFont('helvetica', 'normal');
            sidebarY += Math.max(langText.length, levelText.length) * 4;
        });
        sidebarY += 8;
        
        // Education
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(colors.primary.r, colors.primary.g, colors.primary.b);
        doc.text('EDUCATION', marginLeft + sidebarPadding, sidebarY);
        sidebarY += 6;
        
        const education = t('about.education', { returnObjects: true }) as {
            title: string;
            items: { degree: string; school: string; year: string }[];
        };
        education.items.forEach(edu => {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            doc.setTextColor(colors.mediumGray.r, colors.mediumGray.g, colors.mediumGray.b);
            const degreeLines = doc.splitTextToSize(edu.degree, sidebarContentWidth);
            doc.text(degreeLines, marginLeft + sidebarPadding, sidebarY);
            sidebarY += degreeLines.length * 4;
            
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(7);
            const schoolLines = doc.splitTextToSize(edu.school, sidebarContentWidth);
            doc.text(schoolLines, marginLeft + sidebarPadding, sidebarY);
            sidebarY += schoolLines.length * 4;
            
            doc.text(edu.year, marginLeft + sidebarPadding, sidebarY);
            sidebarY += 8;
        });
    }

    function drawSectionTitle(title: string, isMainContent = true, showLine = true) {
        const x = isMainContent ? mainContentStart : marginLeft;
        const width = isMainContent ? mainContentWidth : sidebarWidth;

        checkPageBreak(12);
        


        // Section title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(colors.primary.r, colors.primary.g, colors.primary.b);
        doc.text(title.toUpperCase(), x, yPos);
        yPos += 5;

        if (showLine) {
            yPos -= 2;
            // Section line
            doc.setDrawColor(colors.primary.r, colors.primary.g, colors.primary.b);
            doc.setLineWidth(0.5);
            doc.line(x, yPos, x + width, yPos);
            yPos += 7;
        }
    }

    function drawBulletPoint(text: string, size: number, color: typeof colors.dark, x: number, maxWidth: number) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(size);
        doc.setTextColor(color.r, color.g, color.b);
        const lines = doc.splitTextToSize(text, maxWidth - 5);

        // Draw bullet
        doc.text('•', x, yPos);

        // Draw text lines
        for (let i = 0; i < lines.length; i++) {
            checkPageBreak(size * 0.5 + 2);
            const lineX = i === 0 ? x + 4 : x;
            doc.text(lines[i], lineX, yPos);
            yPos += size * 0.5 + 1;
        }
    }

    function drawSkillTag(skill: string, x: number, y: number, maxWidth: number) {
        const padding = 2;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        const skillWidth = doc.getTextWidth(skill) + padding * 2;

        if (x + skillWidth > marginLeft + sidebarWidth) {
            return null; // Doesn't fit
        }

        // Background
        doc.setFillColor(colors.white.r, colors.white.g, colors.white.b);
        doc.setDrawColor(colors.primary.r, colors.primary.g, colors.primary.b);
        doc.setLineWidth(0.3);
        doc.roundedRect(x, y - 3, skillWidth, 5, 1, 1, 'S');

        // Text
        doc.setTextColor(colors.primary.r, colors.primary.g, colors.primary.b);
        doc.text(skill, x + padding, y);

        return skillWidth + 2;
    }

    // ========== HEADER ==========
    // Dark header bar at top
    doc.setFillColor(colors.dark.r, colors.dark.g, colors.dark.b);
    doc.rect(0, 0, pageWidth, 35, 'F');

    // Name (large, white)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    doc.setTextColor(255, 255, 255);
    doc.text(t('hero.name'), marginLeft, 15);

    // Title (smaller, white)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(t('hero.title'), marginLeft, 23);

    // Contact info in header (right side)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    const headerContact = [
        'boris.cazacu2022@gmail.com',
        '+373 XX XXX XXXX',
        'linkedin.com/in/boriscazacu'
    ];
    headerContact.forEach((line, i) => {
        doc.text(line, pageWidth - marginRight, 15 + i * 5, { align: 'right' });
    });

    yPos = 42;

    // Draw sidebar (background + content)
    drawSidebar();

    // ========== MAIN CONTENT AREA ==========
    yPos = 43;

    // ========== WORK EXPERIENCE ==========
    drawSectionTitle('Work Experience', true, true);

    const experiences = t('experience.items', {returnObjects: true}) as ExperienceItem[];

    experiences.forEach((exp, index) => {
        checkPageBreak(35);

        // Company name (bold, larger)
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(colors.dark.r, colors.dark.g, colors.dark.b);
        doc.text(exp.company, mainContentStart, yPos);

        // Period and team size (right aligned)
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(colors.lightGray.r, colors.lightGray.g, colors.lightGray.b);
        doc.text(exp.period, mainContentStart + mainContentWidth, yPos, {align: 'right'});
        yPos += 5;

        // Role
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(colors.primary.r, colors.primary.g, colors.primary.b);
        doc.text(exp.role, mainContentStart, yPos);
        yPos += 5;

        // Description
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(colors.mediumGray.r, colors.mediumGray.g, colors.mediumGray.b);
        const descLines = doc.splitTextToSize(exp.description, mainContentWidth);
        doc.text(descLines, mainContentStart, yPos);
        yPos += descLines.length * 4.5 + 2;

        // Responsibilities
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(colors.dark.r, colors.dark.g, colors.dark.b);
        doc.text('Key Responsibilities:', mainContentStart, yPos);
        yPos += 5;

        exp.responsibilities.forEach(resp => {
            drawBulletPoint(resp, 8, colors.mediumGray, mainContentStart, mainContentWidth);
        });

        // Technologies
        yPos += 3;
        const techStartX = mainContentStart;
        let techX = techStartX;
        let techY = yPos;
        
        exp.technologies.forEach(tech => {
            doc.setFontSize(7);
            const techWidth = doc.getTextWidth(tech) + 6;
            
            // Check if tech fits on current line
            if (techX + techWidth > mainContentStart + mainContentWidth) {
                techX = techStartX;
                techY += 7;
            }
            
            // Tech tag background
            doc.setFillColor(colors.bgLight.r, colors.bgLight.g, colors.bgLight.b);
            doc.roundedRect(techX, techY - 2, techWidth, 5, 1.5, 1.5, 'F');
            
            // Tech text
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(colors.primary.r, colors.primary.g, colors.primary.b);
            doc.text(tech, techX + 3, techY);
            techX += techWidth + 2;
        });
        yPos = techY + 10;

        // Separator line (except for last item)
        if (index < experiences.length - 1) {
            doc.setDrawColor(colors.bgLight.r, colors.bgLight.g, colors.bgLight.b);
            doc.setLineWidth(0.3);
            doc.line(mainContentStart, yPos, mainContentStart + mainContentWidth, yPos);
            yPos += 5;
        }
    });

    // ========== PROJECTS ==========
    drawSectionTitle('Featured Projects');

    const projects = t('projects.items', {returnObjects: true}) as ProjectItem[];

    // Show top 4-5 projects to fit on page
    const projectsToShow = projects.slice(0, 5);

    projectsToShow.forEach((proj) => {
        checkPageBreak(20);

        // Project title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(colors.dark.r, colors.dark.g, colors.dark.b);
        doc.text(proj.title, mainContentStart, yPos);

        // Role (right aligned)
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(colors.lightGray.r, colors.lightGray.g, colors.lightGray.b);
        doc.text(proj.role, mainContentStart + mainContentWidth, yPos, {align: 'right'});
        yPos += 5;

        // Description
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(colors.mediumGray.r, colors.mediumGray.g, colors.mediumGray.b);
        const projLines = doc.splitTextToSize(proj.description, mainContentWidth);
        doc.text(projLines, mainContentStart, yPos);
        yPos += projLines.length * 4.5 + 2;

        // Technologies
        const projTechStartX = mainContentStart;
        let pX = projTechStartX;
        let pY = yPos;
        
        proj.technologies.forEach(tech => {
            doc.setFontSize(7);
            const pWidth = doc.getTextWidth(tech) + 6;
            
            // Check if tech fits on current line
            if (pX + pWidth > mainContentStart + mainContentWidth) {
                pX = projTechStartX;
                pY += 7;
            }
            
            doc.setFillColor(colors.bgLight.r, colors.bgLight.g, colors.bgLight.b);
            doc.roundedRect(pX, pY - 4, pWidth, 5, 1.5, 1.5, 'F');
            
            doc.setTextColor(colors.primary.r, colors.primary.g, colors.primary.b);
            doc.text(tech, pX + 3, pY);
            pX += pWidth + 2;
        });
        yPos = pY + 10;
    });

    // Save the PDF
    doc.save('Boris_Cazacu_CV.pdf');
    // window.open(doc.output('bloburl'), '_blank');
}
