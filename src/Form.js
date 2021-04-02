import logo from './logo.svg';
import './css/App.css';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from './components/common/ui/Button';
import TextInput from './components/common/ui/form/TextInput';
import Select from './components/common/ui/form/Select';
import CheckBox from './components/common/ui/form/CheckBox';
import DateInput from './components/common/ui/form/DateInput';

function Form() {
  const { control, register, handleSubmit, errors: formErrors } = useForm();

  let cities = [
    {id: 1, name: 'New York'}
  ];

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
              </div>

              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <Select
                    id="city"
                    name="city"
                    label="City"
                    placeholder="- City -"
                    required="true"
                    options={cities}
                    inputRef={register({
                      validate: value => value !== '' || 'City is required'
                    })}
                    error={formErrors?.city}
                  />
                </div>
              </div>

              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <DateInput
                    name="dueDate"
                    label="Due Date"
                    control={control}
                    id="dueDate"
                    error={formErrors?.dueDate}
                    validationRules={{required: { value: true, message: 'Due Date is required'}}}
                  />
                </div>
              </div>

              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <CheckBox label="Active" inputRef={register()} id="isActive" name="isActive" />
                </div>
              </div>

              <div>
                <Button
                  onClick={handleSubmit((data) => { console.log(data) })}
                  className="uk-button uk-button-primary"
                >
                  Save
                </Button>
              </div>

            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Form;
