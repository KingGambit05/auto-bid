import { AuthProvider } from "@/hooks/useAuth";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
