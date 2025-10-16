import Link from "next/link";
import Image from "next/image";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#34344C]">

        <header className="bg-[#222232] text-white shadow-md shadow-[#8e72ee]">
          <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Image src="/Logo_Chess_Print.png" alt="Logo" className="h-15 w-55" width={800} height={800} />
              </Link>
            </div>

            <nav className="flex gap-6">
              <Link href="/usuarios" className="hover:text-gray-400">Usuarios</Link>
              <Link href="/planos" className="hover:text-gray-400">Planos</Link>
              <Link href="/assinaturas" className="hover:text-gray-400">Assinaturas</Link>
              <Link href="/puzzles" className="hover:text-gray-400">Puzzles</Link>
              <Link href="/" className="hover:text-gray-400">Home</Link>

            </nav>
          </div>
        </header>


        <div className="m-10">
          {children}
        </div>
      </body>
    </html >
  );
}
