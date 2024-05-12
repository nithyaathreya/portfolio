"use client"
import { axiosl, shallowRouting } from '@/app/store/axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import DashboardNavigation from '../dashboard/navigation';
import { GenericObject, HomeContent, getObjectFromFormData } from '@/app/interfaces/common';
import Input from '@/app/components/Input';
import "./index.css";
import Button from '@/app/components/Button';

interface DashboardProps {};

const formSchema = [
  {
    name: "greeting",
    label: "Greetings",
  },
  {
    name: "imageUrl",
    label: "Banner",
  },
  {
    name: "quote",
    label: "Block quote",
  },
  {
    name: "about",
    label: "About me",
  },
]

const initialFormState: HomeContent = {
  id: NaN,
  greeting: "",
  imageUrl: "",
  quote: "",
  about: "",
}

const Home = (props: DashboardProps) => {
  const router = useRouter();
  const [homeContent, setHomeContent] = React.useState<HomeContent | undefined>(undefined);

  const [formData, setFormData] = React.useState(initialFormState)

  React.useEffect(() => {
    axiosl.get("home").then(res => {
      setHomeContent(res.data[0]);
      setFormData(res.data[0] || initialFormState);
    }).catch(err => {
      router.push("/admin/login", shallowRouting);
    })
  }, [])

  const onClickHandler = async (formData: FormData) => {
    const body = getObjectFromFormData(formSchema, formData)
    try {
      if (homeContent && homeContent.id) {
        body["id"] = homeContent.id;
        await axiosl.patch("home", body);
      } else {
        await axiosl.post("home", body);
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
    setFormData(fd as HomeContent);
  }

  return (
    <DashboardNavigation page="home">
      <div className="home-content">
        <form className="home-form" action={onClickHandler}>
          {
            formSchema.map(fs => (
              <React.Fragment key={"field="+fs.name}>
                <label htmlFor={fs.name}>{fs.label}</label>
                <Input name={fs.name} value={formData?.[fs.name as keyof HomeContent]} onChange={onInputChange} />
              </React.Fragment>
            ))
          }
          <Button value="Submit" />
        </form>
      </div>
    </DashboardNavigation>
  )
};

export default Home;
