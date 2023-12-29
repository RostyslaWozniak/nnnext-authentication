import Link from "next/link";


export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-4xl">Main</h1>
      <Link className="bg-purple-500 px-3 py-1 m-5 rounded" href="/profile">Profile</Link>
    </main>
  )
}
