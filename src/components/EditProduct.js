import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "./shared/Layout";
import { Store } from "../store";
import actionType from "../store/action-type";
import ProductForm from "./shared/ProductForm";

function EditProduct() {
	const { id } = useParams();
	const { state, dispatch } = useContext(Store.State);
	const navigate = useNavigate();
	const defaultData = state.products.filter((product) => product.id === parseInt(id))[0];
	const [data] = useState(defaultData);
	const [errorData, setErrorData] = useState({ name: "", description: "" });

	const handleOnChange = (e) => {
		e.preventDefault();
		data[e.target.name] = e.target.value;
	};

	const onSubmit = async (e) => {
		try {
			e.preventDefault();

			await new Promise((res, rej) => {
				let _errorData = errorData;
				if (!data.name) {
					_errorData = { ..._errorData, name: "name cannot be empty" };
				} else {
					_errorData = { ..._errorData, name: "" };
				}

				if (!data.description) {
					_errorData = { ..._errorData, description: "description cannot be empty" };
				} else {
					_errorData = { ..._errorData, description: "" };
				}

				const filterErr = Object.keys(_errorData).filter((key) => _errorData[key] !== "");

				setErrorData(_errorData);

				if (filterErr.length > 0) rej(new Error("Bad request"));
				res(true);
			});

			await dispatch({ type: actionType.EDIT_PRODUCT, value: data });
			navigate("/products");
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<Layout title="Products" linkTo={"/products"}>
			<ProductForm onSubmit={onSubmit} handleOnChange={handleOnChange} errorData={errorData} data={data} />
		</Layout>
	);
}

export default EditProduct;
