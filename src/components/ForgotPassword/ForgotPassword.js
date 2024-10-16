import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "../ForgotPassword.css";

const ForgotPassword = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (email) => {
    setTimeout(() => {
      setMessage("A password reset link has been sent to your email.");
    }, 1000);
  };

  return (
    <div className="forgot-password-container">
      <h1>Forgot Password</h1>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values.email);
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, handleChange, values, errors, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                className={errors.email ? "input-error" : ""}
                required
              />
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </button>
            {message && <div className="success-message">{message}</div>}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
