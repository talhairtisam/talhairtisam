"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";

type ViewportMountProps<P extends object> = {
  children: ReactNode;
  loader: () => Promise<{ default: ComponentType<P> }>;
  componentProps?: P;
  rootMargin?: string;
  className?: string;
};

/**
 * Keeps server-rendered static content visible until the section nears the
 * viewport, then dynamically imports and mounts the interactive component.
 */
export function ViewportMount<P extends object>({
  children,
  loader,
  componentProps = {} as P,
  rootMargin = "400px 0px",
  className,
}: ViewportMountProps<P>) {
  const ref = useRef<HTMLDivElement>(null);
  const [Interactive, setInteractive] = useState<ComponentType<P> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || Interactive) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          observer.disconnect();
          void loader().then((mod) => setInteractive(() => mod.default));
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loader, Interactive]);

  return (
    <div ref={ref} className={className}>
      {Interactive ? <Interactive {...componentProps} /> : children}
    </div>
  );
}
