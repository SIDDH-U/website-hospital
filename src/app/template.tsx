export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-transition-fade flex-1 flex flex-col">
      {children}
    </div>
  );
}
