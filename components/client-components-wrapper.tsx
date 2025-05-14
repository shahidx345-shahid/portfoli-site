'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import components that aren't needed immediately
const AnimatedCursor = dynamic(() => import("@/components/animated-cursor"), { ssr: false });
const ParticleCanvas = dynamic(() => import("@/components/animations/particle-canvas"), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/animations/scroll-progress"), { ssr: false });

export default function ClientComponentsWrapper() {
  return (
    <>
      <Suspense fallback={null}>
        <AnimatedCursor />
      </Suspense>
      <Suspense fallback={null}>
        <ParticleCanvas />
      </Suspense>
      <Suspense fallback={null}>
        <ScrollProgress />
      </Suspense>
    </>
  );
}
