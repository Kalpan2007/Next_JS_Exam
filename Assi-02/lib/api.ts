export interface NAVData {
  date: string;
  nav: string;
}

export interface MutualFundData {
  meta: {
    scheme_code: number;
    scheme_name: string;
    scheme_category: string;
    scheme_type: string;
    fund_house: string;
  };
  data: NAVData[];
  status: string;
}

export async function fetchMutualFund(schemeCode: string | number): Promise<MutualFundData | null> {
  try {
    const response = await fetch(`https://api.mfapi.in/mf/${schemeCode}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data for scheme ${schemeCode}`);
    }
    
    const data = await response.json();
    
    // Ensure data is sorted by date descending (newest first)
    if (data.data && Array.isArray(data.data)) {
      data.data.sort((a: NAVData, b: NAVData) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching mutual fund data for ${schemeCode}:`, error);
    return null;
  }
}

export async function fetchMultipleFunds(schemeCodes: number[]): Promise<(MutualFundData | null)[]> {
  const promises = schemeCodes.map(code => fetchMutualFund(code));
  return Promise.all(promises);
}

export function calculateReturn(currentNAV: string, pastNAV: string): number {
  const current = parseFloat(currentNAV);
  const past = parseFloat(pastNAV);
  if (isNaN(current) || isNaN(past) || past === 0) return 0;
  return ((current - past) / past) * 100;
}

export function findNearestNAV(data: NAVData[], targetDate: Date, windowDays: number = 3): NAVData | null {
  const targetTime = targetDate.getTime();
  const windowMs = windowDays * 24 * 60 * 60 * 1000;
  
  let nearestEntry: NAVData | null = null;
  let smallestDiff = Infinity;
  
  for (const entry of data) {
    const entryTime = new Date(entry.date).getTime();
    const diff = Math.abs(entryTime - targetTime);
    
    if (diff <= windowMs && diff < smallestDiff) {
      smallestDiff = diff;
      nearestEntry = entry;
    }
  }
  
  return nearestEntry;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
}

export function formatCurrency(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
  }).format(num);
}