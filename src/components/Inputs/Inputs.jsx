import styles from "./Inputs.module.css"
import { useEffect } from "react"
import { validate } from "../../utils/validate"

export const InputsLayout = ({ errors, setErrors, touched, data, handleChange, handleBlur }) => {

	const showError = (name) => {
		return touched[name] && errors[name]
	}

	useEffect(() => {
		const errors = validate(data, validateScheme)
		setErrors(errors)
	}, [data])

	const validateScheme = {
		email: {
			required: {
				message: "Обязательное поле",
			},
			isEmail: {
				message: "Некорректный email",
				params: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
			},
		},
		password: {
			minLength: {
				message: "Пароль содержит минимум 8 символов",
			},
		},
		repeatPassword: {
			sameWithPassword: {
				message: "Пароли не совпадают",
				params: data['password'],
			}
		},
	};

	return (
		<>
			<label className={styles.LabelContainer} htmlFor="email"></label>
			<h3 className={styles.LabelHeading}>Введите email</h3>
			<input className={styles.InputContent} type="email" name="email" placeholder="developing.is@great.com" value={data['email']} onChange={handleChange} onBlur={handleBlur} />
			{showError('email') && <p className={styles.ErrorLabelHeading}>{errors.email}</p>}


			<label className={styles.LabelContainer} htmlFor="password"></label>
			<h3 className={styles.LabelHeading}>Придумайте пароль</h3>
			<input className={styles.InputContent} type="password" name="password" placeholder="8 symbols min, only Latin" value={data['password']} onChange={handleChange} onBlur={handleBlur} />
			{showError('password') && <p className={styles.ErrorLabelHeading}>{errors.password}</p>}


			<label className={styles.LabelContainer} htmlFor="repeatPassword"></label>
			<h3 className={styles.LabelHeading}>Повторите пароль</h3>
			<input className={styles.InputContent} type="password" name="repeatPassword" placeholder="********" value={data['repeatPassword']} onChange={handleChange} onBlur={handleBlur} />
			{showError('repeatPassword') && <p className={styles.ErrorLabelHeading}>{errors.repeatPassword}</p>}
		</>
	)
}
