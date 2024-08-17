import React from 'react';
import Team from '@/components/Team';
import { tecnicoTeamMembers } from '@/utils/utils';

const HGOTeam = () => {
  return (
    <Team 
      teamName="Consejo Técnico"
      teamMembers={tecnicoTeamMembers}
    />
  );
}

export default HGOTeam;
