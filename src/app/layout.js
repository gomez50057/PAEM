import Footer from '../components/layout/Footer';
import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
