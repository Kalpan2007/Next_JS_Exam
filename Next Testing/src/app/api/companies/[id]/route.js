// app/api/companies/[id]/route.js
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('database_01');
    const coll = db.collection('companies');

    const doc = await coll.findOne(
      { _id: new ObjectId(id) },
      {
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
      }
    );

    if (!doc) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    return NextResponse.json(doc, { status: 200 });
  } catch (err) {
    console.error('GET /api/companies/:id error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
