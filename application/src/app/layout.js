import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#2B2B3F]">

        <header className="bg-[#191927] text-white shadow-md shadow-[#8e72ee]">
          <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
            <div className="flex items-center gap-3">
              <a href="/">
                <img src="/Logo_Chess_Print.png" alt="Logo" className="h-15 w-55" />
              </a>
            </div>

            <nav className="flex gap-6">
              <a href="/usuarios" className="hover:text-gray-400">Usuarios</a>
              <a href="/planos" className="hover:text-gray-400">Planos</a>
              <a href="/assinaturas" className="hover:text-gray-400">Assinaturas</a>
              <a href="/puzzles" className="hover:text-gray-400">Puzzles</a>
              <a href="/" className="hover:text-gray-400">Home</a>

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
