"use client";

import { useState } from "react";

import CallaoFooter from "@/components/callao-footer";
import CallaoHeader from "@/components/callao-header";
import HeroBanner from "@/components/hero-banner";
import InstagramFeedSection from "@/components/instagram-feed-section";
import MenuPreviewSection from "@/components/menu-preview-section";
import PastEventsTickets from "@/components/past-events-tickets";
import ReservationsModal from "@/components/reservations-modal";

export default function HomePage() {
  const [reservationsOpen, setReservationsOpen] = useState(false);

  return (
    <main>
      <CallaoHeader onReserve={() => setReservationsOpen(true)} />
      <HeroBanner onReserve={() => setReservationsOpen(true)} />

      <PastEventsTickets />

      <MenuPreviewSection />

      <InstagramFeedSection />

      <CallaoFooter />

      <ReservationsModal
        open={reservationsOpen}
        onClose={() => setReservationsOpen(false)}
      />
    </main>
  );
}

