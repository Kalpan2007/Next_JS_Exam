// app/api/companies/search/route.js
import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');
    const location = url.searchParams.get('location');
    const skill = url.searchParams.get('skill');
    const limit = parseInt(url.searchParams.get('limit') || '50', 10);
    const skip = Math.max(parseInt(url.searchParams.get('skip') || '0', 10), 0);

    const client = await clientPromise;
    const db = client.db('database_01');
    const coll = db.collection('companies');

    // Build the filter with case-insensitive matching
    const filter = {};
    if (name) filter.name = { $regex: new RegExp(name, 'i') };
    if (location) filter.location = { $regex: new RegExp(location, 'i') };
    if (skill) filter['hiringCriteria.skills'] = skill;

    // Get total count
    const total = await coll.countDocuments(filter);
    
    // If limit is 0, only return the count
    if (limit === 0) {
      return NextResponse.json({ count: 0, total, items: [] }, { status: 200 });
    }

    // Apply pagination with projection to match expected response
    const items = await coll.find(filter, {
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
    .skip(skip)
    .limit(Math.min(limit, 100))
    .toArray();

    return NextResponse.json({ 
      count: items.length, 
      total,
      items 
    }, { status: 200 });
  } catch (err) {
    console.error('GET /api/companies/search error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
