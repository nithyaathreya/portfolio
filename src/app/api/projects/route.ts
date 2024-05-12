import { apiPost, apiGet } from "../database";
import { withAuth } from "../middlewares/withAuth";

type Project = {
  id: string;
  name: string;
  description: string;
  techStack: string;
  imageUrl: string;
}

export async function GET(req: Request, res: Response) {
	const query = `
    SELECT * from projects
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
    const { name, description, imageUrl, techStack } = body;
  
    const query = `
      INSERT INTO projects(name, description, imageUrl, techStack)
      VALUES(?, ?, ?, ?)
    `;
    const values = [name, description, imageUrl, techStack];
  
    let status, respBody;
    await apiPost(query, values)
      .then(() => {
        status = 200;
        respBody = { message: "Successfully created project" };
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
