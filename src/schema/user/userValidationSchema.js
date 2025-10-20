import * as Yup from "yup";

const userValidationSchema = Yup.object({
  first_name: Yup.string()
    .trim()
    .required("First name is required")
    .matches(
      /^[A-Za-z](?:[A-Za-z\s'-]*[A-Za-z])?$/,
      "Only letters (A–Z), spaces, hyphens (-), and apostrophes (') allowed, and must start and end with a letter"
    ),
});

export default userValidationSchema;
