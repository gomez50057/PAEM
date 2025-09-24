import { MUNICIPIOS } from "@/utils/municipios";
import MunicipioCard from "./MunicipioCard";
import styles from "@/styles/PMIU_ZMP/MunicipioCard.module.css";

export default function MunicipiosGrid() {
  return (
    <div className={styles.grid}>
      {MUNICIPIOS.map((item) => (
        <MunicipioCard key={item.id} {...item} />
      ))}
    </div>
  );
}
