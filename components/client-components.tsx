"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import client-side only components
const AnimatedCursor = dynamic(() => import("@/components/animated-cursor"), { 
  ssr: false,
  loading: () => null
});

const ParticleCanvas = dynamic(() => import("@/components/animations/particle-canvas"), { 
  ssr: false,
  loading: () => null
});

const ScrollProgress = dynamic(() => import("@/components/animations/scroll-progress"), { 
  ssr: false,
  loading: () => null
});

export default function ClientComponents() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <AnimatedCursor />
      <ParticleCanvas />
      <ScrollProgress />
    </>
  );
}
