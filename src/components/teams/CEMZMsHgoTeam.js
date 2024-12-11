import React from 'react';
import Team from '@/components/teams/Team';
import { CEMZMsHgo } from '@/utils/teamsZmHgo';


const CEMZMsHgoTeam = () => {

  return (
    <Team 
      teamName="Consejo Estatal Metropolitano" 
      teamSubName="Presidencia Conjunta"
      teamMembers={CEMZMsHgo}
      isTecnicoTeam={true} 
    />
  );
}

export default CEMZMsHgoTeam;
