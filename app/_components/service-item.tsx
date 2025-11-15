"use client";

import Image from "next/image";
import { Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface BarbershopService {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  priceInCents: number;
}

interface ServiceItemProps {
  service: BarbershopService;
  isLast?: boolean;
}

export default function ServiceItem({
  service,
  isLast = false,
}: ServiceItemProps) {
  const formatPrice = (priceInCents: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(priceInCents / 100);
  };

  return (
    <>
      <div className="flex gap-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="text-foreground font-semibold">{service.name}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <Badge>{formatPrice(service.priceInCents)}</Badge>
            <Button
              variant="default"
              size="sm"
              onClick={() => {}}
              className="gap-2"
            >
              <Clock className="h-4 w-4" />
              Reservar
            </Button>
          </div>
        </div>
      </div>
      {!isLast && <Separator className="my-4" />}
    </>
  );
}
