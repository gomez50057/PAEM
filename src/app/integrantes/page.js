import React from 'react';
import FederalTeam from '@/components/teams/FederalTeam';
import CDMXTeam from '@/components/teams/CDMXTeam';
import EDOMEXTeam from '@/components/teams/EDOMEXTeam';
import HGOTeam from '@/components/teams/HGOTeam';

const IntegrantesPage = () => {
  return (
    <div>
      <FederalTeam />
      <CDMXTeam />
      <EDOMEXTeam />
      <HGOTeam />
    </div>
  );
};

export default IntegrantesPage;
