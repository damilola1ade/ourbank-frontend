export const useFormValidation = () => {
  const emailValidation = {
    required: {
      value: true,
      message: "Email is required",
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
      message: "Invalid email address",
    },
  };

  const nameValidation = {
    required: {
      value: true,
      message: "First name is required",
    },
    minLength: {
      value: 3,
      message: "Provided value is too short",
    },
  };

  const signUpPasswordValidation = {
    required: {
      value: true,
      message: "Create your password",
    },
    minLength: {
      value: 8,
      message: "Password must contain 8 minimum characters",
    },
    pattern: {
      value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\dA-Za-z])(?=.{8,})/,
      message:
        "Password must include one uppercase, one numeric and one special character.",
    },
  };

  const authenticatePasswordValidation = {
    required: {
      value: true,
      message: "Your password please",
    },
    minLength: {
      value: 8,
      message: "Password must contain 8 minimum characters",
    },
    pattern: {
      value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\dA-Za-z])(?=.{8,})/,
      message:
        "Password must include one uppercase, one numeric and one special character.",
    },
  };

  const otherValidation = {
    required: {
      value: true,
      message: "Select a card provider",
    },
  };

  return {
    emailValidation,
    nameValidation,
    signUpPasswordValidation,
    otherValidation,
    authenticatePasswordValidation
  };
};
