"use client";

import { useMemo } from "react";
import MunicipioCard from "./MunicipioCard";
import styles from "@/styles/PMIU_ZMP/MunicipioCard.module.css";

export default function MunicipiosGrid() {
  const items = useMemo(() => ([
    { id: "pachuca", name: "Pachuca de Soto", img: "pachuca.png", anchor: "#PachucaDeSoto" },
    { id: "mineral-reforma", name: "Mineral de la Reforma", img: "mineral-reforma.png", anchor: "#MineralDeLaReforma" },
    { id: "epazoyucan", name: "Epazoyucan", img: "epazoyucan.png", anchor: "#Epazoyucan" },
    { id: "mineral-monte", name: "Mineral del Monte", img: "mineral-monte.png", anchor: "#MineralDelMonte" },
    { id: "san-agustin-tlaxiaca", name: "San Agustín Tlaxiaca", img: "san-agustin.png", anchor: "#SanAgustinTlaxiaca" },
    { id: "zapotlan", name: "Zapotlán de Juárez", img: "zapotlan.png", anchor: "#ZapotlanDeJuarez" },
    { id: "zempoala", name: "Zempoala", img: "zempoala.png", anchor: "#Zempoala" },
  ]), []);

  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <MunicipioCard key={item.id} {...item} />
      ))}
    </div>
  );
}
