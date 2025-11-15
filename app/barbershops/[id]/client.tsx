"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Phone } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import Footer from "@/app/_components/footer";
import { useState } from "react";
import ServiceItem from "@/app/_components/service-item";

interface BarbershopService {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  priceInCents: number;
}

interface BarbershopData {
  id: string;
  name: string;
  address: string;
  description: string;
  imageUrl: string;
  phones: string[];
  services: BarbershopService[];
}

export default function BarbershopPageClient({
  barbershop,
}: {
  barbershop: BarbershopData;
}) {
  const router = useRouter();
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const handleCopyPhone = (phone: string, id?: string) => {
    navigator.clipboard.writeText(phone);
    // store a unique id per button click so only the clicked button shows feedback
    const uid = id ?? phone;
    setCopiedPhone(uid);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header com voltar */}
      <div className="relative h-64 w-full">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <button
          onClick={() => router.back()}
          className="bg-background hover:bg-background/90 absolute top-5 left-5 z-10 rounded-full p-2"
          title="Voltar para a página anterior"
        >
          <ArrowLeft className="text-foreground h-6 w-6" />
        </button>
      </div>

      {/* Conteúdo */}
      <div className="space-y-6 p-5">
        {/* Info da barbearia */}
        <div className="space-y-4">
          <div>
            <h1 className="text-foreground text-2xl font-bold">
              {barbershop.name}
            </h1>
            <div className="text-muted-foreground mt-2 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <p className="text-sm">{barbershop.address}</p>
            </div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed">
            {barbershop.description}
          </p>
        </div>

        {/* Serviços */}
        <div className="space-y-4">
          <h2 className="text-foreground text-xs font-semibold uppercase">
            Serviços
          </h2>
          <div className="space-y-3">
            {barbershop.services.map((service, index) => (
              <ServiceItem
                key={service.id}
                service={service}
                isLast={index === barbershop.services.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Contatos (abaixo dos serviços, antes do footer) */}
      <div className="p-5">
        <div className="bg-card text-card-foreground rounded-xl p-4">
          <p className="text-foreground text-xs font-semibold uppercase">
            Contatos
          </p>
          <div className="mt-3 space-y-3">
            {barbershop.phones
              .map((entry) => {
                const matches = entry.match(/(\+?\d[\d ()\-]{4,}\d)/g);
                return matches ?? [entry];
              })
              .flat()
              .map((number, idx) => {
                const uid = `${number}::${idx}`;
                return (
                  <div
                    key={uid}
                    className="bg-background/0 flex items-center justify-between rounded-md px-2 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <Phone className="text-foreground/80 h-5 w-5" />
                      <span className="text-foreground text-sm">{number}</span>
                    </div>

                    <div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyPhone(number, uid)}
                        aria-label={`Copiar ${number}`}
                      >
                        {copiedPhone === uid ? "Copiado!" : "Copiar"}
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
