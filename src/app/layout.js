import Footer from '../components/shared/Footer';
import '../styles/globals.css';

export const metadata = {
  title: "Metrópoli Hidalgo ",
  description: "Las zonas metropolitanas son áreas donde varios municipios convergen conformando un continuo urbano",
};


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
