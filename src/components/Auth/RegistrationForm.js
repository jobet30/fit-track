// src/components/RegistrationForm.js

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const RegistrationForm = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      dateOfBirth: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      gender: "",
      profilePicture: null,
      terms: false,
      newsletter: false,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .matches(/[A-Z]/, "Must contain an uppercase letter")
        .matches(/[a-z]/, "Must contain a lowercase letter")
        .matches(/[0-9]/, "Must contain a number")
        .matches(/[\W_]/, "Must contain a special character")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
      phoneNumber: Yup.string()
        .matches(
          /^\(\d{3}\) \d{3}-\d{4}$/,
          "Phone number must be in the format (XXX) XXX-XXXX",
        )
        .required("Required"),
      dateOfBirth: Yup.date()
        .max(new Date(), "Date of Birth cannot be in the future")
        .required("Required"),
      street: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      zipCode: Yup.string()
        .matches(/^\d{5}(-\d{4})?$/, "Must be a valid zip code")
        .required("Required"),
      gender: Yup.string().required("Required"),
      profilePicture: Yup.mixed()
        .required("A file is required")
        .test(
          "fileSize",
          "File too large",
          (value) => !value || (value && value.size <= 1048576),
        ), // 1MB limit
      terms: Yup.bool().oneOf(
        [true],
        "You must accept the terms and conditions",
      ),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          formData.append(key, values[key]);
        });

        const response = await fetch("/api/register", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert("Registration successful! Please log in.");
        } else {
          const errorData = await response.json();
          setErrors({ email: errorData.message });
        }
      } catch (error) {
        console.error("Error registering user:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Register</h2>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fullName}
        />
        {formik.touched.fullName && formik.errors.fullName ? (
          <div>{formik.errors.fullName}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div>{formik.errors.confirmPassword}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phoneNumber}
          placeholder="(XXX) XXX-XXXX"
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <div>{formik.errors.phoneNumber}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.dateOfBirth}
        />
        {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
          <div>{formik.errors.dateOfBirth}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="street">Street</label>
        <input
          id="street"
          name="street"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.street}
        />
        {formik.touched.street && formik.errors.street ? (
          <div>{formik.errors.street}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input
          id="city"
          name="city"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
        />
        {formik.touched.city && formik.errors.city ? (
          <div>{formik.errors.city}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="state">State</label>
        <input
          id="state"
          name="state"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.state}
        />
        {formik.touched.state && formik.errors.state ? (
          <div>{formik.errors.state}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="zipCode">Zip Code</label>
        <input
          id="zipCode"
          name="zipCode"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.zipCode}
        />
        {formik.touched.zipCode && formik.errors.zipCode ? (
          <div>{formik.errors.zipCode}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          name="gender"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.gender}
        >
          <option value="" label="Select gender" />
          <option value="male" label="Male" />
          <option value="female" label="Female" />
          <option value="other" label="Other" />
        </select>
        {formik.touched.gender && formik.errors.gender ? (
          <div>{formik.errors.gender}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="profilePicture">Profile Picture</label>
        <input
          id="profilePicture"
          name="profilePicture"
          type="file"
          onChange={(event) => {
            formik.setFieldValue(
              "profilePicture",
              event.currentTarget.files[0],
            );
          }}
        />
        {formik.touched.profilePicture && formik.errors.profilePicture ? (
          <div>{formik.errors.profilePicture}</div>
        ) : null}
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="terms"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.terms}
          />
          I accept the terms and conditions
        </label>
        {formik.touched.terms && formik.errors.terms ? (
          <div>{formik.errors.terms}</div>
        ) : null}
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="newsletter"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.newsletter}
          />
          Subscribe to our newsletter
        </label>
      </div>
      <div>
        <button type="submit" disabled={formik.isSubmitting}>
          Register
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
