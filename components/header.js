import { signOut, useSession } from 'next-auth/react'
import Link from "next/link";

const Header = () => {
    const { data: session } = useSession();

    if (session) {
        return (
            <header>
                <nav>
                    {session.user.name}<br/>
                    <Link href={"/user/update"}><a>Settings</a></Link>
                    <button onClick={() => signOut()}>Sign out</button>
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