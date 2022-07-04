// import '../styles/globals.css'
import 'tailwindcss/tailwind.css';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

export default MyApp
