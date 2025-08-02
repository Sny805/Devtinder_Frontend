import validator from "validator";

export const validateInputs = (data, isSignUp, setErrors) => {
    const { emailId, password, firstName, lastName } = data;

    const newErrors = {};

    if (!emailId) newErrors.emailId = 'Email is required';
    else if (!validator.isEmail(emailId)) newErrors.emailId = 'Invalid email address';

    if (!password) newErrors.password = 'Password is required';
    else if (!validator.isStrongPassword(password)) {
        newErrors.password = 'Password must include upper, lower, number, symbol (min 8 chars)';
    }

    if (isSignUp) {
        if (!firstName.trim()) newErrors.firstName = 'First name is required';
        if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
};