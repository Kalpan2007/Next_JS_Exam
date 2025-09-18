const { test, expect } = require('@playwright/test');

test.describe('Company API Tests', () => {
  // Test for GET /api/companies/count
  test.describe('GET /api/companies/count', () => {
    test('should return total count of companies', async ({ request }) => {
      const response = await request.get('/api/companies/count');
      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('total');
      expect(typeof data.total).toBe('number');
    });

    test('should filter by name', async ({ request }) => {
      const allResponse = await request.get('/api/companies/count');
      const allData = await allResponse.json();
      
      const filteredResponse = await request.get('/api/companies/count?name=Microsoft');
      const filteredData = await filteredResponse.json();
      
      expect(filteredData.total).toBeLessThanOrEqual(allData.total);
    });

    test('should return 0 for non-existing company', async ({ request }) => {
      const response = await request.get('/api/companies/count?name=NonexistentCompany123');
      const data = await response.json();
      expect(data.total).toBe(0);
    });
  });

  // Test for GET /api/companies/top-paid
  test.describe('GET /api/companies/top-paid', () => {
    test('should return max 5 items by default', async ({ request }) => {
      const response = await request.get('/api/companies/top-paid');
      const data = await response.json();
      expect(data.length).toBeLessThanOrEqual(5);
    });

    test('should return companies sorted by base salary in descending order', async ({ request }) => {
      const response = await request.get('/api/companies/top-paid?limit=10');
      const companies = await response.json();
      
      // Verify sorting by checking each company's base salary is <= the previous one
      for (let i = 1; i < companies.length; i++) {
        expect(companies[i].salaryBand.base).toBeLessThanOrEqual(companies[i-1].salaryBand.base);
      }
    });

    test('should respect limit parameter', async ({ request }) => {
      const limit = 3;
      const response = await request.get(`/api/companies/top-paid?limit=${limit}`);
      const data = await response.json();
      expect(data.length).toBe(limit);
    });
  });

  // Test for GET /api/companies/by-skill/:skill
  test.describe('GET /api/companies/by-skill/:skill', () => {
    test('should return companies with specified skill', async ({ request }) => {
      const skill = 'DSA';
      const response = await request.get(`/api/companies/by-skill/${skill}`);
      const companies = await response.json();
      
      companies.forEach(company => {
        const hasSkill = company.hiringCriteria?.skills?.some(s => 
          new RegExp(skill, 'i').test(s)
        );
        expect(hasSkill).toBeTruthy();
      });
    });

    test('should be case insensitive', async ({ request }) => {
      const response1 = await request.get('/api/companies/by-skill/DSA');
      const response2 = await request.get('/api/companies/by-skill/dsa');
      
      const companies1 = await response1.json();
      const companies2 = await response2.json();
      
      expect(companies1.length).toBe(companies2.length);
    });

    test('should return empty array for non-existing skill', async ({ request }) => {
      const response = await request.get('/api/companies/by-skill/nonexistentskill123');
      const data = await response.json();
      expect(data).toEqual([]);
    });
  });

  // Test for GET /api/companies/by-location/:location
  test.describe('GET /api/companies/by-location/:location', () => {
    test('should return companies in specified location', async ({ request }) => {
      const location = 'Hyderabad';
      const response = await request.get(`/api/companies/by-location/${location}`);
      const companies = await response.json();
      
      companies.forEach(company => {
        expect(company.location.toLowerCase()).toContain(location.toLowerCase());
      });
    });

    test('should be case insensitive', async ({ request }) => {
      const response1 = await request.get('/api/companies/by-location/Hyderabad');
      const response2 = await request.get('/api/companies/by-location/hyderabad');
      
      const companies1 = await response1.json();
      const companies2 = await response2.json();
      
      expect(companies1.length).toBe(companies2.length);
    });

    test('should return empty array for non-existing location', async ({ request }) => {
      const response = await request.get('/api/companies/by-location/nonexistentlocation123');
      const data = await response.json();
      expect(data).toEqual([]);
    });
  });

  // Test for GET /api/companies/headcount-range
  test.describe('GET /api/companies/headcount-range', () => {
    test('should return companies with headcount >= min', async ({ request }) => {
      const min = 1000;
      const response = await request.get(`/api/companies/headcount-range?min=${min}`);
      const companies = await response.json();
      
      companies.forEach(company => {
        expect(company.headcount).toBeGreaterThanOrEqual(min);
      });
    });

    test('should return companies within min and max range', async ({ request }) => {
      const min = 1000;
      const max = 5000;
      const response = await request.get(`/api/companies/headcount-range?min=${min}&max=${max}`);
      const companies = await response.json();
      
      companies.forEach(company => {
        expect(company.headcount).toBeGreaterThanOrEqual(min);
        expect(company.headcount).toBeLessThanOrEqual(max);
      });
    });

    test('should handle invalid input', async ({ request }) => {
      const response = await request.get('/api/companies/headcount-range?min=abc');
      expect(response.status()).toBe(400);
      
      const data = await response.json();
      expect(data).toHaveProperty('error');
    });
  });

  // Test for GET /api/companies/benefit/:benefit
  test.describe('GET /api/companies/benefit/:benefit', () => {
    test('should return companies with specified benefit', async ({ request }) => {
      const benefit = 'Insurance';
      const response = await request.get(`/api/companies/benefit/${benefit}`);
      const companies = await response.json();
      
      companies.forEach(company => {
        const hasBenefit = company.benefits?.some(b => 
          new RegExp(benefit, 'i').test(b)
        );
        expect(hasBenefit).toBeTruthy();
      });
    });

    test('should support partial matches', async ({ request }) => {
      const partialBenefit = 'insur';
      const response = await request.get(`/api/companies/benefit/${partialBenefit}`);
      const companies = await response.json();
      
      companies.forEach(company => {
        const hasBenefit = company.benefits?.some(b => 
          new RegExp(partialBenefit, 'i').test(b)
        );
        expect(hasBenefit).toBeTruthy();
      });
    });

    test('should be case insensitive', async ({ request }) => {
      const response1 = await request.get('/api/companies/benefit/Insurance');
      const response2 = await request.get('/api/companies/benefit/insurance');
      
      const companies1 = await response1.json();
      const companies2 = await response2.json();
      
      expect(companies1.length).toBe(companies2.length);
    });

    test('should return empty array for non-existing benefit', async ({ request }) => {
      const response = await request.get('/api/companies/benefit/nonexistentbenefit123');
      const data = await response.json();
      expect(data).toEqual([]);
    });
  });
});
