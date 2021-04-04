import React, { useEffect } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { fetchProjects, resetFormProject, fetchProject, deleteProject } from '../../redux/slices/projectSlice';
import * as tableStyles from '../../components/common/ui/table/styles';
import FilterSelect from '../../components/common/ui/filter/FilterSelect';
import FilterInput from '../../components/common/ui/filter/FilterInput';
import Button from '../../components/common/ui/Button';
import clsx from 'clsx';
import { sortTypeOptions, per_page, FAILED } from '../../constant';
import FormProject from './FormProject';
import { toast } from 'react-toastify';
import { page_title, modal_position } from '../../components/common/ui/styles';
import Pagination from '../../components/common/ui/table/Pagination';
import { SUCCEEDED } from '../../constant';

const sortByOptions = [
  { id: 'name', name: 'Name' },
  { id: 'code', name: 'Code' },
];

Modal.setAppElement('#root');

function Home() {
  const { register, getValues, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const project = useSelector((state) => state.projects.project);
  const current_page = useSelector((state) => state.projects.current_page);
  const total_page = useSelector((state) => state.projects.total_page);

  const formProjectStatus = useSelector((state) => state.projects.formStatus);
  const [selectedId,setSelectedId] = React.useState(null);
  const [modalNewIsOpen,setModalNewIsOpen] = React.useState(false);
  const [modalEditIsOpen,setModalEditIsOpen] = React.useState(false);
  const [modalDeleteIsOpen,setModalDeleteIsOpen] = React.useState(false);

  useEffect(() => {
    dispatch(fetchProjects(1, per_page, { name: '', code: '' }));
  }, []);

  useEffect(() => {
    if (formProjectStatus === SUCCEEDED) {
      setModalNewIsOpen(false);
      setModalEditIsOpen(false);
      if (modalDeleteIsOpen === true) {
        setModalDeleteIsOpen(false);
        toast.success('Project deleted successfully');
      } else {
        toast.success("Project save successfully");
      }
      gotoPage(current_page);
      dispatch(resetFormProject());
    } else if (formProjectStatus === FAILED) {
      toast.error("Project save failed");
    }
  }, [formProjectStatus]);

  function gotoPage(page) {
    dispatch(fetchProjects(page, per_page, getValues()));
  }

  function onFormSearchSubmit(formData) {
    dispatch(fetchProjects(current_page, per_page, formData));
  }

  function editLinkClicked(id) {
    dispatch(fetchProject(id));
    setModalEditIsOpen(true);
  }

  function deleteLinkClicked(id) {
    setSelectedId(id);
    setModalDeleteIsOpen(true);
  }

  return (
    <>
      <div>
        <h2 className={page_title}>Projects</h2>
      </div>

      <div className="flow-root">
        <div className="float-left">
          <div className="my-2 flex sm:flex-row flex-col">
            <FilterSelect id="sort_by" name="sort_by" placeholder="- Sort By -" options={sortByOptions} inputRef={register}
                          position="start"/>
            <FilterSelect id="sort_type" name="sort_type" placeholder="- Sort Type -" options={sortTypeOptions}
                          inputRef={register}/>
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
            <Button onClick={() => setModalNewIsOpen(true)}>
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
                          <Link className={tableStyles.op_link} to={`tasks/${project.id}`}>Tasks</Link>
                          &nbsp;|&nbsp;
                          <a href="#" onClick={() => editLinkClicked(project.id)} className={tableStyles.op_link}>Edit</a>
                          &nbsp;|&nbsp;
                          <a href="#" onClick={() => deleteLinkClicked(project.id)} className={tableStyles.op_link}>Delete</a>
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

      <Pagination current_page={current_page} gotoPage={gotoPage} total_page={total_page}/>

      <Modal
        isOpen={modalNewIsOpen}
        contentLabel="New Project"
        style={modal_position}
        onRequestClose={() => setModalNewIsOpen(false)}
      >
        <FormProject
          title="New Project"
          type="create"
          closeDialog={() => setModalNewIsOpen(false)}
        >
        </FormProject>
      </Modal>

      <Modal
        isOpen={modalEditIsOpen}
        contentLabel="Edit Project"
        style={modal_position}
        onRequestClose={() => setModalEditIsOpen(false)}
      >
        <FormProject
          defaultValue={project}
          title="Edit Project"
          type="update"
          closeDialog={() => setModalEditIsOpen(false)}
        >
        </FormProject>
      </Modal>

      <Modal
        isOpen={modalDeleteIsOpen}
        contentLabel="Delete Project"
        style={modal_position}
        onRequestClose={() => setModalDeleteIsOpen(false)}
      >
        <div className="px-4 pt-4">
          <h3 className="text-xl text-gray-500 font-medium mb-4">Delete project</h3>
          <p>Are you sure to delete this project ?</p>
          <div className="flex flex-row justify-end mt-4">
            <div className="mr-2">
              <Button type="secondary"
                      onClick={() => setModalDeleteIsOpen(false)}
              >
                No
              </Button>
            </div>

            <Button
              onClick={() => dispatch(deleteProject(selectedId))}
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Home;