import clientPromise from '../../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { skill } = params;
    
    const client = await clientPromise;
    const db = client.db('database_01');
    const coll = db.collection('companies');

    // Case-insensitive exact match for the skill
    const companies = await coll.find({
      'hiringCriteria.skills': {
        $regex: new RegExp(`^${skill}$`, 'i')
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
    console.error('GET /api/companies/by-skill error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
