"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function LandingV3Layout() {
  const router = useRouter();

  useEffect(() => {
    if (router) {
      router.push('/stake');
    }
  }, [router]);

  if (!router) {
    return null;
  }

  return null;
}

