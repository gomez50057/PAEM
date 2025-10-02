import React from 'react';
import Navbar from '@/components/shared/Navbar';
import Hero from '@/components/PMIU_ZMP/Hero';
import BehindPlan from '@/components/PMIU_ZMP/BehindPlan';
import MunicipiosPromoSlider from "@/components/PMIU_ZMP/MunicipiosPromoSlider";
import { MUNICIPIOS } from "@/utils/municipios";


const pmiu_zmp = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <BehindPlan />
      <MunicipiosPromoSlider items={MUNICIPIOS} />
    </div>
  );
};

export default pmiu_zmp;
