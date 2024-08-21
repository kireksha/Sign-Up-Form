
const validateRules = {
	required: (value) => Boolean(value.trim),
	isEmail: (value, params) => {
		return params.test(value)
	},
	minLength: (value) => {
		return value.length >= 8
	},
	sameWithPassword: (value, params) => {
		return value === params
	},
}

export const validate = (data, config) => {
	const errors = {}
	for (const value in data) {
		const rules = config[value]
		for (const rule in rules) {
			const { message, params } = rules[rule]
			const validator = validateRules[rule]
			const hasError = validator && !validator(data[value], params)

			if (hasError) {
				errors[value] = message
				break
			}
		}
	}
	return errors
}

