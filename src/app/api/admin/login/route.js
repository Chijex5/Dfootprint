import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

// JWT secret from your .env file
const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Check if the email exists in the database
    const [rows] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const admin = rows[0];

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '1h' });

    // Set the JWT token in a cookie
    // Set the JWT token in a cookie
    const isDev = process.env.NODE_ENV === 'development';
    return NextResponse.json(
      { message: 'Login successful', token },
      {
        status: 200,
        headers: {
          'Set-Cookie': `token=${token}; ${isDev ? '' : 'HttpOnly;'} Path=/; Max-Age=3600`,
        },
      }
    );

  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
