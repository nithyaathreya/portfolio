import { apiPost, apiGet } from "../database";
import { withAuth } from "../middlewares/withAuth";

export async function GET(req: Request, res: Response) {
	const query = `
    SELECT * from introduction
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
    const { name, imageUrl, email, phone, dob, location } = body;
    const query = `
      INSERT INTO introduction(name, imageUrl, email, phone, dob, location)
      VALUES(?, ?, ?, ?, ?, ?)
    `;
    const values = [name, imageUrl, email, phone, dob, location];
  
    let status, respBody;
    await apiPost(query, values)
      .then(() => {
        status = 200;
        respBody = { message: "Successfully created intro entry" };
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
    const { id, name, imageUrl, email, phone, dob, location } = body;
  
    const query = `
      UPDATE introduction SET name = ?, imageUrl = ?, email = ?, phone = ?, dob = ?, location = ? WHERE id = ?
    `;
    const values = [name, imageUrl, email, phone, dob, location, id];
  
    let status, respBody;
    await apiPost(query, values)
      .then(() => {
        status = 200;
        respBody = { message: "Successfully updated introduction entry" };
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
