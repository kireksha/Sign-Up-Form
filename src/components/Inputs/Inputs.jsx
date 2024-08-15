export const InputsLayout = ({ onSubmit, getState, updateState }) => {

	const { email, password, repeatPassword } = getState();
	const onChange = ({ target }) => updateState(target.name, target.value)

	return (
		<>
			<label htmlFor="email">
				Enter your email
				<input type="email" name="email" placeholder="developing.is@great.com" value={email} onChange={onChange} />
			</label>

			<label htmlFor="password">
				Create your password
				<input type="password" name="password" placeholder="8 symbols min, only Latin" value={password} onChange={onChange} />
			</label>

			<label htmlFor="repeatPassword">
				Repeat password
				<input type="repeatPassword" name="repeatPassword" placeholder="********" value={repeatPassword} onChange={onChange} />
			</label>
			<button type="submit" onClick={onSubmit}>Sign Up</button>
		</>
	);
};
