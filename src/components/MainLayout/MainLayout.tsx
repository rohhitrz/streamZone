'use client';

import { ReactNode, useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import styles from './MainLayout.module.scss';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const handleSidebarCollapse = (isCollapsed: boolean) => {
    setSidebarCollapsed(isCollapsed);
  };
  
  return (
    <div className={`${styles.layoutWrapper} ${sidebarCollapsed ? styles.sidebarCollapsed : ''}`}>
      <Header />
      <div className={styles.contentWrapper}>
        <Sidebar onCollapse={handleSidebarCollapse} />
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 