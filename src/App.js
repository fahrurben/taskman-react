import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from './components/common/ui/Button';
import TextInput from './components/common/ui/form/TextInput';

function App() {
  const { register, handleSubmit, errors: formErrors } = useForm();

  return (
    <div>
      <main className="px-14 py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight text-gray-600">Users</h2>
        </div>

        <form>
          <div className="bg-white shadow-md rounded mb-4 flex flex-col my-2">
            <div className="px-8 pt-6 pb-4">
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <TextInput
                    id="firstname"
                    name="firstname"
                    label="First Name"
                    required="true"
                    inputRef={register({ required: { value: true, message: 'First name is required' } })}
                    error={formErrors?.firstname}
                  />
                </div>
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <TextInput
                    id="lastname"
                    name="lastname"
                    label="Last Name"
                    required="true"
                    inputRef={register({ required: { value: true, message: 'Last name is required' } })}
                    error={formErrors?.lastname}
                  />
                </div>

                <div className="-mx-3 md:flex mb-6">
                </div>
              </div>
            </div>
            <div>
              <Button
                onClick={handleSubmit(() => {})}
                className="uk-button uk-button-primary"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default App;
