import React from 'react';
import Team from '@/components/teams/Team';
import { tecnicoTeamMembers } from '@/utils/utils';


const COMZMsHgoTeam = () => {

  return (
    <Team 
      teamName="Comisiones de Ordenamiento Metropolitano" 
      teamMembers={tecnicoTeamMembers}
      isTecnicoTeam={true} 
    />
  );
}

export default COMZMsHgoTeam;
