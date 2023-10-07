export async function GET() {
  const res = await fetch("https://api.apis.guru/v2/list.json");
  const data = await res.json();

  return Response.json({ data });
}
