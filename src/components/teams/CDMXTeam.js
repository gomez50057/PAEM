import React from 'react';
import Team from '@/components/Team';
import { cdmxTeamMembers } from '@/utils/utils';

const CDMXTeam = () => {
  return (
    <Team 
      teamName="Gobierno de la Ciudad de México"
      teamMembers={cdmxTeamMembers}
    />
  );
}

export default CDMXTeam;
