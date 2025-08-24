export function PageStyleWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="size-full snap-y snap-mandatory overflow-y-auto overscroll-contain">
      <div className="relative mx-auto w-fit">{children}</div>
    </div>
  );
}
