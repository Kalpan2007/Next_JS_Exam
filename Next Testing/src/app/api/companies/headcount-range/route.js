import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    let min = parseInt(url.searchParams.get('min') || '0', 10);
    let max = url.searchParams.get('max');
    
    // Validate min is a number
    if (isNaN(min)) {
      return NextResponse.json(
        { error: 'Invalid min value' }, 
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('database_01');
    const coll = db.collection('companies');

    // Build the query
    const query = { employeeCount: { $gte: min } };
    
    // Add max to query if provided and valid
    if (max !== null && max !== undefined) {
      max = parseInt(max, 10);
      if (!isNaN(max)) {
        query.employeeCount.$lte = max;
      } else {
        return NextResponse.json(
          { error: 'Invalid max value' }, 
          { status: 400 }
        );
      }
    }

    const companies = await coll.find(query, {
      projection: {
        _id: 1,
        name: 1,
        location: 1,
        'salaryBand.base': 1,
        'salaryBand.stock': 1,
        'hiringCriteria.cgpa': 1,
        'hiringCriteria.skills': 1,
        'hiringCriteria.experience': 1,
        interviewRounds: 1,
        benefits: 1,
        employeeCount: 1
      }
    }).toArray();
    
    return NextResponse.json(companies, { status: 200 });
  } catch (err) {
    console.error('GET /api/companies/headcount-range error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
