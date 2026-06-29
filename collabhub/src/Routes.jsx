import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound.jsx";
import ProjectManagement from './pages/project-management';
import FileManagement from './pages/file-management';
import Login from './pages/login';
import TeamCommunication from './pages/team-communication';
import WorkspaceDashboard from './pages/workspace-dashboard';
import CalendarIntegration from './pages/calendar-integration';
import VideoConference from './pages/video-conference';
import Registration from './pages/registration';
import ProfileSettings from './pages/profileSettings.jsx';
import WorkspaceSettings from './pages/workspaceSettings.jsx';
import HelpSupport from './pages/helpsupport.jsx';
import Preferences from "pages/preferences.jsx";


const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Login />} />
        <Route path="/project-management" element={<ProjectManagement />} />
        <Route path="/file-management" element={<FileManagement />} />
        <Route path="/login" element={<Login />} />
        <Route path="/team-communication" element={<TeamCommunication />} />
        <Route path="/workspace-dashboard" element={<WorkspaceDashboard />} />
        <Route path="/calendar-integration" element={<CalendarIntegration />} />
        <Route path="/video-conference" element={<VideoConference />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/workspace-settings" element={<WorkspaceSettings />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
