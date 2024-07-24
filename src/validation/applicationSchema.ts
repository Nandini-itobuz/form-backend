import * as yup from "yup";

const applicationYupSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Please enter first name")
    .min(4, { message: "Min 4 letters required" }),
  middleName: yup.string().optional(),
  lastName: yup
    .string()
    .required("Please enter last name")
    .min(4, { message: "Min 4 letters required" }),
  age: yup
    .number()
    .required("Please enter age")
    .typeError("Please enter age")
    .min(18, "You are not eligible.")
    .max(100, 'You are too old for the post'),
  email: yup.string().required("Please enter email id").email(),
  phone: yup
    .string()
    .required("Please enter phone number")
    .matches(/^[6-9]\d{9}$/, "Please enter a valid phone number"),
  position: yup.string().required("Please enter position field"),
  institution: yup.string().required("Please enter your institution"),
  degree: yup.string().required("Please enter your degree"),
  startDate: yup.string().optional(),
  score: yup
    .number()
    .required("Please enter your score")
    .typeError("Please enter your score")
    .max(100, 'Max score can be 100'),
  yearsOfExperience: yup
    .number()
    .required("Please enter your experience in years")
    .typeError("Please enter your experience in years")
    .min(2, "Minimum of 2/y experience"),
  status: yup.boolean(),
});

export default applicationYupSchema;
