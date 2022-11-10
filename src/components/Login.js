import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../store";
import actionType from "../store/action-type";
import { Button } from "./shared/Button";
import ButtonContent from "./shared/ButtonContent";

function Login() {
	const [user, setUser] = useState({ username: "", password: "" });

	const { state, dispatch } = useContext(Store.State);

	const navigate = useNavigate();

	const handleOnChange = (e) => {
		e.preventDefault();
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();

		if (user.username === "admin" && user.password === "admin") {
			dispatch({ type: actionType.LOGIN, value: user });
			navigate("/");
		}
	};
	return (
		<form className="flex justify-center items-center h-screen flex-col space-y-8" onSubmit={handleOnSubmit}>
			<section className="flex flex-col space-y-2 w-80">
				<label htmlFor="username">username</label>
				<input
					placeholder="admin"
					onChange={handleOnChange}
					id="username"
					type="text"
					name="username"
					className="border-b-2 focus-visible:outline-none focus-within:border-slate-700 transition duration-150"
				/>
			</section>
			<section className="flex flex-col space-y-2 w-80">
				<label htmlFor="password">password</label>
				<input
					placeholder="admin"
					onChange={handleOnChange}
					id="password"
					type="password"
					name="password"
					className="border-b-2 focus-visible:outline-none focus-within:border-slate-700 transition duration-150"
				/>
			</section>
			<section className="flex flex-col space-y-2 w-80">
				<Button type="submit" className={"bg-indigo-500 text-white"}>
					<ButtonContent text={"Login"} />
				</Button>
			</section>
		</form>
	);
}

export default Login;
