"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import classes from "./login.module.css";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setLoading(false);
        setErrorMessage(result.error);
      } else {
        router.push("/shop");
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <main>
      <section className={classes.auth}>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={classes.actions}>
            {!isLoading && <button>Login</button>}
            {isLoading && <p>Sending request...</p>}
            {errorMessage && <h3 style={{ color: "red" }}>{errorMessage}</h3>}
          </div>
        </form>
      </section>
    </main>
  );
}
