export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export interface ContactServiceResponse {
    success: boolean;
    message?: string;
}

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd6SQzbUEiN4NJFoBCXm_iKmhxpTy4uM84nFrX0hp-DtrgD-Q/viewform';

/**
 * Submits contact form data to Google Form
 * Opens the Google Form in a new tab with pre-filled data
 * @param data - The contact form data
 * @returns Promise resolving to service response
 */
export async function sendContactForm(
    data: ContactFormData
): Promise<ContactServiceResponse> {
    // Create form data for submission
    const formData = new FormData();
    formData.append('entry.2135097085', data.name);
    formData.append('entry.1779079022', data.email);
    formData.append('entry.514448534', data.message);

    // Submit to Google Form
    await fetch(GOOGLE_FORM_URL.replace('viewform', 'formResponse'), {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
    });

    // Note: Google Forms doesn't allow reading response due to CORS
    // but the submission will be recorded in your Google Form responses
    return {
        success: true,
    };
}
