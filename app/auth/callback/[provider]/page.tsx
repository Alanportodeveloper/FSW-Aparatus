"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ProviderCallbackPage({
  params,
}: {
  params: { provider: string };
}) {
  const search = useSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const error = search.get("error");
    const code = search.get("code");
    // update state in next tick to avoid synchronous setState in effect
    setTimeout(() => {
      if (error) {
        setMessage(`Login failed: ${error}`);
        return;
      }
      if (code) {
        setMessage("Login successful. Redirecionando...");
        // After a short delay, redirect to home or profile
        setTimeout(() => router.push("/"), 1200);
        return;
      }
      setMessage("Aguardando resposta do provedor...");
    }, 0);
  }, [search, router]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="rounded bg-white p-6 text-center shadow">
        <h2 className="mb-2 text-lg font-semibold">
          Callback: {params.provider}
        </h2>
        <p>{message}</p>
        <div className="mt-4">
          <Link className="text-blue-600 underline" href="/">
            Ir para Início
          </Link>
        </div>
      </div>
    </main>
  );
}
