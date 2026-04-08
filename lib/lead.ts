export type ContactLead = {
  kind: 'contact';
  firstName: string;
  lastName: string;
  email: string;
  projectType: string;
  details?: string[];
  message: string;
};

export type NewsletterLead = {
  kind: 'newsletter';
  email: string;
};

export type LeadSubmission = ContactLead | NewsletterLead;

type LeadResponse = {
  success: true;
  message: string;
};

type LeadErrorResponse = {
  success: false;
  error: string;
};

export async function submitLead(payload: LeadSubmission) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null)) as
    | LeadResponse
    | LeadErrorResponse
    | null;

  if (!response.ok || !data) {
    throw new Error('Something went wrong while sending your message.');
  }

  if (data.success !== true) {
    const errorMessage = data.error;
    throw new Error(errorMessage || 'Something went wrong while sending your message.');
  }

  return data;
}
