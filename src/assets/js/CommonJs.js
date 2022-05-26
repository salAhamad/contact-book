const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const formValidation = (value) => {
const errors = {};
    if (!value.firstName) {
        errors.firstName = "First name is required";
    }
    if (!value.lastName) {
        errors.lastName = "Last name is required";
    }
    if (!value.gender) {
        errors.gender = "Gender must be selected";
    }
    if (!value.mobile) {
        errors.mobile = "Mobile number is required";
    }
    // else if (value.mobile.length <= 10) {
    //   errors.mobile = "Mobile number's length must be 10";
    // } else if (value.mobile.length >= 10) {
    //   errors.mobile = "Mobile number cannot be more than 10";
    // }
    if (!value.email) {
        errors.email = "Email address is required";
    } else if (!regex.test(value.email)) {
        errors.email = "This email is not a valid format";
    }
    return errors;
}

export function is_equals(a, b) {
    const dataA = Object.keys(a);
    for(let i of dataA) {
      if(a[i] !== b[i])
      return false
    }
    return true;
}
