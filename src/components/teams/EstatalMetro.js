import React from 'react';
import Team from '@/components/Team';
import { estatalTeamMembers } from '@/utils/utils';

const EstatalMetro = () => {
  return (
    <Team 
      teamName="Consejo de Desarrollo Metropolitano"
      teamMembers={estatalTeamMembers}
      isTecnicoTeam={true} 
    />
  );
}

export default EstatalMetro;
