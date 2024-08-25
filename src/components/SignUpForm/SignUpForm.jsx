import styles from './SignUpForm.module.css';
import { useStore } from "../../hooks/useStore";
import { useRef } from 'react';
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
			password: yup.string().required("Это обязательное поле").test({
				name: "password",
				skipAbsent: true,
				test(value, ctx) {
					if (value.length < 8) {
						return ctx.createError({ message: 'Пароль должен содержать минимум 8 символов' })
					} else { return true }
				}
			}),
			repeatPassword: yup.string().test({
				name: "repeatPassword",
				skipAbsent: true,
				test(value, ctx) {
					if (value === data["password"]) {
						return true
					} else {
						return ctx.createError({ message: "Пароли не совпадают" })
					}
				}
			}),
		})

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(Schema)
	})

	const handleChange = ({ target }) => {
		updateState(target.name, target.value)
	}

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

			<button ref={buttonRef} type="submit" onClick={handleSubmit(onSubmit)} className={styles.SubmitBtn}>Зарегистрироваться</button>
		</form>
	);
};
