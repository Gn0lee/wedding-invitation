export function PageStyleWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="size-full overflow-y-auto">
      <div className="relative mx-auto w-fit">{children}</div>
    </div>
  );
}
