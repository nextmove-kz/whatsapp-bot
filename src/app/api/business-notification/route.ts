import { pocketbase } from '@/api/pocketbase';
import { NextRequest, NextResponse } from 'next/server';
import { text } from 'stream/consumers';
import { OrdersResponse } from '../../../api/api_types';

export async function POST(req: NextRequest) {
    const { phone, id, orderItems, orderDetails, paymentMethod } = await req.json();

    if (!phone) {
        return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    try {
        const pb = await pocketbase();
        const response = await fetch('https://graph.facebook.com/v22.0/556656727528256/messages', {
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
                    name: 'business_order_notification',
                    language: {
                        code: 'ru',
                        policy: 'deterministic'
                    },
                    components: [
                        {
                            type: 'header',
                            parameters: [
                                {
                                    type: 'text',
                                    parameter_name: 'order_id',
                                    text: id
                                }
                            ]
                        },
                        {
                            type: 'body',
                            parameters: [
                                {
                                    type: 'text',
                                    parameter_name: 'order_items',
                                    text: orderItems
                                },
                                {
                                    type: 'text',
                                    parameter_name: 'order_details',
                                    text: orderDetails
                                },
                                {
                                    type: 'text',
                                    parameter_name: 'payment_method',
                                    text: paymentMethod
                                }
                            ]
                        },
                        {
                            type: 'button',
                            sub_type: 'url',
                            index: '0',
                            parameters: [
                                {
                                    type: 'text',
                                    text: id
                                }
                            ]
                        },
                        {
                            type: 'button',
                            sub_type: 'url',
                            index: '1',
                            parameters: [
                                {
                                    type: 'text',
                                    text: id
                                }
                            ]
                        }
                    ]
                }
            }),
        });


        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: errorData }, { status: response.status });
        }

        const data = await response.json();
        // try {
        //     const ordersResponse = await pb.collection('orders').update(id, {status: true});
        //     console.log(ordersResponse)
        // } catch (error) {
        //     console.error('Error occurred:', error);
        // }
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Error occurred:', error);
        return NextResponse.json({ error: 'An internal server error occurred' }, { status: 500 });
    }
}
