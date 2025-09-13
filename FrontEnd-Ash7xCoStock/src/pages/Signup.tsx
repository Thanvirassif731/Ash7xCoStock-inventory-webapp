// src/pages/Signup.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Login.module.scss";
import { useAuth } from "../hooks/useAuth";

type FormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object({
  name: yup.string().required("Name is required").min(2, "Too short"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Minimum 6 characters"),
  confirmPassword: yup.string().required("Confirm your password").oneOf([yup.ref("password")], "Passwords must match"),
});

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { register, handleSubmit, setError, formState } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormInputs) => {
    try {
      await auth.register(data.name, data.email, data.password);
      navigate("/dashboard");
    } catch (err: any) {
      setError("email", { type: "manual", message: err.message || "Registration failed" });
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header} style={{ paddingTop: ""}}>
        <img src="/public/logo.svg" alt="CoStock Solution" className={styles.logo} />
      </header>

      <main className={styles.main}>
        <div className={styles.cardWrap}>
          <form className={styles.formInner} onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Full Name:</label>
              <input type="text" placeholder="John Doe" {...register("name")} className={styles.fieldInput} />
            </div>
            {formState.errors.name && <p className="text-danger small mt-1">{formState.errors.name.message}</p>}

            <div className={styles.field}>
              <label className={styles.fieldLabel}>Email ID:</label>
              <input type="email" placeholder="you@company.com" {...register("email")} className={styles.fieldInput} />
            </div>
            {formState.errors.email && <p className="text-danger small mt-1">{formState.errors.email.message}</p>}

            <div className={styles.field}>
              <label className={styles.fieldLabel}>Password:</label>
              <input type="password" placeholder="Choose a password" {...register("password")} className={styles.fieldInput} />
            </div>
            {formState.errors.password && <p className="text-danger small mt-1">{formState.errors.password.message}</p>}

            <div className={styles.field}>
              <label className={styles.fieldLabel}>Confirm:</label>
              <input type="password" placeholder="Re-type password" {...register("confirmPassword")} className={styles.fieldInput} />
            </div>
            {formState.errors.confirmPassword && <p className="text-danger small mt-1">{formState.errors.confirmPassword.message}</p>}

            <div className={styles.cta}>
              <button type="submit" className={styles.signInBtn} disabled={auth.loading}>
                {auth.loading ? "Creating..." : "Create account"}
              </button>
              <div className={styles.signupLink}>
                <em>Already have an account? <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} style={{ color: "inherit", textDecoration: "underline" }}>Sign in</a></em>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Signup;
