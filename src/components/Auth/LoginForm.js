import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "./AuthContext";
import "../LoginForm.css";

const LoginForm = () => {
  const { loginUser, error, clearError, loading } = useAuth();

  return (
    <div className="form-container">
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
          await loginUser(values.email, values.password);
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, handleChange, values, errors, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                required
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                required
              />
              {errors.password && <div className="error">{errors.password}</div>}
            </div>
            <button type="submit" disabled={isSubmitting || loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <div className="error">{error}</div>}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
