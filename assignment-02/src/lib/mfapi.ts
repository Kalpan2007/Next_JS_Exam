// Types for API responses
export interface MFScheme {
  scheme_code: string;
  scheme_name: string;
  data: Array<{
    date: string;
    nav: string;
  }>;
}

const MFAPI_BASE_URL = 'https://api.mfapi.in/mf';

export async function fetchSchemeDetails(schemeCode: string): Promise<MFScheme> {
  const response = await fetch(`${MFAPI_BASE_URL}/${schemeCode}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch scheme ${schemeCode}`);
  }
  return response.json();
}

export async function fetchMultipleSchemes(schemeCodes: string[]): Promise<MFScheme[]> {
  const promises = schemeCodes.map(code => fetchSchemeDetails(code));
  return Promise.all(promises);
}

export async function getAllSchemes(): Promise<{ scheme_code: string; scheme_name: string; }[]> {
  const response = await fetch(MFAPI_BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch all schemes');
  }
  return response.json();
}
