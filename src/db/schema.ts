import { integer, jsonb, pgTable, serial, text, varchar, date, index } from "drizzle-orm/pg-core";

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

// Coordenadas para dibujar mesas (estructura flexible; se valida desde la app).
export type Coordinates = Record<string, unknown>;

export const zones = pgTable(
  "zones",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 120 }).notNull(),
    description: text("description"),
    // 0-6 (Domingo a Sábado). Se guarda en JSON para flexibilidad.
    active_weekdays: jsonb("active_weekdays").notNull().$type<Weekday[]>(),
    min_capacity: integer("min_capacity").notNull()
  }
);

export const tables = pgTable(
  "tables",
  {
    id: serial("id").primaryKey(),
    zone_id: integer("zone_id")
      .notNull()
      .references(() => zones.id, { onDelete: "cascade" }),
    table_number: integer("table_number").notNull(),
    capacity: integer("capacity").notNull(),
    status: varchar("status", { length: 32 }).notNull().default("available"),
    coordinates_json: jsonb("coordinates_json").notNull().$type<Coordinates>()
  },
  (t) => ({
    zone_table_number_idx: index("tables_zone_table_number_idx").on(
      t.zone_id,
      t.table_number
    )
  })
);

export const visit_reasons = pgTable("visit_reasons", {
  id: serial("id").primaryKey(),
  label: varchar("label", { length: 120 }).notNull()
});

export const reservations = pgTable(
  "reservations",
  {
    id: serial("id").primaryKey(),
    customer_name: varchar("customer_name", { length: 160 }).notNull(),
    phone: varchar("phone", { length: 32 }).notNull(),
    date: date("date").notNull(),
    time_slot: varchar("time_slot", { length: 32 }).notNull(),
    table_id: integer("table_id")
      .notNull()
      .references(() => tables.id, { onDelete: "cascade" }),
    people_count: integer("people_count").notNull(),
    reason_id: integer("reason_id")
      .notNull()
      .references(() => visit_reasons.id, { onDelete: "restrict" }),
    status: varchar("status", { length: 32 }).notNull().default("pending"),
    comments: text("comments")
  },
  (t) => ({
    reservations_date_slot_idx: index("reservations_date_slot_idx").on(
      t.date,
      t.time_slot
    ),
    reservations_table_slot_idx: index("reservations_table_slot_idx").on(
      t.table_id,
      t.date,
      t.time_slot
    )
  })
);

export const settings = pgTable("settings", {
  key: varchar("key", { length: 80 }).primaryKey(),
  value: text("value").notNull()
});

