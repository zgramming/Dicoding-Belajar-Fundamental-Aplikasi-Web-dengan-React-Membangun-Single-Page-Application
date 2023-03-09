import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Container from "../components/Container";
import AuthContext from "../contexts/AuthContext";
import useInput from "../hooks/useInput";
import { baseAPIURL, localeData } from "../utils/constant";
import { MoonLoader } from "react-spinners";
import LocaleContext from "../contexts/LocaleContext";

const LoginPage = () => {
  const context = useContext(AuthContext);
  const localeContext = useContext(LocaleContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, onEmailHandler] = useInput("");
  const [password, onPasswordHandler] = useInput("");

  async function onSubmitHandler(event) {
    try {
      console.log({ context });
      event.preventDefault();
      setLoading(true);

      const { data: dataRequestLogin } = await axios.post(
        `${baseAPIURL}/login`,
        {
          email,
          password,
        }
      );

      const { data: dataResponse } = dataRequestLogin;
      const { accessToken } = dataResponse;

      const { data: dataRequestMe } = await axios.get(
        `${baseAPIURL}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const { data: dataResponseMe } = dataRequestMe;

      context.setAuthUser(dataResponseMe);
      context.setToken(accessToken);
      navigate(`/`);
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
        <h1 className="text-2xl font-bold text-center mb-5">Login</h1>
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">
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
          {loading ? (
            <div className="flex flex-row items-center justify-center">
              <MoonLoader color="#36d7b7" />
            </div>
          ) : (
            <button
              type="submit"
              class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
            >
              Login
            </button>
          )}
          <div>
            <span>{localeData[localeContext.locale].dont_have_account} </span>
            <Link className="font-bold underline" to={`/register`}>
              {localeData[localeContext.locale].register}
            </Link>
          </div>
        </form>
      </Card>
    </Container>
  );
};

export default LoginPage;
