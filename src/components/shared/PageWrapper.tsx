import type { HTMLAttributes, ReactNode } from "react";

type PageWrapperProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export function PageWrapper({ children, className = "", ...rest }: PageWrapperProps) {
  return (
    <section className={`mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 ${className}`} {...rest}>
      {children}
    </section>
  );
}