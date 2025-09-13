// src/pages/Login.tsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Login.module.scss";
import { useAuth } from "../hooks/useAuth";

type FormInputs = { email: string; password: string };

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email required"),
  password: yup.string().required("Password required"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { register, handleSubmit, setError, formState } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormInputs) => {
    try {
      await auth.login(data.email, data.password);
      navigate("/dashboard");
    } catch (err: any) {
      // set inline error on password
      setError("password", { type: "manual", message: "Invalid email or password" });
    }
  };

  return (
    <div className={styles.page} style={{ paddingTop: "150px", paddingBottom: "100px" }}>
      <header className={styles.header}>
        <img src="/public/logo.svg" alt="CoStock Solution" className={styles.logo} />
      </header>

      <main className={styles.main}>
        <div className={styles.cardWrap}>
          <form className={styles.formInner} onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Email ID:</label>
              <input type="email" {...register("email")} className={styles.fieldInput} placeholder="you@company.com" />
            </div>
            {formState.errors.email && <p className="text-danger small mt-1">{formState.errors.email.message}</p>}

            <div className={styles.field}>
              <label className={styles.fieldLabel}>Password:</label>
              <input type="password" {...register("password")} className={styles.fieldInput} placeholder="Your password" />
            </div>
            {formState.errors.password && <p className="text-danger small mt-1">{formState.errors.password.message}</p>}

            <div className={styles.cta}>
              <button type="submit" className={styles.signInBtn} disabled={auth.loading}>
                {auth.loading ? "Signing in..." : "Sign In"}
              </button>
              <div className={styles.signupLink}>
                <em>New User? <Link to="/signup" style={{ color: "inherit", textDecoration: "underline" }}>Sign Up Here</Link></em>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
