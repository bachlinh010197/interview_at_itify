import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useAuth } from '../context/AuthContext';

interface SubMenuItem {
  label: string;
  path: string;
  icon: string;
}

interface MenuItem {
  label: string;
  icon: string;
  path?: string;
  children?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  { label: 'Dashboard', icon: '🏠', path: '/' },
  {
    label: 'User Management',
    icon: '👥',
    children: [
      { label: 'All Users', path: '/users', icon: '👤' },
      { label: 'Roles', path: '/users/roles', icon: '🛡️' },
    ],
  },
  {
    label: 'Settings',
    icon: '⚙️',
    children: [
      { label: 'General', path: '/settings/general', icon: '🔧' },
      { label: 'API Keys', path: '/settings/api-keys', icon: '🔑' },
    ],
  },
  {
    label: '送迎関連',
    icon: '🚐',
    children: [
      { label: '車両管理', path: '/vehicle', icon: '🚗' },
    ],
  },
];

/* ── Styled Components ── */

const Aside = styled.aside<{ $collapsed: boolean }>`
  width: ${({ $collapsed }) => ($collapsed ? '68px' : '260px')};
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.sidebarBg};
  color: ${({ theme }) => theme.colors.sidebarText};
  display: flex;
  flex-direction: column;
  transition: width 0.25s ease;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 0;
`;

const Header = styled.div<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'space-between')};
  padding: ${({ $collapsed }) => ($collapsed ? '1rem 0.5rem' : '1rem')};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  min-height: 56px;
`;

const Title = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
`;

const ToggleBtn = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.sidebarText};
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  transition: background 0.15s;
  flex-shrink: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const Nav = styled.nav`
  flex: 1;
  padding: 0.5rem 0;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  margin: 2px 0;
`;

const linkBase = css<{ $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 1rem;
  color: ${({ theme }) => theme.colors.sidebarText};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  border: none;
  background: none;
  width: 100%;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
  border-radius: 0;

  ${({ $collapsed }) =>
    $collapsed &&
    css`
      justify-content: center;
      padding: 0.7rem 0.5rem;
    `}

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: #fff;
  }
`;

const MenuLink = styled(NavLink)<{ $collapsed?: boolean }>`
  ${linkBase}

  &.active {
    background: ${({ theme }) => theme.colors.accent};
    color: #fff;
    border-radius: 8px;
    margin: 0 0.5rem;
    width: calc(100% - 1rem);

    ${({ $collapsed }) =>
      $collapsed &&
      css`
        margin: 0 0.35rem;
        width: calc(100% - 0.7rem);
      `}

    &:hover {
      background: ${({ theme }) => theme.colors.accentHover};
      color: #fff;
    }
  }
`;

const ParentButton = styled.button<{ $active: boolean; $collapsed?: boolean }>`
  ${linkBase}
  text-align: left;
  color: ${({ $active }) => ($active ? '#fff' : undefined)};
`;

const Icon = styled.span`
  font-size: 1.15rem;
  width: 24px;
  text-align: center;
  flex-shrink: 0;
`;

const Label = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Chevron = styled.span<{ $open: boolean }>`
  margin-left: auto;
  font-size: 1.1rem;
  transition: transform 0.2s;
  transform: rotate(${({ $open }) => ($open ? '90deg' : '0deg')});
`;

const SubMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SubLink = styled(NavLink)<{ $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1rem 0.6rem 1.5rem;
  color: ${({ theme }) => theme.colors.sidebarSubText};
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 400;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;

  ${({ $collapsed }) =>
    $collapsed &&
    css`
      justify-content: center;
      padding: 0.7rem 0.5rem;
    `}

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: #fff;
  }

  &.active {
    background: ${({ theme }) => theme.colors.accent};
    color: #fff;
    border-radius: 8px;
    margin: 0 0.5rem;
    padding-left: 1rem;

    ${({ $collapsed }) =>
      $collapsed &&
      css`
        margin: 0 0.35rem;
        width: calc(100% - 0.7rem);
        padding-left: 0.5rem;
      `}

    &:hover {
      background: ${({ theme }) => theme.colors.accentHover};
      color: #fff;
    }
  }
`;

const Footer = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.5rem 0;
  margin-top: auto;
`;

const LogoutBtn = styled.button<{ $collapsed?: boolean }>`
  ${linkBase}

  &:hover {
    background: rgba(239, 68, 68, 0.15);
    color: ${({ theme }) => theme.colors.danger};
  }
`;

/* ── Component ── */

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const { logout } = useAuth();
  const location = useLocation();

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isChildActive = (children?: SubMenuItem[]) =>
    children?.some((c) => location.pathname === c.path) ?? false;

  return (
    <Aside $collapsed={collapsed}>
      <Header $collapsed={collapsed}>
        {!collapsed && <Title>Admin Panel</Title>}
        <ToggleBtn
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        >
          {collapsed ? '☰' : '‹'}
        </ToggleBtn>
      </Header>

      <Nav>
        <Menu>
          {menuItems.map((item) => {
            const hasChildren = !!item.children;
            const isOpen = openMenus[item.label] || isChildActive(item.children);

            if (!hasChildren && item.path) {
              return (
                <Item key={item.label}>
                  <MenuLink
                    to={item.path}
                    end
                    $collapsed={collapsed}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon>{item.icon}</Icon>
                    {!collapsed && <Label>{item.label}</Label>}
                  </MenuLink>
                </Item>
              );
            }

            return (
              <Item key={item.label}>
                <ParentButton
                  type="button"
                  $active={isChildActive(item.children)}
                  $collapsed={collapsed}
                  onClick={() => toggleMenu(item.label)}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon>{item.icon}</Icon>
                  {!collapsed && (
                    <>
                      <Label>{item.label}</Label>
                      <Chevron $open={isOpen}>›</Chevron>
                    </>
                  )}
                </ParentButton>
                {isOpen && (
                  <SubMenu>
                    {item.children!.map((child) => (
                      <li key={child.path}>
                        <SubLink
                          to={child.path}
                          $collapsed={collapsed}
                          title={collapsed ? child.label : undefined}
                        >
                          <Icon>{child.icon}</Icon>
                          {!collapsed && <Label>{child.label}</Label>}
                        </SubLink>
                      </li>
                    ))}
                  </SubMenu>
                )}
              </Item>
            );
          })}
        </Menu>
      </Nav>

      <Footer>
        <LogoutBtn
          type="button"
          $collapsed={collapsed}
          onClick={logout}
          title={collapsed ? 'Logout' : undefined}
        >
          <Icon>🚪</Icon>
          {!collapsed && <Label>Logout</Label>}
        </LogoutBtn>
      </Footer>
    </Aside>
  );
}

export default Sidebar;
