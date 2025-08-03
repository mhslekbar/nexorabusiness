import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginApi } from "../redux/login/loginApiCalls";
import { useSelector } from "react-redux";
import { State } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ShowErrorMsg from "../HtmlComponents/ShowErrorMsg";
import { InputElement } from "../HtmlComponents/InputElement";

const Login: React.FC = () => {
  const { userData } = useSelector((state: State) => state.login);
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const submitLogin = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response: any = await dispatch(loginApi({ username, password }));
      if (response === true) {
        setErrors([]);
      } else {
        setErrors(response);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      setErrors([]);
      navigate("/", { replace: true });
    }
  }, [navigate, userData]);

  const { t } = useTranslation();

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <img
          className="w-full h-auto mb-4 rounded"
          src="/assets/nexora-images/fulllogo_transparent.png"
          alt="dentist-logo"
        />
        <form onSubmit={submitLogin} className="space-y-4">
          <InputElement
            name={t("Username")}
            placeholder={t("Username")}
            value={username}
            setValue={setUsername}
          />
          <InputElement
            type="password"
            name={t("Password")}
            placeholder={t("Password")}
            value={password}
            setValue={setPassword}
          />
          <button
            className={`w-full py-2 px-4 font-bold text-white rounded focus:outline-none transition-colors 
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            disabled={loading}
          >
            {t("Connecter")}
          </button>
          <p
            className="text-sm text-[#515151] text-center lowercase hover:text-[#000] cursor-pointer underline"
            onClick={() => navigate("/")}
          >
            retourner a la page d'acceuil
          </p>
          <ShowErrorMsg errors={errors} setErrors={setErrors} />
        </form>
      </div>
    </section>
  );
};

export default Login;
