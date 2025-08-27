interface NAVData {
  date: string;
  nav: string;
}

export function sortNAVsByDate(data: NAVData[]): NAVData[] {
  return [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getLatestNAV(data: NAVData[]): { nav: string; date: string } {
  const sortedData = sortNAVsByDate(data);
  return {
    nav: sortedData[0].nav,
    date: sortedData[0].date,
  };
}

export function findNearestNAV(data: NAVData[], targetDate: Date, windowDays: number = 3): NAVData | null {
  const sortedData = sortNAVsByDate(data);
  const targetTime = targetDate.getTime();
  const windowMs = windowDays * 24 * 60 * 60 * 1000;

  return sortedData.find(entry => {
    const entryTime = new Date(entry.date).getTime();
    return Math.abs(entryTime - targetTime) <= windowMs;
  }) || null;
}

export function calculateReturn(latestNAV: number, pastNAV: number): number {
  return ((latestNAV - pastNAV) / pastNAV) * 100;
}

export function calculateTrailingReturns(data: NAVData[]) {
  const sortedData = sortNAVsByDate(data);
  const latest = sortedData[0];
  const latestNAV = parseFloat(latest.nav);
  const latestDate = new Date(latest.date);

  // Calculate lookback dates
  const oneMonthAgo = new Date(latestDate.setMonth(latestDate.getMonth() - 1));
  const threeMonthsAgo = new Date(latestDate.setMonth(latestDate.getMonth() - 3));
  const sixMonthsAgo = new Date(latestDate.setMonth(latestDate.getMonth() - 6));

  // Find nearest NAVs
  const oneMonthNav = findNearestNAV(data, oneMonthAgo);
  const threeMonthNav = findNearestNAV(data, threeMonthsAgo);
  const sixMonthNav = findNearestNAV(data, sixMonthsAgo);

  return {
    oneMonth: oneMonthNav ? calculateReturn(latestNAV, parseFloat(oneMonthNav.nav)) : null,
    threeMonth: threeMonthNav ? calculateReturn(latestNAV, parseFloat(threeMonthNav.nav)) : null,
    sixMonth: sixMonthNav ? calculateReturn(latestNAV, parseFloat(sixMonthNav.nav)) : null,
  };
}
