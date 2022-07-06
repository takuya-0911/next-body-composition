import Header from './header'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <div className='container mx-auto flex flex-col min-h-screen'>
      <Header />
      <main className='my-4 px-4 flex-grow'>{children}</main>
      <Footer />
    </div>
  )
}