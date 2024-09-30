import React from 'react';
import Team from '@/components/teams/Team';
import { tecnicoTeamMembers } from '@/utils/utils';

const HGOTeam = () => {
  return (
    <Team 
      teamSubName="Secretariado Técnico Conjunto"
      teamMembers={tecnicoTeamMembers}
      isTecnicoTeam={true} 
    />
  );
}

export default HGOTeam;
