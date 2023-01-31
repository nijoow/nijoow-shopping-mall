import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
const _document = () => {
  return (
    <Html>
      <Head>
        <link href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css" rel="stylesheet" type="text/css" />{' '}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default _document;
