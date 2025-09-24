import React from 'react';
import Navbar from '@/components/shared/Navbar';
import Hero from '@/components/PMIU_ZMP/Hero';
import BehindPlan from '@/components/PMIU_ZMP/BehindPlan';
import MunicipioCard from '@/components/PMIU_ZMP/MunicipiosGrid';


const pmiu_zmp = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <BehindPlan />
      <MunicipioCard />
    </div>
  );
};

export default pmiu_zmp;
