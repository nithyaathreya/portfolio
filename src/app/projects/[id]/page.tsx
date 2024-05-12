"use client"
import withHeader from '@/app/components/withHeader';
import { CaseStudy } from '@/app/interfaces/common';
import { axiosl } from '@/app/store/axios';
import { useParams } from 'next/navigation';
import React from 'react';

const Project = () => {
  const {id} = useParams();

  React.useEffect(() => {
    axiosl.get(`case_studies/${id}`).then(res => {
      const study = (res.data[0] as CaseStudy).body;
      const cont = document.getElementById("main-container");
      if (cont) cont.innerHTML = study;
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div id="main-container" className="case-study-container"></div>
  )
}

export default withHeader(Project);
