const { test, expect } = require('@playwright/test');

test.describe('API Challenges', () => {
  // 1. Pagination Challenge
  test('Pagination - GET /api/companies with limit and skip', async ({ request }) => {
    // Get first page
    const page1 = await request.get('/api/companies?limit=5&skip=0');
    expect(page1.status()).toBe(200);
    const page1Data = await page1.json();
    
    // Get second page
    const page2 = await request.get('/api/companies?limit=5&skip=5');
    expect(page2.status()).toBe(200);
    const page2Data = await page2.json();

    // Verify both pages have 5 items
    expect(page1Data.items).toHaveLength(5);
    expect(page2Data.items).toHaveLength(5);

    // Verify no overlap between pages
    const page1Ids = new Set(page1Data.items.map(item => item._id));
    const page2Ids = new Set(page2Data.items.map(item => item._id));
    const intersection = new Set([...page1Ids].filter(id => page2Ids.has(id)));
    expect(intersection.size).toBe(0);
  });

  // 2. Search by Location
  test('Search by Location - GET /api/companies/search?location=Hyderabad', async ({ request }) => {
    const res = await request.get('/api/companies/search?location=Hyderabad');
    expect(res.status()).toBe(200);
    const { count, items } = await res.json();
    
    // Verify all returned companies are from Hyderabad
    items.forEach(company => {
      expect(company.location).toMatch(/hyderabad/i);
    });
  });

  // 3. Search by Skill
  test('Search by Skill - GET /api/companies?skill=DSA', async ({ request }) => {
    const res = await request.get('/api/companies?skill=DSA');
    expect(res.status()).toBe(200);
    const { items } = await res.json();
    
    // Verify all companies have DSA in their skills
    items.forEach(company => {
      expect(company.hiringCriteria?.skills).toContain('DSA');
    });
  });

  // 4. Get Company by ID (already partially covered in api.spec.js)
  test('Get Company by ID - GET /api/companies/:id', async ({ request }) => {
    // Get an ID first
    const listRes = await request.get('/api/companies?limit=1');
    const { items } = await listRes.json();
    const testId = items[0]._id;
    
    // Get by ID
    const singleRes = await request.get(`/api/companies/${testId}`);
    expect(singleRes.status()).toBe(200);
    const company = await singleRes.json();
    expect(company._id).toBe(testId);
  });

  // 5. Count All Companies
  test('Count All Companies - GET /api/companies?limit=0', async ({ request }) => {
    const res = await request.get('/api/companies?limit=0');
    expect(res.status()).toBe(200);
    const { count, total } = await res.json();
    
    // Verify total is returned and matches count
    expect(total).toBeDefined();
    expect(count).toBe(total);
    
    // Verify it matches the expected count (19 as mentioned in requirements)
    expect(total).toBe(19);
  });

  // 6. Filter by Multiple Conditions
  test('Filter by Multiple Conditions - GET /api/companies?name=Microsoft&location=Hyderabad', async ({ request }) => {
    const res = await request.get('/api/companies?name=Microsoft&location=Hyderabad');
    expect(res.status()).toBe(200);
    const { items } = await res.json();
    
    // Verify all returned companies match both conditions
    items.forEach(company => {
      expect(company.name.toLowerCase()).toContain('microsoft');
      expect(company.location.toLowerCase()).toContain('hyderabad');
    });
    
    // Test with contradicting conditions
    const contradictRes = await request.get('/api/companies?name=Microsoft&location=Delhi');
    const contradictData = await contradictRes.json();
    expect(contradictData.items.length).toBe(0);
  });
});
