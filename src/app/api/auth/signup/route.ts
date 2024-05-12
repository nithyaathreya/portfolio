import { apiPost } from "../../database";
import { withAuth } from "../../middlewares/withAuth";

const bcrypt = require("bcrypt");

export async function POST(req: Request, res: Response) {
  return withAuth(req, async (request: Request) => {
    const body = await req.json();
    const { name, emailId, password } = body;
  
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    const query = `
      INSERT INTO users(name, emailId, password)
      VALUES(?, ?, ?)
    `;
    const values = [name, emailId, hashedPassword];
  
    let status, respBody;
    await apiPost(query, values)
      .then(() => {
        status = 200;
        respBody = { message: "Successfully created user" };
      })
      .catch((err) => {
        status = 400;
        respBody = err;
      });
    return Response.json(respBody, {
      status,
    });
  });
}
