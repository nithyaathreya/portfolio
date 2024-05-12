import React from 'react';
import Head from 'next/head';
import Header from '../Header';

type PageComponentProps = {};

const withHeader = <P extends PageComponentProps>(WrappedComponent: React.ComponentType<P>) => {
  const WithHeader: React.FC<P> = (props) => {
    return (
      <>
        <Head>
          <title>Nithya Aathreya</title>
        </Head>
        <Header />
        <WrappedComponent {...props} />
      </>
    );
  };

  return WithHeader;
};

export default withHeader;