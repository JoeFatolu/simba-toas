import React from "react";
import styled from "styled-components";
import * as yup from "yup";
import { useFormik } from "formik";
import Helmet from "react-helmet";
import { toast } from "react-toastify";
import { Route, Routes, Navigate } from "react-router-dom";
import { Input, Button, LinkStyled as Link } from "./components/lib";
import { useAuth } from "./context/auth-context";
import { useAsync } from "./utils/hooks";

const UnauthenticatedAppStyled = styled.section`
  display: flex;
  width: 100%;
  form {
    h1 {
      font-size: 25px;
      line-height: 1.5em;
      color: #425466;

      & + p {
        font-size: 20px;
        color: #425466;

        line-height: 1.5em;
        margin-bottom: 20px;
      }
    }
  }
  & > section {
    width: 50%;

    &:first-child {
      display: none;
      background: #11426b;
    }

    &:nth-child(2) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
    @media (min-width: 1000px) {
      &:first-child {
        display: block;
      }
      &:nth-child(2) {
        width: 50%;
      }
    }
  }
`;

const loginValidationSchema = yup.object({
  email: yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
  password: yup.string("Enter your password").min(6, "Password should be of minimum 6 characters length").required("Password is required"),
});

const registerValidationSchema = yup.object({
  email: yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
  password: yup.string("Enter your password").min(6, "Password should be of minimum 6 characters length").required("Password is required"),
});

const Login = () => {
  const { isLoading, run } = useAsync();
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      run(login(values)).catch((error) => {
        toast.error(error.message);
      });
    },
  });

  return (
    <section className="login">
      <Helmet>
        <title>Login - Toas</title>
      </Helmet>

      <form onSubmit={formik.handleSubmit}>
        <h1>Welocome back to Toas</h1>
        <p>Login to your account</p>
        <Input label="Email" id="email" name="email" type="email" autoComplete="email" placeholder="Enter your Email" onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} />
        <Input label="Password" id="password" name="password" type="password" autoComplete="current-password" placeholder="Enter your Password" onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password} />
        <Button type="submit">{isLoading ? "Loading..." : "Login"}</Button>
      </form>
      <nav>
        <div>
          <Link
            to={{
              pathname: "/register",
              state: { focus: true },
            }}
          >
            Don’t have an account? <span className="text">Sign up</span>
          </Link>
        </div>
      </nav>
    </section>
  );
};

const Register = () => {
  const { isLoading, run } = useAsync();
  const { register } = useAuth();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      run(register(values)).catch((error) => {
        toast.error(error.message);
      });
    },
  });
  return (
    <section className="register">
      <Helmet>
        <title>Register - Toas</title>
      </Helmet>
      <form onSubmit={formik.handleSubmit}>
        <Input label="First Name" id="firstName" name="firstName" autoComplete="given-name" placeholder="Enter your First Name" onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <Input label="Last Name" id="firstName" name="lastName" placeholder="Enter your Last Name" autoComplete="last-name" onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <Input label="Email" id="email" name="email" type="email" autoComplete="email" placeholder="Enter your Email" onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <Input label="Password" id="password" name="password" type="password" autoComplete="new-password" placeholder="Enter your Password" onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <Button type="submit">{isLoading ? "Loading..." : "Register"}</Button>
      </form>
      <Link
        to={{
          pathname: "/login",
          state: { focus: true },
        }}
      >
        Already have an account? <span className="text"> Login</span>
      </Link>
    </section>
  );
};

export default function Unauthenticated() {
  return (
    <UnauthenticatedAppStyled>
      <section></section>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </UnauthenticatedAppStyled>
  );
}
