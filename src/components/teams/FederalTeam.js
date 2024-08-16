import React from 'react';
import Team from '@/components/Team';
import { federalTeamMembers } from '@/utils/utils';

const FederalTeam = () => {
  return (
    <Team 
      teamName="Gobierno Federal"
      teamMembers={federalTeamMembers}
    />
  );
}

export default FederalTeam;
