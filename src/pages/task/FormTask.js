import React, { useEffect } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { saveProject, updateProject } from '../../redux/slices/projectSlice';
import TextInput from '../../components/common/ui/form/TextInput';
import Button from '../../components/common/ui/Button';
import TextArea from '../../components/common/ui/form/TextArea';
import Select from '../../components/common/ui/form/Select';
import { saveTask, updateTask } from '../../redux/slices/taskSlice';

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

function FormTask(props) {
  const { control, register, setValue, handleSubmit, errors: formErrors } = useForm();
  const dispatch = useDispatch();

  function formSubmit(data) {
    if (props.type === 'update') {
      dispatch(updateTask(props.defaultValue.id, data));
    } else {
      dispatch(saveTask(data));
    }
  }

  useEffect(() => {
    if (props.defaultValue !== null) {
      setValue('project_id', props.defaultValue.project_id);
      setValue('name', props.defaultValue.name);
      setValue('description', props.defaultValue.description);
      setValue('type', props.defaultValue.type);
      setValue('priority', props.defaultValue.priority);
      setValue('status', props.defaultValue.status);
    }
  }, [props.defaultValue]);

  return (
    <div className="px-4 pt-4">
      <h3 className="text-2xl text-gray-500 font-medium mb-4">{props.title}</h3>
      <form>
        <input type="hidden" name="project_id" value={props.project_id} ref={register()} />
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <TextInput
              id="name"
              name="name"
              label="Name"
              required="true"
              inputRef={register({ required: { value: true, message: 'Name is required' } })}
              error={formErrors?.name}
            />
          </div>
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <Select
              id="type"
              name="type"
              label="Type"
              placeholder="- Type -"
              inputRef={register({ required: { value: true, message: 'Type is required' } })}
              options={typeOptions}
              error={formErrors?.type}
            />
          </div>
        </div>

        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <Select
              id="priority"
              name="priority"
              label="Priority"
              placeholder="- Priority -"
              inputRef={register({ required: { value: true, message: 'Priority is required' } })}
              options={priorityOptions}
              error={formErrors?.priority}
            />
          </div>
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <Select
              id="status"
              name="status"
              label="Status"
              placeholder="- Status -"
              inputRef={register({ required: { value: true, message: 'Status is required' } })}
              options={statusOptions}
              error={formErrors?.status}
            />
          </div>
        </div>

        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3 mb-6 md:mb-0">
            <TextArea
              id="description"
              name="description"
              label="Description"
              required={true}
              inputRef={register({ required: { value: true, message: 'Description is required' } })}
              error={formErrors?.description}
            />
          </div>
        </div>

        <div className="flex flex-row justify-end">
          <div className="mr-2">
            <Button type="secondary"
                    onClick={() => props.closeDialog()}
            >
              Cancel
            </Button>
          </div>

          <Button
            onClick={handleSubmit(formSubmit)}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}

FormTask.defaultProps = {
  defaultValue: null,
};

export default FormTask