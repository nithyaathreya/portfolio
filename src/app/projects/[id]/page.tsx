import { apiGet } from '@/app/api/database';
import withHeader from '@/app/components/withHeader';
import { CaseStudy } from '@/app/interfaces/common';
import { axiosl } from '@/app/store/axios';
import { useParams } from 'next/navigation';
import React from 'react';

export async function generateStaticParams() {
  let case_studies = await apiGet("SELECT * FROM case_studies", []);
  return (case_studies as CaseStudy[]).map((case_study) => ({
    slug: case_study.slug,
  }))
}

interface Props {
  params: { slug: string; }[];
}

const Project = ({ params }: Props) => {
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
