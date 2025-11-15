import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import BarbershopPageClient from "./client";

interface BarbershopPageProps {
  params: Promise<{ id: string }>;
}

export default async function BarbershopPage(props: BarbershopPageProps) {
  const { id } = await props.params;

  const barbershop = await prisma.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    notFound();
  }

  return <BarbershopPageClient barbershop={barbershop} />;
}
