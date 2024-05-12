"use client"
import { axiosl, shallowRouting } from '@/app/store/axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import DashboardNavigation from '../dashboard/navigation';
import { GenericObject, IntroductionContent, getObjectFromFormData } from '@/app/interfaces/common';
import Input from '@/app/components/Input';
import "./index.css";
import Button from '@/app/components/Button';

interface DashboardProps {};

const formSchema = [
  {
    name: "name",
    label: "Name",
  },
  {
    name: "imageUrl",
    label: "Banner",
  },
  {
    name: "email",
    label: "Email",
  },
  {
    name: "phone",
    label: "Phone number",
  },
  {
    name: "dob",
    label: "Date of birth",
  },
  {
    name: "location",
    label: "Location",
  },
]

const initialFormState: IntroductionContent = {
  id: NaN,
  name: "",
  email: "",
  phone: "",
  dob: "",
  imageUrl: "",
  location: "",
}

const Introduction = (props: DashboardProps) => {
  const router = useRouter();
  const [introContent, setIntroContent] = React.useState<IntroductionContent | undefined>(undefined);

  const [formData, setFormData] = React.useState(initialFormState)

  React.useEffect(() => {
    axiosl.get("introduction").then(res => {
      setIntroContent(res.data[0]);
      setFormData(res.data[0] || initialFormState);
    }).catch(err => {
      router.push("/admin/login", shallowRouting);
    })
  }, [])

  const onClickHandler = async (formData: FormData) => {
    const body = getObjectFromFormData(formSchema, formData)
    try {
      if (introContent && introContent.id) {
        body["id"] = introContent.id;
        await axiosl.patch("introduction", body);
      } else {
        await axiosl.post("introduction", body);
      }
      console.log("success")
    } catch (error) {
      console.log(error)
    }
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    const fd: GenericObject = {...formData}
    fd[name] = value;
    setFormData(fd as IntroductionContent);
  }

  return (
    <DashboardNavigation page="introduction">
      <div className="home-content">
        <form className="home-form" action={onClickHandler}>
          {
            formSchema.map(fs => (
              <React.Fragment key={"field="+fs.name}>
                <label htmlFor={fs.name}>{fs.label}</label>
                <Input name={fs.name} value={formData?.[fs.name as keyof IntroductionContent]} onChange={onInputChange} />
              </React.Fragment>
            ))
          }
          <Button value="Submit" />
        </form>
      </div>
    </DashboardNavigation>
  )
};

export default Introduction;
