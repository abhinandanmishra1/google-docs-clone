import { Google } from "@mui/icons-material";
import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

export const Signin = () => {
  const user = useUserContext();

  if (user) {
    return <Navigate to={"/"} />;
  }

  const google = () => {
    console.log("google", import.meta.env.VITE_DOCS_SERVER_BASE_URL);
    window.open(
      `${import.meta.env.VITE_DOCS_SERVER_BASE_URL}/auth/google`,
      "_self"
    );
  };

  return (
    <section className="h-screen">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>

          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <button
              className="mb-3 flex w-full gap-4 items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] bg-[#3b71ca]"
              href="#!"
              role="button"
              data-te-ripple-init
              data-te-ripple-color="light"
              onClick={google}
            >
              <Google />
              Signin with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
