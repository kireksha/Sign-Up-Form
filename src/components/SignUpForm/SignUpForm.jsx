import styles from './SignUpForm.module.css';
import { useStore } from "../../hooks/useStore";
import { useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

export const SignUpForm = () => {
	const { getState, updateState } = useStore();
	const data = getState();
	const buttonRef = useRef(null)

	const onSubmit = (data) => console.log(data)

	const Schema = yup
		.object({
			email: yup.string().email("Неверный формат").required("Это обязательное поле"),
			password: yup.string().required("Это обязательное поле").min('8', 'Минимум 8 символов'),
			repeatPassword: yup.string()
			.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
		})

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		resolver: yupResolver(Schema),
		mode: 'onTouched',
	})

	const handleChange = ({ target }) => {
		updateState(target.name, target.value)
	}

	useEffect(() => {
		if (isValid) {
			buttonRef.current.focus()
		}
	}, [isValid])

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
			<label className={styles.LabelContainer} htmlFor="email"></label>
			<h3 className={styles.LabelHeading}>Введите email</h3>
			<input {...register("email")} className={styles.InputContent} type="email" name="email" placeholder="developing.is@great.com" value={data['email']} onChange={handleChange} />
			{errors.email && <p className={styles.ErrorLabelHeading}>{errors.email?.message}</p>}

			<label className={styles.LabelContainer} htmlFor="password"></label>
			<h3 className={styles.LabelHeading}>Придумайте пароль</h3>
			<input {...register("password")} className={styles.InputContent} type="password" name="password" placeholder="8 symbols min, only Latin" value={data['password']} onChange={handleChange} />
			{errors.password && <p className={styles.ErrorLabelHeading}>{errors.password?.message}</p>}

			<label className={styles.LabelContainer} htmlFor="repeatPassword"></label>
			<h3 className={styles.LabelHeading}>Повторите пароль</h3>
			<input {...register("repeatPassword")} className={styles.InputContent} type="password" name="repeatPassword" placeholder="********" value={data['repeatPassword']} onChange={handleChange} />
			{errors.repeatPassword && <p className={styles.ErrorLabelHeading}>{errors.repeatPassword?.message}</p>}

			<button ref={buttonRef} type="submit" onClick={handleSubmit(onSubmit)} disabled={!isValid} className={styles.SubmitBtn}>Зарегистрироваться</button>
		</form>
	);
};
