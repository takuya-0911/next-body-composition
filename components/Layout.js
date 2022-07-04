import Header from './header'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <div className='container mx-auto my-4 px-4'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}