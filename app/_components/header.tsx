"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const Header = () => {
  const { data: session } = authClient.useSession();
  const handleLogin = async () => {
    try {
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      const response = await fetch(`${origin}/api/auth/sign-in/social`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: "google" }),
        credentials: "include", // include cookies for session handling
      });

      if (response.ok) {
        const data = await response.json();
        if (data.url) {
          // Redirect to Google OAuth URL
          window.location.href = data.url;
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Login failed:", response.status, errorData);
      }
    } catch (err) {
      console.error("Login navigation error:", err);
    }
  };

  return (
    <header className="flex items-center justify-between bg-white px-5 py-6">
      <Image src="/logo.svg" alt="Aparatus" width={100} height={26.09} />
      <div className="flex items-center gap-2">
        {session ? (
          <div>
            <h1>{session.user?.name}</h1>
            <Button
              variant="outline"
              size="icon"
              onClick={() => authClient.signOut()}
            >
              <LogOutIcon />
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="icon" onClick={handleLogin}>
            <LogInIcon />
          </Button>
        )}

        <Button variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </div>
    </header>
  );
};

export default Header;
