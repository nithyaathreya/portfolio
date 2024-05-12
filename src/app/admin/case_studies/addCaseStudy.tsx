import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import { GenericObject, getObjectFromFormData } from '@/app/interfaces/common';
import { axiosl } from '@/app/store/axios';
import React from 'react';
import "./index.css";

interface Props {
  mode: "add" | "edit";
}
const AddCaseStudyForm = (props: Props) => {
  const formSchema = [
    {
      name: "title",
      label: "Title",
    },
    {
      name: "description",
      label: "Description",
    },
    {
      name: "slug",
      label: "Slug",
    },
    {
      name: "body",
      label: "Body (HTML)",
    },
  ]
  const onClickHandler = (formData: FormData) => {
    const body = getObjectFromFormData(formSchema, formData)
    console.log(body)
		axiosl
			.post("case_studies", body)
			.then((res) => {
				console.log("added");
			})
			.catch((err) => {
				console.log(err);
			});
	};

  return (
    <React.Fragment>
      <p className='form-title'>Add case study</p>
      <form className="add-case-study-form" action={onClickHandler}>
        {
          formSchema.map(fs => (
            <div className="field" key={"field-"+fs.name}>
              <label htmlFor={fs.name}>{fs.label}</label>
              <Input key={fs.name} placeholder={fs.label} name={fs.name} textarea={fs.name === "body"} />
            </div>
          ))
        }
        <Button value="Submit" />
      </form>
    </React.Fragment>
  )
};

export default AddCaseStudyForm;
