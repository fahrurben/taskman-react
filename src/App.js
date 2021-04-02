import logo from './logo.svg';
import './css/App.css';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as tableStyles from './components/common/ui/table/styles';
import Button from './components/common/ui/Button';
import FilterInput from './components/common/ui/filter/FilterInput';
import FilterSelect from './components/common/ui/filter/FilterSelect';

function App() {
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

        <div className="my-2 flex sm:flex-row flex-col">
          <FilterSelect id="city" name="city" options={cities} inputRef={register} placeholder="City" position="start" />
          <FilterInput name="name" inputRef={register} id="name" placeholder="Name" />
          <FilterInput name="name" inputRef={register} id="name" placeholder="Name" position="end" />
          <div className="pl-2">
            <Button onClick={() => {}}>
              <svg viewBox="0 0 24 24" className="h-4 w-4 mr-1 fill-current text-white">
                <path
                  d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                </path>
              </svg>
              Search
            </Button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded mb-4 flex flex-col my-2">
          <div className="px-8 pt-6 pb-4">

            {/* Table */}
            <div className="flex flex-col mt-4">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className={tableStyles.table}>
                      <thead className={tableStyles.thead}>
                        <tr>
                          <th scope="col" className={tableStyles.th}>Name</th>
                          <th scope="col" className={tableStyles.th}>Title</th>
                          <th scope="col" className={tableStyles.th}>Status</th>
                          <th scope="col" className={tableStyles.th}>Role</th>
                          <th scope="col" className={tableStyles.th_last}>
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className={tableStyles.tbody}>
                        <tr>
                          <td className={tableStyles.td}>Admin</td>
                          <td className={tableStyles.td}>Admin</td>
                          <td className={tableStyles.td}>Admin</td>
                          <td className={tableStyles.td}>Admin</td>
                          <td className={tableStyles.td_last}>
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                            &nbsp;|&nbsp;
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">Delete</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* Table End */}

          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
