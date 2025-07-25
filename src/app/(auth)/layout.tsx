import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Coaching Platform",
  description: "Sign in or create an account to access the coaching platform",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Coaching Platform</h1>
          <p className="text-muted-foreground mt-2">
            Your fitness journey starts here
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
