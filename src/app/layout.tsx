import HeaderApp from "./components/header";
import VerticalNavigation from "./components/nav";
import "./globals.css";

export const metadata = {
  title: 'Remedios App',
  description: 'Crud de remédios',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  

  return (
    <html lang="pt-BR">

      <body>
        <HeaderApp />
        {children}
        {/* <footer>Footer</footer> */}
      </body>

    </html>
  )
}