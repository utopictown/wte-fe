import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Products from "./components/Products";
import Error from "./components/Error";
import { Store } from "./store";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";
import Login from "./components/Login";
import Root from "./components/Root";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <Error />,
	},
	{
		path: "/login",
		element: <Login />,
		errorElement: <Error />,
	},
	{
		path: "/products",
		element: <Products />,
		errorElement: <Error />,
	},
	{
		path: "/products/create",
		element: <CreateProduct />,
		errorElement: <Error />,
	},
	{
		path: "/products/edit/:id",
		element: <EditProduct />,
		errorElement: <Error />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Store.Provider>
		<RouterProvider router={router}></RouterProvider>
	</Store.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
