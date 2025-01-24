import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { phone } = await req.json();

    if (!phone) {
        return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    try {
        const response = await fetch('https://graph.facebook.com/v21.0/556656727528256/messages', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                to: phone,
                type: 'template',
                template: {
                    name: 'hello_world',
                    language: {
                        code: 'en_US',
                    },
                },
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: errorData }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Error occurred:', error);
        return NextResponse.json({ error: 'An internal server error occurred' }, { status: 500 });
    }
}
