import React from 'react';
import Team from '@/components/Team';
import { edomexTeamMembers } from '@/utils/utils';

const EDOMEXTeam = () => {
  return (
    <Team 
      teamName="Gobierno del Estado de México"
      teamMembers={edomexTeamMembers}
      isTecnicoTeam={false} 
    />
  );
}

export default EDOMEXTeam;
