"use client";

import { useState } from "react";

import CallaoHeader from "@/components/callao-header";
import HeroBanner from "@/components/hero-banner";
import ReservationsModal from "@/components/reservations-modal";

export default function HomePage() {
  const [reservationsOpen, setReservationsOpen] = useState(false);

  return (
    <main>
      <CallaoHeader />
      <HeroBanner onReserve={() => setReservationsOpen(true)} />

      <ReservationsModal
        open={reservationsOpen}
        onClose={() => setReservationsOpen(false)}
      />
    </main>
  );
}

