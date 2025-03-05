import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const params = makeParams(body);

  try {
    const response = await fetch(
      "https://graph.facebook.com/v22.0/556656727528256/messages",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: "787058275283",
          type: "template",
          template: {
            name: "consultation_notify",
            language: {
              code: "ru",
              policy: "deterministic",
            },
            components: [
              {
                type: "body",
                parameters: params,
              },
            ],
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}

type Param = {
  type: "text";
  parameter_name: string;
  text: string;
};

const makeParams = (params: Object): Param[] => {
  return Object.entries(params).map(([key, value]) => {
    return { type: "text", parameter_name: key, text: value };
  });
};
