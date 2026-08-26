import { cn } from "@/lib/utils";

interface LoadingPageProps {
  className?: string;
  message?: string;
}

export function LoadingPage({ className, message = "Loading..." }: LoadingPageProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-background px-4",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="text-center space-y-3">
        <p className="eyebrow text-gold/80">Please wait</p>
        <h2 className="text-3xl md:text-4xl font-display font-medium text-foreground">{message}</h2>
        <div className="gold-rule mx-auto" />
      </div>

      <div
        className="w-full max-w-xs h-1.5 bg-muted rounded-full overflow-hidden"
        aria-hidden="true"
      >
        <div className="h-full w-1/4 bg-gold animate-shimmer" style={{ animationDelay: "0s" }} />
      </div>
    </div>
  );
}

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  children: React.ReactNode;
}

export function LoadingOverlay({ isLoading, message, children }: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-sm px-4"
          role="status"
          aria-live="polite"
          aria-label={message || "Loading..."}
        >
          <div className="text-center space-y-3">
            <p className="eyebrow text-gold/80">Please wait</p>
            <p className="text-sm text-muted-foreground">{message || "Loading..."}</p>
            <div className="gold-rule mx-auto" />
          </div>
          <div
            className="w-full max-w-xs h-1.5 bg-muted rounded-full overflow-hidden"
            aria-hidden="true"
          >
            <div
              className="h-full w-1/4 bg-gold animate-shimmer"
              style={{ animationDelay: "0s" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
