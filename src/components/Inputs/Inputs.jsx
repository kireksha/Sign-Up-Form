import { useState, useRef } from "react";
import styles from "./Inputs.module.css"

export const InputsLayout = ({ onSubmit, getState, updateState }) => {

	const { email, password, repeatPassword } = getState();
	const [emailError, setEmailError] = useState(null)
	const [passwordError, setPasswordError] = useState(null)
	const [repeatPasswordError, setRepeatPasswordError] = useState(null)

	const submitBtnRef = useRef(null)


	const onChange = ({ target }) => {
		updateState(target.name, target.value);

		let newError = null;
		if (target.name === 'email' && emailError !== null) {
			const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
			if (!validRegex.test(target.value)) {
				newError = "Введите корректный email";
			}
			setEmailError(newError)
		} else if (target.name === 'password') {
			if (!/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]/.test(target.value) || /[а-яА-Я]/.test(target.value)) {
				newError = "Допускаются только латинские буквы, цифры, а также специальные символы"
			} else if (repeatPassword.length > 0 && target.value !== repeatPassword) {
				setRepeatPasswordError('Пароли не совпадают')
			} else if (repeatPassword.length > 0 && target.value === repeatPassword) {
				setRepeatPasswordError(null)
			}
			setPasswordError(newError)
		} else if (target.name === 'repeatPassword') {
			if (target.value !== password) {
				newError = "Пароли не совпадают"
			} else if (target.value === password && !emailError && !passwordError) {
				console.log('should work')
				submitBtnRef.current.focus();
			}
			setRepeatPasswordError(newError)
		}
	}

	const onBlur = ({ target }) => {

		let newError = null;
		if (target.name === 'email') {
			const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
			if (!validRegex.test(target.value)) {
				newError = "Введите корректный email";
			} else if (target.value === '') {
				newError = "Поле обязательно для заполнения "
			}
			setEmailError(newError)
		} else if (target.name === 'password') {
			if (target.value.length < 8) {
				newError = "Допускается не менее 8 символов"
			}
			setPasswordError(newError)
		}
	}




	return (
		<>
			<label className={styles.LabelContainer} htmlFor="email">
				<h3 className={`${styles.LabelHeading} ${emailError && styles.ErrorLabelHeading}`}>{emailError ? emailError : 'Введите email'}</h3>
				<input className={styles.InputContent} type="email" name="email" placeholder="developing.is@great.com" value={email} onChange={onChange} onBlur={onBlur} />
			</label>

			<label className={styles.LabelContainer} htmlFor="password">
				<h3 className={`${styles.LabelHeading} ${passwordError && styles.ErrorLabelHeading}`}>{passwordError ? passwordError : 'Придумайте пароль'}</h3>
				<input className={styles.InputContent} type="password" name="password" placeholder="8 symbols min, only Latin" value={password} onChange={onChange} onBlur={onBlur} />
			</label>

			<label className={styles.LabelContainer} htmlFor="repeatPassword">
				<h3 className={`${styles.LabelHeading} ${repeatPasswordError && styles.ErrorLabelHeading}`}>{repeatPasswordError ? repeatPasswordError : 'Повторите пароль'}</h3>
				<input className={styles.InputContent} type="password" name="repeatPassword" placeholder="********" value={repeatPassword} onChange={onChange} onBlur={onBlur} />
			</label>
			<button ref={submitBtnRef} type="submit" onClick={onSubmit} className={styles.SubmitBtn} disabled={emailError !== null || passwordError !== null || repeatPasswordError !== null}>Зарегистрироваться</button>
		</>
	);
};
