import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import { GenericObject, getObjectFromFormData } from '@/app/interfaces/common';
import { axiosl } from '@/app/store/axios';
import React from 'react';
import "./index.css";

interface Props {
  mode: "add" | "edit";
}
const AddExperienceForm = (props: Props) => {
  const formSchema = [
    {
      name: "name",
      label: "Name",
    },
    {
      name: "description",
      label: "Description",
    },
    {
      name: "imageUrl",
      label: "Image Url",
    },
    {
      name: "techStack",
      label: "Tech Stack Used",
    },
  ]
  const onClickHandler = (formData: FormData) => {
    const body = getObjectFromFormData(formSchema, formData)
    console.log(body)
		axiosl
			.post("projects", body)
			.then((res) => {
				console.log("added");
			})
			.catch((err) => {
				console.log(err);
			});
	};

  return (
    <React.Fragment>
      <p className='form-title'>Add Experience</p>
      <form className="add-experience-form" action={onClickHandler}>
        {
          formSchema.map(fs => (
            <div key={"field"+fs.name} className="field">
              <label htmlFor={fs.name}>{fs.label}</label>
              <Input key={fs.name} placeholder={fs.label} name={fs.name} />
            </div>
          ))
        }
        <Button value="Submit" />
      </form>
    </React.Fragment>
  )
};

export default AddExperienceForm;
