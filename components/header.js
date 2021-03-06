import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link';

const Header = () => {
    const { data: session } = useSession();

    if (session) {
        return (
            <header>
                <nav className='bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800'>
                    <div className="container flex flex-wrap justify-between items-center mx-auto">
                        <Link href={"/"}>
                            <a className="flex items-center">
                                <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>Next Body Composition</span>
                            </a>
                        </Link>
                        <div>
                            <ul className="flex mt-4 flex-row space-x-8 md:mt-1 text-sm font-medium">
                                <li>
                                <Link href={"/"}><a className="bg-transparent text-blue-500 p-0 dark:text-white" aria-current="page">トップ</a></Link>
                                </li>
                                <li>
                                <Link href={"/user/update"}><a className="hover:bg-transparent border-0 hover:text-blue-700 p-0 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 dark:hover:bg-transparent dark:border-gray-700">設定</a></Link>
                                </li>
                                <li>
                                <a onClick={() => signOut()} href="#" className="hover:bg-transparent border-0 hover:text-red-500 p-0 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-red-700">サインアウト</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        )
      }

      return (
        <header>
            <nav>
            </nav>
        </header>
    )
}

export default Header;