import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import TextInput from '../../components/common/ui/form/TextInput';
import Button from '../../components/common/ui/Button';
import { checkServerIsReady, doLogin, resetFormLogin } from '../../redux/slices/loginSlice';
import { FAILED, SUCCEEDED } from '../../constant';
import { toast } from 'react-toastify';
import { resetFormRegister } from '../../redux/slices/registerSlice';

function Login() {
  const { register, handleSubmit, errors: formErrors } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const formLoginStatus = useSelector((state) => state.login.formStatus);
  const serverIsReady = useSelector((state) => state.login.serverIsReady);

  function submit(authData) {
    dispatch(doLogin(authData));
  }
  useEffect(() => {
    if (formLoginStatus === SUCCEEDED) {
      history.push('/');
      dispatch(resetFormLogin());
    } else if (formLoginStatus === FAILED) {
    }
  }, [formLoginStatus]);

  useEffect(() => {
    dispatch(resetFormLogin());
    dispatch(checkServerIsReady());
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {
          serverIsReady &&
          (
            <>
              <div>
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    Or
                    <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
                      Register Here
                    </Link>
                  </p>
              </div>
              <form className="mt-8 space-y-6" action="#" method="POST">
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    { formLoginStatus === FAILED && <p className="text-red-600 p-3 bg-red-100 rounded mb-4">Wrong email or password</p>}
                  </div>
                  <div>
                    <TextInput
                      id="email"
                      name="email"
                      type="email"
                      label="Email"
                      required="true"
                      inputRef={register({ required: { value: true, message: 'Email is required' } })}
                      error={formErrors?.email}
                    />
                  </div>
                  <div>
                    <TextInput
                      id="password"
                      name="password"
                      type="password"
                      label="Password"
                      required="true"
                      inputRef={register({ required: { value: true, message: 'Password is required' } })}
                      error={formErrors?.password}
                    />
                  </div>
                </div>

                <div className="flex flex-row-reverse">
                  <button type="submit" onClick={handleSubmit(submit)}
                          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Sign in
                  </button>
                </div>
              </form>
            </>
          )
        }
        {
          serverIsReady === false &&
            <div className="flex flex-row justify-center items-center">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
            </div>
        }
      </div>
    </div>
  )
}

export default Login