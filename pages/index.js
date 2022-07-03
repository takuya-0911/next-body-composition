import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { data: session, status: loading } = useSession();

  // ロード中
  if (loading === 'loading') {
    return <div>Loading...</div>
  }

  if (session) {

    router.push("/innerscan/daily");
    return null;
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
      <button onClick={() => router.push("/user/register")}><a>新規登録</a></button>
    </>
  )
}