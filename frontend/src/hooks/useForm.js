import { useState } from "react";

const useForm = (initailValues,initailErrors, validate) => {
  const [formData, setFormData] = useState(initailValues);
  const [errors, setErrors] = useState(initailErrors);

  const handleOnChange = (e) => {
    const { name, value =null } = e.target;
    setFormData({ ...formData, [name]: value });

    if (validate) {
      setErrors({
        ...errors,
        [name]: validate[name] ? validate[name](value) : null,
      });
    }
  };

  const resetForm = () => {
    setFormData(initailValues);
    setErrors({});
  };

  return { formData, errors, handleOnChange, resetForm };
};
export default useForm;
