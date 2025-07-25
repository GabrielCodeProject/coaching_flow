import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Workouts | Coaching Platform",
  description: "Discover amazing workouts from professional coaches",
};

export default function PublicLayout({
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
            <nav className="hidden md:flex items-center gap-6">
              <a href="/browse" className="text-sm hover:text-primary">
                Browse
              </a>
              <a href="/coaches" className="text-sm hover:text-primary">
                Coaches
              </a>
            </nav>
            <div className="flex items-center gap-2">
              <a href="/sign-in" className="text-sm hover:text-primary">
                Sign In
              </a>
              <a
                href="/sign-up"
                className="text-sm bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-16">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Coaching Platform</h3>
              <p className="text-sm text-muted-foreground">
                Your fitness journey starts here with professional coaches and
                amazing workouts.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-3">For Athletes</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/browse" className="hover:text-primary">
                    Browse Workouts
                  </a>
                </li>
                <li>
                  <a href="/coaches" className="hover:text-primary">
                    Find Coaches
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="hover:text-primary">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">For Coaches</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/coach/signup" className="hover:text-primary">
                    Become a Coach
                  </a>
                </li>
                <li>
                  <a href="/coach/resources" className="hover:text-primary">
                    Resources
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/help" className="hover:text-primary">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-primary">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 Coaching Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
