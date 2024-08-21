import { useState } from "react";

export const useStore = () => {
	const initialState = {
		email: '',
		password: '',
		repeatPassword: '',
	}

	const [state, setState] = useState(initialState);

	return {
		getState: () => state,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue })
		},
	};
};
