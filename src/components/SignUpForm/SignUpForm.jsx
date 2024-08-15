import styles from './SignUpForm.module.css'
import { InputsLayout } from '../Inputs/Inputs';
import { useStore } from "../../hooks/useStore"

const sendFormData = (formData) => {
	console.log(formData);
};

export const SignUpForm = () => {

	const { getState, updateState } = useStore();

	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData(getState());
	};

	return (
		<form className={styles.Form}>
			<InputsLayout onSubmit={onSubmit} getState={getState} updateState={updateState} />
		</form>
	);
};
