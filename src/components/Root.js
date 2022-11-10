import React, { useContext } from "react";
import { Store } from "../store";
import Claims from "./Claims";
import Login from "./Login";

function Root() {
	const { state, dispatch } = useContext(Store.State);

	if (state.user.username === "admin" && state.user.password === "admin") {
		return <Claims />;
	} else {
		return <Login />;
	}
}

export default Root;
