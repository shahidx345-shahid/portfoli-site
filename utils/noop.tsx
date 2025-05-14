import React from 'react';

// This is a no-op function that can be used as a placeholder
// for browser-specific code during server-side rendering
export const noop = () => {};

// A component that only renders on the client side
export const ClientOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <>{children}</> : null;
};

// A hook that returns whether the component has mounted on the client
export const useIsMounted = () => {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted;
};
