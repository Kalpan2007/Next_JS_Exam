import clientPromise from '../../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { benefit } = params;
    
    const client = await clientPromise;
    const db = client.db('database_01');
    const coll = db.collection('companies');

    // Case-insensitive partial match for benefits
    const companies = await coll.find({
      'benefits': {
        $elemMatch: { $regex: new RegExp(benefit, 'i') }
      }
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
    }).toArray();
    
    return NextResponse.json(companies, { status: 200 });
  } catch (err) {
    console.error('GET /api/companies/benefit error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
