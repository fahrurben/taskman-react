import React, { useEffect } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { fetchProjects, resetFormProject, fetchProject, deleteProject } from '../../redux/slices/projectSlice';
import * as tableStyles from '../../components/common/ui/table/styles';
import FilterSelect from '../../components/common/ui/filter/FilterSelect';
import FilterInput from '../../components/common/ui/filter/FilterInput';
import Button from '../../components/common/ui/Button';
import clsx from 'clsx';
import { sortTypeOptions, per_page, FAILED } from '../../constant';
import { toast } from 'react-toastify';
import { modal_position, page_title } from '../../components/common/ui/styles';
import Pagination from '../../components/common/ui/table/Pagination';
import { TASK_TYPES, STATUS_TYPES, PRIORITY_TYPES, SUCCEEDED } from '../../constant';
import { fetchInitial, fetchTasks, fetchTask, resetFormTask, deleteTask } from '../../redux/slices/taskSlice';
import FormProject from '../home/FormProject';
import FormTask from './FormTask';

const sortByOptions = [
  { id: 'name', name: 'Name' },
  { id: 'type', name: 'Type' },
  { id: 'priority', name: 'Priority' },
  { id: 'status', name: 'Status' },
];

const typeOptions = [
  { id: 0, name: 'Bug' },
  { id: 1, name: 'Feature' },
];

const priorityOptions = [
  { id: 0, name: 'Low' },
  { id: 1, name: 'Normal' },
  { id: 2, name: 'High' },
];

const statusOptions = [
  { id: 0, name: 'Back Log' },
  { id: 1, name: 'In Progress' },
  { id: 2, name: 'Done' },
];

Modal.setAppElement('#root');

function Tasks() {
  const { project_id } = useParams();
  const { register, getValues, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);
  const task = useSelector((state) => state.tasks.task);
  const project = useSelector((state) => state.tasks.project);
  const current_page = useSelector((state) => state.tasks.current_page);
  const total_page = useSelector((state) => state.tasks.total_page);

  const formTaskStatus = useSelector((state) => state.tasks.formStatus);
  const [selectedId,setSelectedId] = React.useState(null);
  const [modalNewIsOpen,setModalNewIsOpen] = React.useState(false);
  const [modalEditIsOpen,setModalEditIsOpen] = React.useState(false);
  const [modalDeleteIsOpen,setModalDeleteIsOpen] = React.useState(false);

  useEffect(() => {
    dispatch(fetchInitial(project_id));
  }, []);

  useEffect(() => {
    if (formTaskStatus === SUCCEEDED) {
      setModalNewIsOpen(false);
      setModalEditIsOpen(false);
      if (modalDeleteIsOpen === true) {
        setModalDeleteIsOpen(false);
        toast.success('Project deleted successfully');
      } else {
        toast.success("Project save successfully");
      }
      gotoPage(current_page);
      dispatch(resetFormTask());
    } else if (formTaskStatus === FAILED) {
      toast.error("Project save failed");
    }
  }, [formTaskStatus]);

  function gotoPage(page) {
    dispatch(fetchTasks(page, per_page, getValues()));
  }

  function onFormSearchSubmit(formData) {
    dispatch(fetchTasks(current_page, per_page, formData));
  }

  function editLinkClicked(id) {
    dispatch(fetchTask(id));
    setModalEditIsOpen(true);
  }

  function deleteLinkClicked(id) {
    setSelectedId(id);
    setModalDeleteIsOpen(true);
  }

  return (
    <>
      <div>
        <h2 className={page_title}>Tasks of '{project?.name}' project</h2>
      </div>

      <div className="flow-root">
        <div className="float-left">
          <div className="my-2 flex sm:flex-row flex-col">
            <FilterSelect id="sort_by" name="sort_by" placeholder="- Sort By -" options={sortByOptions} inputRef={register}
                          position="start"/>
            <FilterSelect id="sort_type" name="sort_type" placeholder="- Sort Type -" options={sortTypeOptions}
                          inputRef={register}/>
            <FilterInput name="name" id="name" placeholder="Name" inputRef={register}/>
            <FilterSelect id="type" name="type" placeholder="- Type -" options={typeOptions}
                          inputRef={register}/>
            <FilterSelect id="priority" name="priority" placeholder="- Priority -" options={priorityOptions}
                          inputRef={register}/>
            <FilterSelect id="status" name="status" placeholder="- Status -" options={statusOptions}
                          inputRef={register}/>
            <input type="hidden" id="project_id" name="project_id" value={project_id} ref={register} />
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
                  <th scope="col" className={tableStyles.th}>Description</th>
                  <th scope="col" className={tableStyles.th}>Type</th>
                  <th scope="col" className={tableStyles.th}>Priority</th>
                  <th scope="col" className={tableStyles.th}>Status</th>
                  <th scope="col" className={tableStyles.th_last}>
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
                </thead>
                <tbody className={tableStyles.tbody}>
                {
                  tasks &&
                  tasks.map((task) => {
                    return (
                      <tr key={task.id}>
                        <td className={tableStyles.td}>{task.name}</td>
                        <td className={tableStyles.td}>{task.description}</td>
                        <td className={tableStyles.td}>{TASK_TYPES?.[task.type]}</td>
                        <td className={tableStyles.td}>{PRIORITY_TYPES?.[task.priority]}</td>
                        <td className={tableStyles.td}>{STATUS_TYPES?.[task.status]}</td>
                        <td className={tableStyles.td_last}>
                          <a href="#" onClick={() => editLinkClicked(task.id)} className={tableStyles.op_link}>Edit</a>
                          &nbsp;|&nbsp;
                          <a href="#" onClick={() => deleteLinkClicked(task.id)} className={tableStyles.op_link}>Delete</a>
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
        contentLabel="New Task"
        style={modal_position}
        onRequestClose={() => setModalNewIsOpen(false)}
      >
        <FormTask
          title="New Task"
          project_id={project_id}
          type="create"
          closeDialog={() => setModalNewIsOpen(false)}
        >
        </FormTask>
      </Modal>

      <Modal
        isOpen={modalEditIsOpen}
        contentLabel="Edit Task"
        style={modal_position}
        onRequestClose={() => setModalEditIsOpen(false)}
      >
        <FormTask
          defaultValue={task}
          title="Edit Task"
          type="update"
          closeDialog={() => setModalEditIsOpen(false)}
        >
        </FormTask>
      </Modal>

      <Modal
        isOpen={modalDeleteIsOpen}
        contentLabel="Delete Task"
        style={modal_position}
        onRequestClose={() => setModalDeleteIsOpen(false)}
      >
        <div className="px-4 pt-4">
          <h3 className="text-xl text-gray-500 font-medium mb-4">Delete task</h3>
          <p>Are you sure to delete this task ?</p>
          <div className="flex flex-row justify-end mt-4">
            <div className="mr-2">
              <Button type="secondary"
                      onClick={() => setModalDeleteIsOpen(false)}
              >
                No
              </Button>
            </div>

            <Button
              onClick={() => dispatch(deleteTask(selectedId))}
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Tasks;
