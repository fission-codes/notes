import React from "react";
import { useAuth } from "../hooks";

const Login = () => {
  const { authorise } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-6 flex flex-auto flex-col items-center justify-center py-12 text-center">
        <h1>Notes</h1>
        <div className="max-w-xl mt-4 text-gray-300 dark:text-gray-400">
          Fission Notes is your web native note system
        </div>
        <div>
          <button onClick={authorise}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
