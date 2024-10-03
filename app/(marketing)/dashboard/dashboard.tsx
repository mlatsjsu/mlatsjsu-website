'use client';

import { WhitelistForm, WhitelistTable } from './whitelist';
import {
  SpotlightForm,
  SpotlightTable,
  SpotlightTableKeyProvider,
} from './spotlights';
import { BoardForm, BoardTable, BoardTableKeyProvider } from './board';
import { ProjectForm, ProjectTable, ProjectTableKeyProvider } from './projects';
import {
  LearningResourceForm,
  LearningResourceTable,
  LearningResourceTableKeyProvider,
} from './learning-resources';
import SWRConfigProvider from '@/wrappers/swr-config';

const Dashboard: React.FC = () => (
  <SWRConfigProvider>
    <div className="flex flex-1 flex-col items-center overflow-hidden max-lg:px-sm">
      <h3 className="w-full max-lg:pb-md max-lg:text-h1-mobile-lg lg:pb-xl lg:text-h1-desktop-sm">
        Admin Dashboard
      </h3>
      <p className="w-full pb-md text-light-neutral-dark max-lg:text-h5-mobile lg:text-h5-desktop">
        Whitelist
      </p>
      <WhitelistForm />
      <WhitelistTable />
      <div className="h-xl" />
      <p className="w-full pb-md text-light-neutral-dark max-lg:text-h5-mobile lg:text-h5-desktop">
        Spotlights
      </p>
      <SpotlightTableKeyProvider>
        <SpotlightForm />
        <SpotlightTable />
      </SpotlightTableKeyProvider>
      <div className="h-xl" />
      <p className="w-full pb-md text-light-neutral-dark max-lg:text-h5-mobile lg:text-h5-desktop">
        Board Members
      </p>
      <BoardTableKeyProvider>
        <BoardForm />
        <BoardTable />
      </BoardTableKeyProvider>
      <div className="h-xl" />
      <p className="w-full pb-md text-light-neutral-dark max-lg:text-h5-mobile lg:text-h5-desktop">
        Projects
      </p>
      <ProjectTableKeyProvider>
        <ProjectForm />
        <ProjectTable />
      </ProjectTableKeyProvider>
      <div className="h-xl" />
      <p className="w-full pb-md text-light-neutral-dark max-lg:text-h5-mobile lg:text-h5-desktop">
        Learning Resources
      </p>
      <LearningResourceTableKeyProvider>
        <LearningResourceForm />
        <LearningResourceTable />
      </LearningResourceTableKeyProvider>
    </div>
  </SWRConfigProvider>
);

export default Dashboard;
