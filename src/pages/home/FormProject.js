import React, { useEffect } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { saveProject } from '../../redux/slices/projectSlice';
import TextInput from '../../components/common/ui/form/TextInput';
import Button from '../../components/common/ui/Button';
import TextArea from '../../components/common/ui/form/TextArea';

function FormProject(props) {
  const { control, register, handleSubmit, errors: formErrors } = useForm();
  const dispatch = useDispatch();

  function formSubmit(data) {
    dispatch(saveProject(data));
  }

  return (
    <div className="px-4 pt-4">
      <h3 className="text-2xl text-gray-500 font-medium mb-4">{props.title}</h3>
      <form>
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
          <TextInput
            id="code"
            name="code"
            label="Code"
            required="true"
            inputRef={register({ required: { value: true, message: 'Code is required' } })}
            error={formErrors?.code}
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

export default FormProject