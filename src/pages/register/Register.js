import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import _ from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import TextInput from '../../components/common/ui/form/TextInput';
import Button from '../../components/common/ui/Button';
import { doRegister, resetFormRegister } from '../../redux/slices/registerSlice';
import { FAILED, SUCCEEDED } from '../../constant';

function Register() {
  const { register, getValues, handleSubmit, errors: formErrors } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const formLoginStatus = useSelector((state) => state.register.formStatus);
  const submitError = useSelector((state) => state.register.submitError);

  function submit(authData) {
    dispatch(doRegister(authData));
  }
  useEffect(() => {
    if (formLoginStatus === SUCCEEDED) {
      toast.success('Register successfull');
      _.delay(function() {
        dispatch(resetFormRegister());
        history.push('/login');
      }, 3000);
    } else if (formLoginStatus === FAILED) {
    }
  }, [formLoginStatus]);

  useEffect(() => {
    dispatch(resetFormRegister());
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
              Sign in Here, if already registered
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              { formLoginStatus === FAILED && <p className="text-red-600 p-3 bg-red-100 rounded mb-4">{ submitError }</p>}
            </div>
            <div>
              <TextInput
                id="first_name"
                name="first_name"
                type="first_name"
                label="First Name"
                required="true"
                inputRef={register({ required: { value: true, message: 'First Name is required' } })}
                error={formErrors?.first_name}
              />
            </div>
            <div>
              <TextInput
                id="last_name"
                name="last_name"
                type="last_name"
                label="Last Name"
                required="true"
                inputRef={register({ required: { value: true, message: 'Last Name is required' } })}
                error={formErrors?.last_name}
              />
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
            <div>
              <TextInput
                id="repassword"
                name="repassword"
                type="password"
                label="Password Confirmation"
                required="true"
                inputRef={register({
                  required: { value: true, message: 'Password confirmation is required' },
                  validate: (repassword) => repassword === getValues('password') || 'Password Confirmation must same with Password'
                })}
                error={formErrors?.repassword}
              />
            </div>
            <div>
              <TextInput
                id="company_name"
                name="company_name"
                type="company_name"
                label="Company Name"
                required="true"
                inputRef={register({ required: { value: true, message: 'Company Name is required' } })}
                error={formErrors?.company_name}
              />
            </div>
            <div>
              <TextInput
                id="sub_domain"
                name="sub_domain"
                type="sub_domain"
                label="Sub Domain"
                required="true"
                inputRef={register({ required: { value: true, message: 'Sub Domain is required' } })}
                error={formErrors?.sub_domain}
              />
            </div>
          </div>

          <div className="flex flex-row-reverse">
            <button type="submit" onClick={handleSubmit(submit)}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Register
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />

    </div>
  )
}

export default Register