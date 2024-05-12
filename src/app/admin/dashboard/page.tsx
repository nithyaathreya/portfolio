"use client"
import { axiosl, shallowRouting } from '@/app/store/axios';
import { redirect, useRouter } from 'next/navigation';
import "./index.css";

import React from 'react';
import DashboardNavigation from './navigation';

interface DashboardProps {};

const Dashboard = (props: DashboardProps) => {
  const router = useRouter();

  React.useEffect(() => {
    axiosl.get("users").then(res => {
      console.log(res);
    }).catch(err => {
      router.push("/admin/login", shallowRouting);
      console.log(err)
    })
  }, [])

  return (
    redirect("/admin/home")
  )
};

export default Dashboard;
