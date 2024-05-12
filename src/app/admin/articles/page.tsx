"use client"
import { axiosl, shallowRouting } from '@/app/store/axios';
import { useRouter } from 'next/navigation';

import React from 'react';
import DashboardNavigation from '../dashboard/navigation';
import { Article } from '@/app/interfaces/article';
import "./index.css";
import Drawer from '@/app/components/Drawer';
import AddArticleForm from './addArticle';
import Button from '@/app/components/Button';
import Table from '@/app/components/Table';

interface DashboardProps {};

const Articles = (props: DashboardProps) => {
  const router = useRouter();
  const [articles, setArticles] = React.useState<Article[] | []>([]);
  const [addForm, setAddForm] = React.useState(false);

  const heads = [
    {
      key: "name",
      display: "Name",
      render: (a: Article) => (
        <div className='name-render'>
          <img src={a.imageUrl} width={100} alt={a.name} />
          <p>{a.name}</p>
        </div>
      )
    },
    {
      key: "slug",
      display: "Slug",
      render: (a: Article) => a.slug,
    },
    {
      key: "description",
      display: "Description",
      render: (a: Article) => a.description,
    },
  ]

  React.useEffect(() => {
    axiosl.get("articles").then(res => {
      setArticles(res.data)
    }).catch(err => {
      router.push("/admin/login", shallowRouting);
    })
  }, [router])

  return (
    <DashboardNavigation page="articles">
      <div className="page">
        <div className="page-header">
          <Button key={"add-article"} onClick={() => setAddForm(true)} value='Add article' />
        </div>
        <Table columns={heads} data={articles} />
        <Drawer
          open={addForm}
          onClose={() => setAddForm(false)}
        >
          <AddArticleForm mode='add' />
        </Drawer>
      </div>
    </DashboardNavigation>
  )
};

export default Articles;
