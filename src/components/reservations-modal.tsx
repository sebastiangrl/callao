"use client";

import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  Clock3,
  CreditCard,
  LayoutGrid,
  UserRound
} from "lucide-react";

import BtnCallao from "./btn-callao";

type ReservationType = "publico" | "empresarial";

type ReservationsModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ReservationsModal({
  open,
  onClose
}: ReservationsModalProps) {
  const [step, setStep] = useState(1);
  const [reservationType, setReservationType] = useState<
    ReservationType | null
  >(null);
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [selectedZoneId, setSelectedZoneId] = useState<number | null>(null);
  const [selectedZoneLabel, setSelectedZoneLabel] = useState<string>("");
  const [peopleCount, setPeopleCount] = useState<number>(0);

  // Reset suave cuando se abre/cierra.
  useEffect(() => {
    if (!open) return;
    setStep(1);
    setReservationType(null);
    setDateValue("");
    setTimeValue("");
    setSelectedZoneId(null);
    setSelectedZoneLabel("");
    setPeopleCount(0);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Evitamos hooks (como useMemo) antes/después de un early return.
  // stepItems no depende del estado, por eso es una constante normal.
  const stepItems = [
    { num: 1, title: "Tipo de Reserva", Icon: CalendarDays },
    { num: 2, title: "Sección de mesas", Icon: LayoutGrid },
    { num: 3, title: "Datos personales", Icon: UserRound },
    { num: 4, title: "Pago", Icon: CreditCard }
  ];

  // Overlay de zonas (demo). Luego se podrá mapear con coordinates_json desde DB.
  const mapZones = [
    { id: 6, label: "6", left: "14%", top: "62%", width: "16%", height: "12%" },
    { id: 7, label: "7", left: "38%", top: "58%", width: "16%", height: "12%" },
    { id: 8, label: "8", left: "62%", top: "58%", width: "16%", height: "12%" },
    { id: 9, label: "9", left: "78%", top: "44%", width: "12%", height: "10%" },
    { id: 10, label: "10", left: "58%", top: "74%", width: "16%", height: "12%" }
  ];

  const canContinueStep2 =
    reservationType === "publico" &&
    selectedZoneId !== null &&
    peopleCount > 0;

  const dateRef = useRef<HTMLInputElement | null>(null);
  const timeRef = useRef<HTMLInputElement | null>(null);

  const openNativePicker = (
    ref: React.RefObject<HTMLInputElement | null>
  ) => {
    const el = ref.current;
    if (!el) return;
    // `showPicker()` no está soportado al 100% en todos los navegadores, por eso fallback.
    const maybeShowPicker = (el as any).showPicker as undefined | (() => void);
    if (maybeShowPicker) {
      maybeShowPicker.call(el);
      return;
    }
    el.focus();
    el.click();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onMouseDown={(e) => {
        // Cerrar al click fuera del modal.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="flex h-[850px] w-[1240px] max-w-[95vw] flex-col items-center gap-8 overflow-hidden rounded-none bg-[rgba(6,6,6,0.85)] px-[24px] pt-[48px] pb-[32px] text-white"
        role="dialog"
        aria-modal="true"
      >
        {/* Top bar */}
        <div className="relative w-full">
          <h2 className="text-center text-3xl font-semibold">Reservas</h2>
          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="absolute right-2 top-2 text-2xl leading-none text-white/80 hover:text-white"
          >
            ×
          </button>
        </div>

        {/* Step-by-step */}
        <div className="w-full">
          {/* Mobile: solo step actual + barra de progreso */}
          <div className="sm:hidden px-2">
            {(() => {
              const activeItem = stepItems[step - 1] ?? stepItems[0];
              const progress = (step / stepItems.length) * 100;
              const ActiveIcon = activeItem.Icon;

              return (
                <div className="w-full">
                  <div className="mt-1 h-1 w-full bg-white/15">
                    <div
                      className="h-1 bg-white"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/30">
                      <ActiveIcon className="h-5 w-5 text-white" />
                    </div>

                    <div className="flex flex-col">
                      <div className="text-[11px] font-semibold tracking-wide text-white">
                        Paso {activeItem.num}
                      </div>
                      <div className="mt-1 text-sm text-white/80">
                        {activeItem.title}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Desktop: header completo (como está ahora) */}
          <div className="hidden sm:block">
            <div className="flex flex-nowrap items-center justify-center gap-6 overflow-x-auto">
              {stepItems.map((item, idx) => {
                const isActive = item.num === step;
                const isDone = item.num < step;
                const Divider = idx !== stepItems.length - 1;

                return (
                  <div
                    key={item.num}
                    className="flex flex-row items-center gap-6"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={[
                          "flex h-12 w-12 shrink-0 items-center justify-center border",
                          isActive
                            ? "border-white bg-white/10"
                            : isDone
                              ? "border-white/70 bg-white/10"
                              : "border-white/30 bg-white/5",
                          "rounded-none"
                        ].join(" ")}
                      >
                        <item.Icon className="h-5 w-5 text-white" />
                      </div>

                      <div className="flex flex-col">
                        <div
                          className={[
                            "text-[11px] font-semibold tracking-wide",
                            isActive ? "text-white" : "text-white/70"
                          ].join(" ")}
                        >
                          Paso {item.num}
                        </div>
                        <div
                          className={[
                            "mt-1 text-sm",
                            isActive ? "text-white" : "text-white/70"
                          ].join(" ")}
                        >
                          {item.title}
                        </div>
                      </div>
                    </div>

                    {Divider && <div className="h-12 w-px bg-white/15" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step content area (centrado verticalmente) */}
        <div className="flex flex-1 w-full items-center justify-center">
          {step === 1 && (
            <div className="mx-auto flex w-full max-w-[760px] flex-col items-center gap-10">
              <div className="w-full">
                <div className="flex w-full flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-12">
                  {/* Fecha */}
                  <div className="flex w-full justify-center sm:max-w-[520px]">
                    <div className="w-full">
                      <label className="mb-2 block text-left text-xs font-medium text-white/80">
                        Fecha de la reserva
                      </label>

                      <div className="flex items-center gap-3 border-b border-white/70 pb-2 focus-within:border-white">
                        <input
                          ref={dateRef}
                          type="date"
                          value={dateValue}
                          onChange={(e) => setDateValue(e.target.value)}
                          className="w-full bg-transparent border-0 px-0 py-1 text-sm text-white placeholder:text-white/30 outline-none appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0"
                        />
                        <button
                          type="button"
                          aria-label="Abrir selector de fecha"
                          className="flex h-8 w-8 shrink-0 items-center justify-center text-white/90 hover:text-white"
                          onClick={() => openNativePicker(dateRef)}
                        >
                          <CalendarDays className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="mt-2 text-[11px] text-white/60">
                        Formato: DD/MM/AAAA
                      </div>
                    </div>
                  </div>

                  {/* Hora */}
                  <div className="flex w-full justify-center sm:max-w-[420px]">
                    <div className="w-full">
                      <label className="mb-2 block text-left text-xs font-medium text-white/80">
                        Hora
                      </label>

                      <div className="flex items-center gap-3 border-b border-white/70 pb-2 focus-within:border-white">
                        <input
                          ref={timeRef}
                          type="time"
                          value={timeValue}
                          onChange={(e) => setTimeValue(e.target.value)}
                          className="w-full bg-transparent border-0 px-0 py-1 text-sm text-white placeholder:text-white/30 outline-none appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0"
                        />
                        <button
                          type="button"
                          aria-label="Abrir selector de hora"
                          className="flex h-8 w-8 shrink-0 items-center justify-center text-white/90 hover:text-white"
                          onClick={() => openNativePicker(timeRef)}
                        >
                          <Clock3 className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="mt-2 text-[11px] text-white/60">
                        Formato: HH:MM
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-2 flex w-full max-w-[520px] flex-col items-center gap-4 sm:mx-auto sm:flex-row sm:justify-center sm:gap-6">
                <BtnCallao
                  type="button"
                  className={[
                    "w-full sm:w-auto",
                    reservationType === "publico"
                      ? "bg-white text-[#080503]"
                      : ""
                  ].join(" ")}
                  onClick={() => {
                    setReservationType("publico");
                    setSelectedZoneId(null);
                    setSelectedZoneLabel("");
                    setPeopleCount(0);
                    setStep(2);
                  }}
                >
                  Todo Público
                </BtnCallao>

                <BtnCallao
                  type="button"
                  className={[
                    "w-full sm:w-auto",
                    reservationType === "empresarial"
                      ? "bg-white text-[#080503]"
                      : ""
                  ].join(" ")}
                  onClick={() => {
                    setReservationType("empresarial");
                    setSelectedZoneId(null);
                    setSelectedZoneLabel("");
                    setPeopleCount(0);
                    setStep(1);
                  }}
                >
                  Evento Empresarial
                </BtnCallao>
              </div>
            </div>
          )}

          {step === 2 && reservationType === "publico" && (
            <div className="mx-auto flex h-full min-h-0 w-full max-w-[1180px] flex-col gap-6 px-2">
              {/* Columna superior (1 sola linea) con fecha/hora del Step 1 */}
              <div className="grid w-full grid-cols-2 items-center gap-4 px-4 py-3">
                <div className="min-w-0 bg-[rgba(255,255,255,0.30)] px-4 py-2 text-sm font-medium text-white/90">
                  <span className="whitespace-nowrap">Fecha:</span>{" "}
                  <span className="whitespace-nowrap text-white truncate inline-block max-w-[170px]">
                    {dateValue || "—"}
                  </span>
                </div>
                <div className="min-w-0 bg-[rgba(255,255,255,0.30)] px-4 py-2 text-right text-sm font-medium text-white/90">
                  <span className="whitespace-nowrap">Hora:</span>{" "}
                  <span className="whitespace-nowrap text-white truncate inline-block max-w-[170px]">
                    {timeValue || "—"}
                  </span>
                </div>
              </div>

              <div className="min-h-0 grid w-full grid-cols-1 gap-6 lg:grid-cols-2 lg:justify-items-center">
                {/* Mapa */}
                {/* Aspect ratio ajustado al mapa para evitar que se recorte */}
                  <div className="relative mx-auto w-full max-w-[360px] overflow-hidden bg-black aspect-[414/517]">
                  <img
                    src="/mock/mapa.png"
                    alt="Mapa zonas"
                      className="absolute inset-0 h-full w-full object-contain select-none"
                    draggable={false}
                  />

                  {/* Overlay clickable zones */}
                  <div className="absolute inset-0">
                    {mapZones.map((z) => {
                      const selected = selectedZoneId === z.id;
                      return (
                        <button
                          key={z.id}
                          type="button"
                          aria-label={`Seleccionar Zona ${z.label}`}
                          onClick={() => {
                            setSelectedZoneId(z.id);
                            setSelectedZoneLabel(
                              `Zona ${z.label} seleccionada`
                            );
                            setPeopleCount(0);
                          }}
                          className={[
                            "absolute border border-white/30 bg-transparent transition-colors",
                            selected ? "bg-white/10 border-white/80" : "",
                            "rounded-none"
                          ].join(" ")}
                          style={{
                            left: z.left,
                            top: z.top,
                            width: z.width,
                            height: z.height
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Info panel */}
                <div className="flex min-h-0 w-full flex-col gap-6">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-white/90">
                      {selectedZoneId ? selectedZoneLabel : "Espacio seleccionado"}
                    </div>
                    {!selectedZoneId && (
                      <div className="mt-1 text-base text-white/60">
                        Ningún espacio seleccionado
                      </div>
                    )}
                  </div>

                  <div className="w-full">
                    <label className="mb-2 block text-xs font-medium text-white/80">
                      Cantidad de personas
                    </label>

                    <div
                      className={[
                        "flex items-center gap-3 border-b border-white/70 pb-2 focus-within:border-white",
                        !selectedZoneId ? "opacity-50" : ""
                      ].join(" ")}
                    >
                      <input
                        type="number"
                        min={0}
                        step={1}
                        disabled={!selectedZoneId}
                        value={peopleCount}
                        onChange={(e) => setPeopleCount(Number(e.target.value))}
                        className="w-full bg-transparent border-0 px-0 py-1 text-sm text-white placeholder:text-white/30 outline-none appearance-none disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="mt-auto flex w-full justify-center">
                    <button
                      type="button"
                      disabled={!canContinueStep2}
                      onClick={() => setStep(3)}
                      className={[
                        "inline-flex items-center justify-center border border-white bg-transparent px-10 py-3 text-sm font-medium text-white",
                        "rounded-none transition-colors duration-200",
                        "hover:bg-white hover:text-[#080503]",
                        !canContinueStep2 ? "cursor-not-allowed opacity-50" : ""
                      ].join(" ")}
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && reservationType === "publico" && (
            <div className="mx-auto w-full max-w-[760px] px-2 text-center text-white/70">
              Paso 3 (próximamente)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

