import { headers } from "next/headers";

const jwt = require("jsonwebtoken");

export async function withAuth(request: Request, handler: Function) {
  const unauthorizedResponse = Response.json({message: "Resource unauthorized"}, {status: 401});
  const headersList = headers()
  const authorization = headersList.get('Authorization')?.split(' ')[1];
  if (!authorization) {
    return unauthorizedResponse;
  }

  try {
    const isAuthenticated = jwt.verify(authorization, process.env.JWT_SECRET);
    if (!isAuthenticated) {
      return unauthorizedResponse;
    }

    return handler(request);
  } catch (error) {
    return unauthorizedResponse;
  }
}