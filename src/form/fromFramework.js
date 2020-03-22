export const createControl = (config, validation) => {
    return {
        ...config,
        validation, //если сдесь true, valid: false
        valid: !validation,
        touched: false,
        value: ''
    }
};

export const valid = (value,  validation = null) => {
    if(!validation){
        return true
    }

    let isValid = true;

    if(validation.required){
        isValid = value.trim() !== '' &&  isValid;
    }

    return isValid;
};


export const validForm = (formControls) => {
    let isValidForm = true;
    Object.keys(formControls).forEach(controlName => {
        isValidForm = formControls[controlName].valid && isValidForm
    });
    return isValidForm;
}