import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import Card from "../components/Card";
import Container from "../components/Container";
import LocaleContext from "../contexts/LocaleContext";
import useInput from "../hooks/useInput";
import { baseAPIURL, localeData } from "../utils/constant";

const RegisterPage = () => {
  const navigate = useNavigate();
  const localeContext = useContext(LocaleContext);
  const [loading, setLoading] = useState(false);

  const [name, onNameHandler] = useInput("");
  const [email, onEmailHandler] = useInput("");
  const [password, onPasswordHandler] = useInput("");
  const [confirmPassword, onConfirmPasswordHandler] = useInput("");

  async function onSubmitHandler(event) {
    try {
      event.preventDefault();
      setLoading(true);

      if (password !== confirmPassword) {
        alert("Password tidak sama");
        return;
      }

      const { data, status } = await axios.post(`${baseAPIURL}/register`, {
        name,
        email,
        password,
      });

      navigate(`/login`);
    } catch (error) {
      let message = error?.message;
      if (axios.isAxiosError(error)) {
        const { response } = error;
        message = response?.data?.message;
      }

      alert(message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Card className={`p-5`}>
        <h1 className="text-2xl font-bold text-center mb-5">
          {localeData[localeContext.locale].register}
        </h1>
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">
          <input
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
            placeholder="Nama"
            value={name}
            onChange={onNameHandler}
          />
          <input
            type="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
            placeholder="Email"
            value={email}
            onChange={onEmailHandler}
          />
          <input
            type="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
            placeholder="Password"
            value={password}
            onChange={onPasswordHandler}
          />
          <input
            type="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
            placeholder="Password Confirmation"
            value={confirmPassword}
            onChange={onConfirmPasswordHandler}
          />

          {loading ? (
            <div className="flex flex-row items-center justify-center">
              <MoonLoader color="#36d7b7" />
            </div>
          ) : (
            <button
              type="submit"
              class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
            >
              {localeData[localeContext.locale].register}
            </button>
          )}

          <div>
            <span>{localeData[localeContext.locale].have_account} </span>
            <Link className="font-bold underline" to={`/login`}>
              Login
            </Link>
          </div>
        </form>
      </Card>
    </Container>
  );
};

export default RegisterPage;
