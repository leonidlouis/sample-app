import prisma from "@/lib/prisma";

export async function GET() {
  const todos = await prisma.todo.findMany({});

  return Response.json({ todos });
}

export async function POST(request) {
  const requestBody = await request.json();

  const todo = await prisma.todo.create({
    data: {
      ...requestBody,
    },
  });

  return Response.json({ todo });
}
