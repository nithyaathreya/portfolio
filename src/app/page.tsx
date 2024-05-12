"use client"
import React from 'react';
import { HomeContent } from "./interfaces/common";
import { axiosl } from './store/axios';
import withHeader from './components/withHeader';
import "./home.css";
import Projects from './projects';

const Home = () => {
  const [homeContent, setHomeContent] = React.useState<HomeContent>();

  React.useEffect(() => {
    axiosl.get("home").then(res => {
      setHomeContent(res.data[0]);
    }).catch(err => {
      console.log(err)
    })
  }, []);
  return (
    <React.Fragment>
      <div className="home-container">
        <div className="intro">
          <div className="banner">
            <img src={homeContent?.imageUrl} width="400px" alt="Nithya profile banner" />
          </div>
          <div className="content">
            <h1>{homeContent?.greeting.split(",")[0]}<span className='primary'>!</span></h1>
            <h2>{homeContent?.greeting.split(",")[1]}</h2>
            <p>{homeContent?.quote}</p>
          </div>
        </div>
        <svg className='svg-icon' width="80px" height="80px" viewBox="0 0 30 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className='animatepath' d="M7.46669 10.3334L11.2444 14.1111C11.3498 14.2168 11.4749 14.3006 11.6126 14.3578C11.7504 14.415 11.898 14.4444 12.0472 14.4444C12.1963 14.4444 12.3441 14.415 12.4819 14.3578C12.6196 14.3006 12.7447 14.2168 12.85 14.1111L16.5333 10.3334" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.7533 17.2467 2.5 12 2.5C6.7533 2.5 2.5 6.7533 2.5 12C2.5 17.2467 6.7533 21.5 12 21.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <Projects />
    </React.Fragment>
  );
}

export default withHeader(Home);
