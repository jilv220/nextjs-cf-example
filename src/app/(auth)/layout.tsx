export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <div className="mt-6 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}
