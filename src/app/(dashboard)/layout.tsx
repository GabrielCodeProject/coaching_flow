import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Coaching Platform",
  description: "Manage your workouts, progress, and coaching activities",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Coaching Platform</h1>
          </div>
          <div className="flex items-center gap-4">
            {/* User menu will be added later */}
            <div className="h-8 w-8 rounded-full bg-muted"></div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="flex flex-col gap-2 p-4">
            {/* Navigation items will be added later based on user role */}
            <div className="text-sm text-muted-foreground">
              Navigation will be role-based
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
