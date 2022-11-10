import React from "react";
import actionType from "./store/action-type";

// Context
const State = React.createContext();

const initialState = {
	user: {
		username: "",
		password: "",
	},
	claims: [
		{
			id: 1,
			user: "Andy",
			productName: "Andor Tool Kits",
			description: "Missing 1 part",
			status: "pending",
		},
		{
			id: 2,
			user: "Fanny",
			productName: "Multifunction Hanger",
			description: "The edge bent",
			status: "pending",
		},
		{
			id: 3,
			user: "Ronald",
			productName: "ELectric Grill",
			description: "The switch is broken",
			status: "pending",
		},
		{
			id: 4,
			user: "Ellie",
			productName: "Andor Tool Kits",
			description: "Missing 1 part",
			status: "pending",
		},
		{
			id: 5,
			user: "Shanon",
			productName: "Multifunction Hanger",
			description: "The edge bent",
			status: "pending",
		},
		{
			id: 6,
			user: "Sammy",
			productName: "ELectric Grill",
			description: "The switch is broken",
			status: "pending",
		},
		{
			id: 7,
			user: "Tom",
			productName: "Andor Tool Kits",
			description: "Missing 1 part",
			status: "pending",
		},
		{
			id: 8,
			user: "Jeff",
			productName: "Multifunction Hanger",
			description: "The edge bent",
			status: "pending",
		},
		{
			id: 9,
			user: "Yolanda",
			productName: "ELectric Grill",
			description: "The switch is broken",
			status: "pending",
		},
		{
			id: 10,
			user: "Darren",
			productName: "Andor Tool Kits",
			description: "Missing 1 part",
			status: "pending",
		},
		{
			id: 11,
			user: "Bertrand",
			productName: "Andor Tool Kits",
			description: "Missing 1 part",
			status: "pending",
		},
		{
			id: 12,
			user: "Irisviel",
			productName: "Grand Juicer",
			description: "The knife is bent",
			status: "pending",
		},
	],
	products: [
		{
			id: 1,
			name: "Andor Tool Kits",
			description: "A cool tool kits",
		},
		{
			id: 2,
			name: "Multifunction Hanger",
			description: "easy to use hanger",
		},
		{
			id: 3,
			name: "ELectric Grill",
			description: "latest grill",
		},
		{
			id: 4,
			name: "Kolt Grand Juicer",
			description: "a very good juicer",
		},
		{
			id: 5,
			name: "Door Lock",
			description: "stainless steel door lock",
		},
		{
			id: 6,
			name: "Akasha water purifier",
			description: "water purifier with ph neutralizer",
		},
		{
			id: 7,
			name: "Wrench Star",
			description: "the most popular wrench",
		},
		{
			id: 8,
			name: "Swallow Sandals",
			description: "good sandal",
		},
		{
			id: 9,
			name: "Soldmoon Refrigerator",
			description: "2 door refrigerator",
		},
		{
			id: 10,
			name: "Manstar Pan",
			description: "non sticky frying pan",
		},
		{
			id: 11,
			name: "Samster Luggage",
			description: "2x3 luggage",
		},
		{
			id: 12,
			name: "Nachi double tape",
			description: "very sticky double tape",
		},
	],
};

// Reducer
const reducer = (state, action) => {
	switch (action.type) {
		case actionType.LOGIN:
			return {
				...state,
				user: action.value,
			};
		case actionType.ADD_PRODUCT:
			return {
				...state,
				products: [...state.products, { ...action.value, id: state.products[state.products.length - 1].id + 1 }],
			};
		case actionType.EDIT_PRODUCT:
			return {
				...state,
				products: state.products.map((product) => {
					if (product.id === action.value.id) {
						product = action.value;
					}
					return product;
				}),
			};
		case actionType.DELETE_PRODUCT:
			return {
				...state,
				products: state.products.filter((product) => product.id !== action.value),
			};
		case actionType.APPROVE_CLAIMS:
			return {
				...state,
				claims: state.claims.map((claim) => {
					if (claim.id === action.value) {
						claim.status = "approved";
					}
					return claim;
				}),
			};
		case actionType.REJECT_CLAIMS:
			return {
				...state,
				claims: state.claims.map((claim) => {
					if (claim.id === action.value) {
						claim.status = "rejected";
					}
					return claim;
				}),
			};
		case actionType.REVERT_CLAIMS:
			return {
				...state,
				claims: state.claims.map((claim) => {
					if (claim.id === action.value) {
						claim.status = "pending";
					}
					return claim;
				}),
			};
		default:
			return state;
	}
};

// Provider
const Provider = ({ children }) => {
	const [state, dispatch] = React.useReducer(reducer, initialState);

	return <State.Provider value={{ state, dispatch }}>{children}</State.Provider>;
};

// Export
export const Store = {
	State,
	Provider,
};
