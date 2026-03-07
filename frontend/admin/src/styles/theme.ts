export const theme = {
  colors: {
    bg: '#f5f7fa',
    surface: '#ffffff',
    primary: '#4f46e5',
    primaryHover: '#4338ca',
    danger: '#ef4444',
    dangerHover: '#dc2626',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    inputBg: '#f8fafc',
    sidebarBg: '#1a2332',
    sidebarText: '#c8d6e5',
    sidebarSubText: '#a0b0c0',
    accent: '#e84393',
    accentHover: '#d63384',
  },
  radius: '10px',
  shadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
  shadowLg: '0 4px 14px rgba(0, 0, 0, 0.1)',
} as const;

export type Theme = typeof theme;
