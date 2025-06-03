// app/auth/error/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ErrorPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to / after showing error
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Authentication Error</h1>
        <p>An error occurred during login. Redirecting to homepage...</p>
      </div>
    </div>
  );
}
