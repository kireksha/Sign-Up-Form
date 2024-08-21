import styles from './SignUpForm.module.css'
import { useStore } from "../../hooks/useStore"
import { useState, useRef, useEffect } from 'react';
import { InputsLayout } from '../Inputs/Inputs';

const sendFormData = (formData) => {
	console.log(formData);
};

export const SignUpForm = () => {

	const { getState, updateState } = useStore();

	const data = getState();
	const [errors, setErrors] = useState({})

	const [touched, setTouched] = useState({
		email: false,
		password: false,
		repeatPassword: false,
	})

	const isValid = Object.keys(errors).length === 0
	const buttonRef = useRef(null)

	const handleChange = ({ target }) => {
		updateState(target.name, target.value)

		if (!touched[target.name]) {
			setTouched((prevState) => ({ ...prevState, [target.name]: true }))
		}
	}

	const handleBlur = ({ target }) => {
		setTouched((prevState) => ({ ...prevState, [target.name]: true }))
	}

	useEffect(() => {
		if (isValid) {
			buttonRef.current.focus()
		}
	}, [isValid])

	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData(getState());
	};

	return (
		<form className={styles.Form}>
			<InputsLayout errors={errors} setErrors={setErrors} touched={touched} data={data} handleChange={handleChange} handleBlur={handleBlur} />
			<button ref={buttonRef} type="submit" onClick={onSubmit} className={styles.SubmitBtn} disabled={!isValid}>Зарегистрироваться</button>
		</form>
	);
};
