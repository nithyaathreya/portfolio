import React from 'react';
import "./index.css";
import Link from 'next/link';
import Button from '@/app/components/Button';
import { axiosl } from '@/app/store/axios';

const DashboardNavigation = ({children, page="home"}: {children: React.ReactNode, page?: string}) => {
  const [activeLink, setActiveLink] = React.useState(page);
  const navLinks = [
    {
      key: "home",
      display: "Home",
      to: "/admin/home",
    },
    {
      key: "introduction",
      display: "Introduction",
      to: "/admin/introduction",
    },
    {
      key: "experiences",
      display: "Experiences",
      to: "/admin/experiences",
    },
    {
      key: "articles",
      display: "Articles",
      to: "/admin/articles",
    },
    {
      key: "case_studies",
      display: "Case studies",
      to: "/admin/case_studies",
    }
  ]

  const migrateDb = () => {
    axiosl.get("migrate");
  }

  return (
    <div className="dashboard-layout">
      <div className="navigation">
        <ul className='prf-nav'>
          {
            navLinks.map(link => (
              <Link key={link.key} href={link.to}>
                <li className={`item ${link.key===activeLink && 'active'}`}>{link.display}</li>
              </Link>
            ))
          }
        </ul>
        <Button value='Migrate' glyphIcon="&#x2601;&#x2191;" onClick={migrateDb}/>
      </div>
      <div className="outlet">
        {children}
      </div>
    </div>
  )
}

export default DashboardNavigation;
