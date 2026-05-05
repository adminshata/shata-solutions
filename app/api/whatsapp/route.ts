export async function POST(req: Request) {
  const formData = await req.formData();

  const message = formData.get("Body");
  const phone = formData.get("From");

  console.log("Incoming WhatsApp:", message, phone);

  return new Response("OK", { status: 200 });
}