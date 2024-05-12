"use client"
import { axiosl, shallowRouting } from '@/app/store/axios';
import { useRouter } from 'next/navigation';

import React from 'react';
import DashboardNavigation from '../dashboard/navigation';
import { Experience } from '@/app/interfaces/common';
import "./index.css";
import FabButton from '@/app/components/FabButton';
import Drawer from '@/app/components/Drawer';
import AddExperienceForm from './addExperience';
import Button from '@/app/components/Button';
import Table from '@/app/components/Table';

interface DashboardProps {};

const Experiences = (props: DashboardProps) => {
  const router = useRouter();
  const [experiences, setExperiences] = React.useState<Experience[] | []>([]);
  const [addForm, setAddForm] = React.useState(false);

  const heads = [
    {
      key: "name",
      display: "Name",
      render: (a: Experience) => a.name
    },
    {
      key: "imageUrl",
      display: "Banner",
      render: (a: Experience) => <><img src={a.imageUrl} alt={a.name} width={200} /></>,
    },
    {
      key: "description",
      display: "Description",
      render: (a: Experience) => a.description,
    },
  ]

  React.useEffect(() => {
    axiosl.get("projects").then(res => {
      setExperiences(res.data)
    }).catch(err => {
      router.push("/admin/login", shallowRouting);
    })
  }, [])

  return (
    <DashboardNavigation page="experiences">
      <div className="page">
        <div className="page-header">
          <Button key={"add-experience"} onClick={() => setAddForm(true)} value='Add experience' />
        </div>
        <Table columns={heads} data={experiences} />
        <Drawer
          open={addForm}
          onClose={() => setAddForm(false)}
        >
          <AddExperienceForm mode='add' />
        </Drawer>
      </div>
    </DashboardNavigation>
  )
};

export default Experiences;
