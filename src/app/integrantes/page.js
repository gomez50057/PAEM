import React from 'react';
import Tecnico from '@/components/teams/Tecnico';
import FederalTeam from '@/components/teams/FederalTeam';
import CDMXTeam from '@/components/teams/CDMXTeam';
import EDOMEXTeam from '@/components/teams/EDOMEXTeam';
import HGOTeam from '@/components/teams/HGOTeam';
import Navbar from '@/components/Navbar';


const IntegrantesPage = () => {
  return (
    <div>
      <Navbar />
      <Tecnico />
      <FederalTeam />
      <CDMXTeam />
      <EDOMEXTeam />
      <HGOTeam />
    </div>
  );
};

export default IntegrantesPage;
