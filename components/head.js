import * as React from 'react';
import Head from 'next/head';

const HeadEvent = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta property="og:title" content={title} />
    </Head>
  );
};

export default HeadEvent;