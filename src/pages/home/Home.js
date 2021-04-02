import React, { useEffect } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchProjects } from '../../redux/slices/projectSlice';
import * as tableStyles from '../../components/common/ui/table/styles';
import FilterSelect from '../../components/common/ui/filter/FilterSelect';
import FilterInput from '../../components/common/ui/filter/FilterInput';
import Button from '../../components/common/ui/Button';
import clsx from 'clsx';
import { sortTypeOptions, per_page } from '../../constant';

const sortByOptions = [
  { id: 'name', name: 'Name' },
  { id: 'code', name: 'Code' },
];

function Home() {
  const { register, getValues, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const current_page = useSelector((state) => state.projects.current_page);
  const total_page = useSelector((state) => state.projects.total_page);
  const arrPages = _.range(total_page);

  useEffect(() => {
    dispatch(fetchProjects(1, per_page, { name: '', code: '' }));
  }, []);

  function gotoPage(page) {
    dispatch(fetchProjects(page, per_page, getValues()));
  }

  function onFormSearchSubmit(formData) {
    dispatch(fetchProjects(current_page, per_page, formData));
  }

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold leading-tight text-gray-600">Projects</h2>
      </div>

      <div className="flow-root">
        <div className="float-left">
          <div className="my-2 flex sm:flex-row flex-col">
            <FilterSelect id="sort_by" name="sort_by" placeholder="Sort By" options={sortByOptions} inputRef={register}
                          position="start"/>
            <FilterSelect id="sort_type" name="sort_type" placeholder="Sort Type" options={sortTypeOptions}
                          inputRef={register} position="start"/>
            <FilterInput name="name" id="name" placeholder="Name" inputRef={register}/>
            <FilterInput name="code" id="code" placeholder="Code" inputRef={register} position="end"/>
            <div className="pl-2">
              <Button onClick={handleSubmit(onFormSearchSubmit)}>
                <i className="lni lni-search-alt pr-2 pt-1"></i>
                Search
              </Button>
            </div>
          </div>
        </div>

        <div className="float-right">
          <div className="my-2">
            <Button onClick={() => {
            }}>
              <i className="lni lni-plus pr-2 pt-1"></i>
              New
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-col mt-4">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className={tableStyles.table}>
                <thead className={tableStyles.thead}>
                <tr>
                  <th scope="col" className={tableStyles.th}>Name</th>
                  <th scope="col" className={tableStyles.th}>Code</th>
                  <th scope="col" className={tableStyles.th}>Description</th>
                  <th scope="col" className={tableStyles.th_last}>
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
                </thead>
                <tbody className={tableStyles.tbody}>
                {
                  projects &&
                  projects.map((project) => {
                    return (
                      <tr key={project.id}>
                        <td className={tableStyles.td}>{project.name}</td>
                        <td className={tableStyles.td}>{project.code}</td>
                        <td className={tableStyles.td}>{project.description}</td>
                        <td className={tableStyles.td_last}>
                          <a href="#" className={tableStyles.op_link}>Edit</a>
                          &nbsp;|&nbsp;
                          <a href="#" className={tableStyles.op_link}>Delete</a>
                        </td>
                      </tr>
                    );
                  })
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Table End */}

      <div className="mt-4 flex flex-row justify-end">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          {
            current_page > 1 &&
            <a href="#" onClick={() => gotoPage(current_page - 1)}
               className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <i className="lni lni-chevron-left"></i>
            </a>
          }
          {
            arrPages.length > 1
            && arrPages.map((val) => {
              const pageNumber = val + 1;
              let pageStyles = ['relative', 'inline-flex', 'items-center', 'px-4', 'py-2', 'border', 'border-gray-300', 'bg-white', 'text-sm', 'font-medium', 'text-gray-700', 'hover:bg-gray-50'];
              if (pageNumber == current_page) pageStyles = _.concat(pageStyles, ['bg-gray-200']);
              pageStyles = clsx(pageStyles);
              return (
                <a href="#" onClick={() => gotoPage(pageNumber)}
                   className={pageStyles}>
                  {pageNumber}
                </a>
              )
            })
          }
          {
            current_page < total_page &&
            <a href="#" onClick={() => gotoPage(current_page + 1)}
               className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <i className="lni lni-chevron-right"></i>
            </a>
          }
        </nav>
      </div>
    </>
  )
}

export default Home