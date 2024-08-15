import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

const fromEmail = process.env.FROM_EMAIL;

export async function POST(req, res) {
  const { email, subject, message } = await req.json();
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: 'omar.assi.tech@gmail.com',
          pass: 'vdzmccjbsljowyxq'
      }
  })
    const data = await transporter.sendMail({
      from: 'omar.assi.tech@gmail.com',
      to: ['andomaroid1@gmail.com', 'omar.assi.tech@gmail.com'],
      subject: 'SMTP-Server from Portfolio',
      replyTo: email,
      
      html: `
          <h2>New message from SMTP-Server:</h2>
          <h3>${email}</h3>
          <h3>${subject}</h3>
          <h3>${message}</h3>
            `,
    });
    const response = NextResponse.json(data)
    return response
  } catch (error) {
    return NextResponse.json({ error });
  }
}