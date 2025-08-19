import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Question 1: Routes</h1>
      <Link href="/mui/drawer">/mui/drawer</Link>
      <br/>
      <Link href="/mui/button">/mui/button</Link>
      <br/>
      <Link href="/mui/card">/mui/card</Link>
      <br/>
      <Link href="/mui/dialog">/mui/dialog</Link>
        <br/>
      <Link href="/mui/typography">/mui/typography</Link>
        <br/>
      <Link href="/mui/navigation/appbar">/mui/navigation/appbar</Link>
        <br/>
      <Link href="/mui/navigation/tabs">/mui/navigation/tabs</Link>
        <br/>
      <Link href="/profile/jenil">/profile/jenil</Link>
        <br/>
      <Link href="/blog/101">/blog/101</Link>
        <br/>
    </main>
  );
}
