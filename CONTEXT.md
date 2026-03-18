# Project Callao - Nightclub & Reservations

## Overview
Callao es una discoteca premium ubicada en el Hotel Aristi, Cali. El sistema centraliza la presencia digital y la gestión de reservas mediante un mapa interactivo de mesas.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (Dark Theme focus)
- **Database & Auth:** Supabase (Auth nativo de Supabase)
- **ORM:** Drizzle ORM
- **Deployment:** Vercel

## Branding Colors
- **Primary:** #FE0000 (Crimson pulse)
- **Accent:** #BA0005 (Ruby flame)
- **Neutral:** #A7A3A2 (Gris)
- **Background:** #080503 (Negro)
- **Text:** #FFFFFF (Blanco)

## Core Features
### 1. Public Experience (One Page)
- **Landing Section:** Visuales de alto impacto (inspirados en Instagram @callao______).
- **Enterprise Reservation:** Formulario simple que valida datos y redirige a WhatsApp con un mensaje pre-formateado.
- **Table Reservation (Interactive):**
    - Selección de fecha, hora y número de personas.
    - Mapa de mesas (SVG/Canvas) que muestra disponibilidad en tiempo real.
    - Filtro de zonas dinámico: Las zonas se habilitan según la fecha (Control de aforo por día).
    - Formulario de datos con selector de país (Default: CO).

### 2. Admin Dashboard
- **Gestión de Reservas:** Lista de asistentes, estados (Confirmada, Cancelada, Finalizada).
- **Control de Inventario:** - Crear/Editar zonas y asignarles mesas.
    - Configurar qué zonas abren qué días de la semana.
    - Bloqueo manual de fechas especiales o franjas horarias.
- **Configuración:** Editar motivos de visita y textos de políticas legales.

## Database Schema Highlights
- `reservations`: Vincula cliente, mesa, fecha y motivo.
- `tables`: Almacena coordenadas (x, y) para el renderizado del mapa interactivo.
- `zones`: Define si una sección del local está disponible según el día del calendario.

## Implementation Rules
- Usar Server Components para fetching de datos siempre que sea posible.
- Validaciones de formularios con Zod.
- Manejo de estados del mapa interactivo con hooks de React para feedback inmediato.