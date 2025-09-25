// Lista única de municipios (orden controlado)
export const MUNICIPIOS = [
  { id: "pachuca", name: "Pachuca de Soto", img: "pachuca.png", anchor: "#PachucaDeSoto" },
  { id: "epazoyucan", name: "Epazoyucan", img: "epazoyucan.png", anchor: "#Epazoyucan" },
  { id: "mineral-monte", name: "Mineral del Monte", img: "mineral-monte.png", anchor: "#MineralDelMonte" },
  { id: "san-agustin-tlaxiaca", name: "San Agustín Tlaxiaca", img: "san-agustin.png", anchor: "#SanAgustinTlaxiaca" },
  { id: "zapotlan", name: "Zapotlán de Juárez", img: "zapotlan.png", anchor: "#ZapotlanDeJuarez" },
  { id: "zempoala", name: "Zempoala", img: "zempoala.png", anchor: "#Zempoala" },
  { id: "mineral-reforma", name: "Mineral de la Reforma", img: "mineral-reforma.png", anchor: "#MineralDeLaReforma" },
];

// Helper: parte la lista en { left, right }
// Por defecto: right = 3 elementos, left = resto (4)
export function splitMunicipios(list = MUNICIPIOS, { rightCount = 3 } = {}) {
  const right = list.slice(0, rightCount);
  const left = list.slice(rightCount);
  return { left, right };
}
