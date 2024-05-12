import { apiPost, apiGet } from "../database";
import { withAuth } from "../middlewares/withAuth";

export async function GET(req: Request, res: Response) {
	const query = `
    SELECT * from case_studies
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
    const pbody = await req.json();
    const { title, description, body, slug } = pbody;
  
    const query = `
      INSERT INTO case_studies(title, description, body, slug)
      VALUES(?, ?, ?, ?)
    `;
    const values = [title, description, body, slug];
  
    let status, respBody;
    await apiPost(query, values)
      .then(() => {
        status = 200;
        respBody = { message: "Successfully created case study" };
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
    const pbody = await req.json();
    const { id, title, description, body, slug } = pbody;
  
    const query = `
      UPDATE case_studies SET title = ?, description = ?, body = ?, slug = ? WHERE id = ?
    `;
    const values = [title, description, body, slug, id];
  
    let status, respBody;
    await apiPost(query, values)
      .then(() => {
        status = 200;
        respBody = { message: "Successfully updated case study entry" };
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
