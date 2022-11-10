import React, { useContext } from "react";

import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "./shared/Button";
import Layout from "./shared/Layout";
import Table from "./shared/Table";
import ButtonContent from "./shared/ButtonContent";
import { PencilIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { Store } from "../store";
import actionType from "../store/action-type";

function Products() {
	const navigate = useNavigate();
	const { state, dispatch } = useContext(Store.State);

	const columnHelper = createColumnHelper();

	const columns = [
		columnHelper.accessor("name", {
			cell: (info) => <i>{info.getValue()}</i>,
			header: () => <span>Product Name</span>,
		}),
		columnHelper.accessor("description", {
			header: () => <span>Description</span>,
			cell: (info) => info.renderValue(),
		}),
		columnHelper.accessor("id", {
			id: "action",
			header: "Action",
			cell: (info) => (
				<>
					<Button
						className={"bg-yellow-400 text-white hover:bg-yellow-500 mr-2"}
						onClick={() => navigate(`/products/edit/${info.renderValue()}`)}
					>
						<ButtonContent icon={<PencilIcon width={16} height={16} />} />
					</Button>
					<Button
						className={"bg-red-400 text-white hover:bg-red-500"}
						onClick={() => dispatch({ type: actionType.DELETE_PRODUCT, value: info.renderValue() })}
					>
						<ButtonContent icon={<TrashIcon width={16} height={16} />} />
					</Button>
				</>
			),
		}),
	];

	return (
		<Layout title="Products" linkTo={"/products"}>
			<Button
				className={"bg-blue-400 text-white hover:bg-blue-500 mb-4 flex items-center"}
				onClick={() => navigate("/products/create")}
			>
				<ButtonContent icon={<PencilSquareIcon width={16} height={16} />} text="Create" />
			</Button>
			<Table data={state.products} columns={columns} />
		</Layout>
	);
}

export default Products;
