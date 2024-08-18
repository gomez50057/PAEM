import React from 'react';
import Team from '@/components/teams/Team';
import { tecnicoTeamMembers } from '@/utils/utils';

const HGOTeam = () => {
  return (
    <Team 
      teamName="Consejo Técnico"
      teamMembers={tecnicoTeamMembers}
      isTecnicoTeam={true} 
    />
  );
}

export default HGOTeam;
