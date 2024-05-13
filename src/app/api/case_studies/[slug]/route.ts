import { CaseStudy } from "@/app/interfaces/common";
import { apiGet } from "../../database";

export async function generateStaticParams() {  
  const case_studies = await apiGet("SELECT * FROM case_studies", []);
  
  return (case_studies as CaseStudy[]).map((case_study: CaseStudy) => ({
    slug: case_study.slug,
  }))
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug

	const query = `
    SELECT * from case_studies WHERE slug = ?
  `;

	let status, body;
	try {
		await apiGet(query, [slug])
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
