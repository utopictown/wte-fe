import React, { useContext } from "react";

import { createColumnHelper } from "@tanstack/react-table";

import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Button } from "./shared/Button";
import Table from "./shared/Table";
import Layout from "./shared/Layout";
import ButtonContent from "./shared/ButtonContent";
import { Store } from "../store";
import actionType from "../store/action-type";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

function Claims() {
	const { state, dispatch } = useContext(Store.State);
	const columnHelper = createColumnHelper();

	const columns = [
		columnHelper.accessor("user", {
			cell: (info) => info.getValue(),
			header: () => <span>Name</span>,
		}),
		columnHelper.accessor("productName", {
			cell: (info) => <i>{info.getValue()}</i>,
			header: () => <span>Product Name</span>,
		}),
		columnHelper.accessor("description", {
			header: () => <span>Description</span>,
			cell: (info) => info.renderValue(),
		}),
		columnHelper.accessor("status", {
			header: () => <span>Status</span>,
			cell: (info) => info.renderValue(),
		}),
		columnHelper.accessor("id", {
			id: "action",
			header: "Action",
			cell: (info) => {
				return (
					<>
						{info.row.original.status === "pending" ? (
							<>
								<Button
									className={"bg-emerald-400 text-white hover:bg-emerald-500 mr-2"}
									onClick={() => dispatch({ type: actionType.APPROVE_CLAIMS, value: info.renderValue() })}
								>
									<ButtonContent icon={<CheckIcon width={16} height={16} />} />
								</Button>
								<Button
									className={"bg-red-400 text-white hover:bg-red-500"}
									onClick={() => dispatch({ type: actionType.REJECT_CLAIMS, value: info.renderValue() })}
								>
									<ButtonContent icon={<XMarkIcon width={16} height={16} />} />
								</Button>
							</>
						) : (
							<Button
								className={" bg-slate-400 text-white hover:bg-slate-500"}
								onClick={() => dispatch({ type: actionType.REVERT_CLAIMS, value: info.renderValue() })}
							>
								<ButtonContent icon={<ArrowUturnLeftIcon width={16} height={16} />} />
							</Button>
						)}
					</>
				);
			},
		}),
	];

	return <Layout title="Warranty Claims">{<Table data={state.claims} columns={columns} />}</Layout>;
}

export default Claims;
