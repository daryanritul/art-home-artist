import React, { useState } from "react";

import { connect } from "react-redux";
import { signIn } from "../action/auth";

const SignIn = ({ signIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    signIn({ email, password });
  };

  return (
    <div className="container">
      <div className="p-4 mt-4">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          className="form-control"
          type="email"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          className="form-control"
          type="password"
          name="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => handleSignIn()} className="btn btn-success mt-4">
          Sign In
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  signIn: (data) => signIn(data),
};

export default connect(null, mapDispatchToProps)(SignIn);
