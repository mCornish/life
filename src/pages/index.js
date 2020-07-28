import React from "react"
import App from '../components/App';
import Helmet from 'react-helmet';

export default function Home() {
  return (
    <div>
      <Helmet>
          <meta charSet="utf-8" />
          <title>Life | Mike Cornish</title>
          <link rel="canonical" href="http://life.mikecornish.me" />
        </Helmet>
      <App/>
    </div>
  )
}
