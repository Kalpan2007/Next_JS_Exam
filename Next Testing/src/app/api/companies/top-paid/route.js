import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    let limit = parseInt(url.searchParams.get('limit') || '5', 10);
    limit = Math.min(Math.max(limit, 1), 50); // Ensure limit is between 1 and 50

    const client = await clientPromise;
    const db = client.db('database_01');
    const coll = db.collection('companies');

    const companies = await coll.find({
      'salaryBand.base': { $exists: true, $ne: null }
    }, {
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
    })
    .sort({ 'salaryBand.base': -1 })
    .limit(limit)
    .toArray();
    
    return NextResponse.json(companies, { status: 200 });
  } catch (err) {
    console.error('GET /api/companies/top-paid error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
