import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-gray-100 text-gray-900">
        <header className="bg-white shadow-md border-b">
          <div className="mx-auto max-w-4xl px-4 py-6 flex justify-between items-center">

            <Link href="/" className="text-2xl font-bold ">My Blog</Link>

            <nav>
              <ul className="flex gap-4 text-lg font-medium sm:flex-row sm:gap-6 sm:text-base">
                <li>
                  <Link href="/" className="hover:text-blue-500">
                    List
                  </Link>
                </li>

                <li>
                  <Link href="/posts/new" className="hover:text-blue-500">
                    Create new Post
                  </Link>
                </li>
              </ul>

            </nav>

          </div>

        </header>

        <main>
          {children}
        </main>

      </body>
    </html>
  );
}