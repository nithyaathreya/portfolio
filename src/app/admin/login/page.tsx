"use client";
import React, { useEffect } from "react";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { useRouter } from "next/navigation";
import { useAppStore, useTokenStore } from "@/app/store";
import "./index.css";
import { axiosl, shallowRouting } from "@/app/store/axios";

const Login = () => {
	const { setToken, token } = useTokenStore();
	const { setIsAuthenticated } = useAppStore();
	const router = useRouter();

	const onClickHandler = (formData: FormData) => {
		const body = {
			emailId: formData.get("emailId"),
			password: formData.get("password"),
		};
		axiosl
			.post("auth/login", body)
			.then((res) => {
				setToken(res.data.token);
				setIsAuthenticated(true);
				router.push("/admin/dashboard", shallowRouting);
			})
			.catch((err) => {
				console.log(err);
			});
	};

  useEffect(() => {
    if (token && typeof window != "undefined") {
      localStorage.setItem("token", token)
    }
  }, [token])

	return (
		<form action={onClickHandler}>
			<div className="login-form-continer">
				<Input placeholder="email" name="emailId" />
				<Input placeholder="password" type="password" name="password" />
				<Button value="Sign in" />
			</div>
		</form>
	);
};

export default Login;
