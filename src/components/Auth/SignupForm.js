import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "./AuthContext";

const signUpForm = () => {
  const { registerUser, error, clearError } = useAuth();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .min(8, "Must be at least 8 characters")
          .required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        clearError();
        await registerUser(values.email, values.password);
        setSubmitting(false);
      }}
    >
      {({ handleSubmit, handleChange, values, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email}
            />
            {errors.email && <div>{errors.email}</div>}
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password}
            />
            {errors.password && <div>{errors.password}</div>}
          </div>
          <button type="submit" disabled={isSubmitting}>
            Sign Up
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      )}
    </Formik>
  );
};

export default signUpForm;
