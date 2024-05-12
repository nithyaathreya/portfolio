import { apiPost, apiGet } from "../database";
import { withAuth } from "../middlewares/withAuth";

export async function GET(req: Request, res: Response) {
	const query = `
    SELECT * from home
  `;

	let status, body;
	try {
		await apiGet(query, [])
			.then((res) => {
				status = 200;
				body = res;
			})
			.catch((err: Error) => {
				status = 400;
				body = { error: err };
			});
		return Response.json(body, {
			status,
		});
	} catch (error: any) {
		console.error(error.message);
		return Response.json(
			{ error: error },
			{
				status: 400,
			}
		);
	}
}

export async function POST(req: Request, res: Response) {
  return withAuth(req, async (request: Request) => {
    const body = await req.json();
    const { greeting, imageUrl, quote, about } = body;
  
    const query = `
      INSERT INTO home(greeting, imageUrl, quote, about)
      VALUES(?, ?, ?, ?)
    `;
    const values = [greeting, imageUrl, quote, about];
  
    let status, respBody;
    await apiPost(query, values)
      .then(() => {
        status = 200;
        respBody = { message: "Successfully created home entry" };
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

export async function PATCH(req: Request, res: Response) {
  return withAuth(req, async (request: Request) => {
    const body = await req.json();
    const { id, greeting, imageUrl, quote, about } = body;
  
    const query = `
      UPDATE home SET greeting = ?, imageUrl = ?, quote = ?, about = ? WHERE id = ?
    `;
    const values = [greeting, imageUrl, quote, about, id];
  
    let status, respBody;
    await apiPost(query, values)
      .then(() => {
        status = 200;
        respBody = { message: "Successfully updated home entry" };
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
