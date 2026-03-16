function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main>{children}</main>
    </div>
  );
}

export default AuthLayout;
