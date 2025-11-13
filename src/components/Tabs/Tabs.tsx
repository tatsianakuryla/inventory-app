import { type JSX, type ReactNode } from 'react';
import { getTailWindClass } from '../../shared/helpers/helpers';
import {
  container,
  navWrapper,
  nav,
  tabButton,
  tabActive,
  tabInactive,
  tabContentVisible,
  tabContentHidden,
} from './tabs.styles';

interface TabsProperties {
  tabs: {
    id: string;
    label: string;
    content: ReactNode;
  }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const Tabs = ({ tabs, activeTab, onTabChange }: TabsProperties): JSX.Element => {
  return (
    <div className={container}>
      <div className={navWrapper}>
        <nav className={nav} aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={getTailWindClass(
                tabButton,
                activeTab === tab.id ? tabActive : tabInactive
              )}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div>
        {tabs.map((tab) => (
          <div key={tab.id} className={activeTab === tab.id ? tabContentVisible : tabContentHidden}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};
