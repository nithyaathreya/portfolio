import { runMigratins } from "../migrations";

export async function GET(req: Request, res: Response) {
  runMigratins();
  return Response.json({message: "Successfully run migrations"}, {
    status: 200
  });
}
