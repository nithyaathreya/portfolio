import withHeader from '@/app/components/withHeader';
import { CaseStudy } from '@/app/interfaces/common';
import { axiosl } from '@/app/store/axios';
import React from 'react';

export async function generateStaticParams() {
  let case_studies = [];
  if (typeof window !== "undefined") {
    const res = await axiosl.get("case_studies");
    case_studies = res.data
  }
 
  return case_studies.map((case_study: CaseStudy) => ({
    slug: case_study.slug,
  }))
}

interface Props {
  params: { slug: string; };
}

const Project = ({ params }: Props) => {
  const { slug } = params

  React.useEffect(() => {
    axiosl.get(`case_studies/${slug}`).then(res => {
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
