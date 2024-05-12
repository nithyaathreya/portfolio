import { User } from "@/app/interfaces/user";
import { getUserByEmailId } from "../../users/route";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

export async function POST(req: Request, res: Response) {
	const body = await req.json();
	const { emailId, password } = body;

	let respBody, status;
	await getUserByEmailId(emailId)
		.then((res) => {
			const user = res as User;
			if (user && bcrypt.compare(password, user?.password)) {
				const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
				respBody = { token };
				status = 200;
			} else {
				respBody = { message: "Check email and password" };
				status = 401;
			}
		})
		.catch((err: Error) => {
			respBody = { message: "Check email and password" };
			status = 401;
		});
	return Response.json(respBody, {
		status,
	});
}
