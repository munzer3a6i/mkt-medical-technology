import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Admin Components
import AdminLogin from './admin/AdminLogin.tsx';
import AuthGuard from './admin/AuthGuard.tsx';
import AdminApp from './admin/AdminApp.tsx';
import DashboardOverview from './admin/DashboardOverview.tsx';
import ServicesList from './admin/services/ServicesList.tsx';
import EquipmentList from './admin/equipment/EquipmentList.tsx';
import PartnersList from './admin/partners/PartnersList.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AuthGuard />}>
          <Route element={<AdminApp />}>
            <Route index element={<DashboardOverview />} />
            <Route path="services" element={<ServicesList />} />
            <Route path="equipment" element={<EquipmentList />} />
            <Route path="partners" element={<PartnersList />} />
          </Route>
        </Route>

        {/* Public Site Catch-All (Must be LAST) */}
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
