"use client"
import { axiosl, shallowRouting } from '@/app/store/axios';
import { useRouter } from 'next/navigation';

import React from 'react';
import DashboardNavigation from '../dashboard/navigation';
import { CaseStudy } from '@/app/interfaces/common';
import "./index.css";
import Drawer from '@/app/components/Drawer';
import AddCaseStudyForm from './addCaseStudy';
import Button from '@/app/components/Button';
import Table from '@/app/components/Table';

interface DashboardProps {};

const CaseStudies = (props: DashboardProps) => {
  const router = useRouter();
  const [CaseStudies, setCaseStudies] = React.useState<CaseStudy[] | []>([]);
  const [addForm, setAddForm] = React.useState(false);

  const heads = [
    {
      key: "name",
      display: "Name",
      render: (a: CaseStudy) => a.title
    },
    {
      key: "slug",
      display: "Slug",
      render: (a: CaseStudy) => a.slug,
    },
    {
      key: "description",
      display: "Description",
      render: (a: CaseStudy) => a.description,
    },
  ]

  React.useEffect(() => {
    axiosl.get("case_studies").then(res => {
      setCaseStudies(res.data)
    }).catch(err => {
      router.push("/admin/login", shallowRouting);
    })
  }, [])

  return (
    <DashboardNavigation page="case_studies">
      <div className="page">
        <div className="page-header">
          <Button key={"add-caseStudy"} onClick={() => setAddForm(true)} value='Add case study' />
        </div>
        <Table columns={heads} data={CaseStudies} />
        <Drawer
          open={addForm}
          onClose={() => setAddForm(false)}
        >
          <AddCaseStudyForm mode='add' />
        </Drawer>
      </div>
    </DashboardNavigation>
  )
};

export default CaseStudies;
