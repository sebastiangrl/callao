# Feed de Instagram en Next.js — Configuración y checklist para el cliente

Guía para integrar un **feed automático** (últimas publicaciones) usando la **API oficial de Meta** con **Next.js** (App Router), y qué necesitas **pedir o acordar con el dueño** de la cuenta de Instagram.

---

## 1. Qué pedirle al cliente (dueño de Instagram)

Pásale esta lista y que confirme o complete cada punto.

### Cuenta y estructura (obligatorio para la API oficial)

| Requisito | Por qué |
|-----------|---------|
| **Instagram en modo Profesional** (Cuenta de empresa o Creador) | La API de contenido del negocio no funciona con cuentas personales. |
| **Página de Facebook** vinculada a esa cuenta de Instagram | Meta exige la relación Instagram ↔ Página para identificar el “activo” del negocio. |
| **Permisos de administrador** (o colaboración acordada) | Alguien con rol suficiente en la **Página de Facebook** y acceso al **Instagram vinculado** debe poder: crear/autorizar la app de Meta, o iniciar sesión una vez en el flujo OAuth que vos implementes. |

### Acceso operativo (elegí una estrategia y dejalo por escrito)

- **Opción A — El cliente hace el “login con Facebook” una vez:** Vos generás la URL de autorización; el cliente entra con su Facebook (dueño de la Página), acepta permisos; vos guardás el token en servidor (ideal con cifrado o almacén seguro).
- **Opción B — Acceso temporal al Business Manager / Meta Business Suite:** Solo si el flujo de trabajo lo requiere (menos recomendable; mejor OAuth con el cliente presente).

### Datos que te tiene que facilitar (sin contraseñas)

- **Usuario de Instagram** (nombre visible o @).
- Confirmación de que la **Página de Facebook** que aparece en Meta Business es la correcta y está **conectada** a ese Instagram (Configuración de Instagram en la Página).
- **Correo de contacto** para avisos si Meta pide revisión de la app o re-autorización.

### Lo que **no** debes pedir (ni guardar)

- Contraseña de Instagram o Facebook.
- Token de acceso copiado por WhatsApp sin cifrar a largo plazo. Los tokens se obtienen por OAuth y se renuevan en **servidor**.

### Expectativas (para evitar malentendidos)

- La web mostrará lo que la API devuelva (normalmente medios recientes). **No es un clon pixel-perfect de la app Instagram.**
- Si Instagram o Meta cambian políticas, puede hacer falta **volver a autorizar** la app en algún momento.
- Si la app necesita **App Review** de Meta para uso público amplio, el cliente puede tener que dar información o acceso de prueba según lo que pida Meta.

---

## 2. Tu parte: configuración en Meta (resumen)

1. Entrá a [Meta for Developers](https://developers.facebook.com/) con una cuenta de Facebook.
2. **Crear una app** (tipo adecuado según el flujo que uses: muchas integraciones usan “Business” o el tipo que Meta indique para acceso a Instagram con Facebook Login).
3. Añadí el producto **Instagram** (y/o **Facebook Login** según la documentación vigente para obtener tokens de la Página / Instagram).
4. Anotá **App ID** y **App Secret** (el secreto solo en variables de entorno en el servidor, nunca en el cliente).
5. Configurá **OAuth Redirect URIs** con la URL exacta de tu ruta de callback en Next.js (ej. `https://tudominio.com/api/auth/instagram/callback` y la equivalente en `localhost` para desarrollo).
6. Solicitá los **permisos** que exija la documentación actual para leer medios de la cuenta de Instagram conectada a la Página (los nombres exactos cambian; seguí la guía oficial de “Instagram API with Instagram Login” o “Graph API” según el producto que elijas).

> **Importante:** Los pasos exactos y los nombres de permisos los confirma siempre la [documentación oficial de Meta](https://developers.facebook.com/docs/instagram-api/), porque actualizan frecuentemente.

---

## 3. Tu parte: Next.js (enfoque recomendado)

### Principios

- **Nunca** expongas `App Secret` ni tokens largos en el navegador.
- Las llamadas a `graph.facebook.com` / Instagram Graph API deben hacerse desde **Route Handlers** (`app/api/.../route.ts`), **Server Actions** con cuidado, o un backend aparte.
- Implementá **renovación de token** (tokens de larga duración y endpoint de extensión según Meta) para que el feed siga siendo automático meses después.

### Variables de entorno típicas (ejemplo)

Solo servidor: **no** uses el prefijo `NEXT_PUBLIC_` para secretos.

```
META_APP_ID=
META_APP_SECRET=
META_REDIRECT_URI=https://tudominio.com/api/auth/instagram/callback
```

Tras el primer OAuth, guardá el token de forma segura (base de datos cifrada, secrets del hosting, etc.). En desarrollo a veces se usa `.env` local; en producción conviene un gestor de secretos o tabla segura, no un token suelto en el repo.

### Flujo mínimo lógico

1. **Ruta de “inicio de login”** → redirige al OAuth de Meta con `client_id`, `redirect_uri`, `scope`.
2. **Ruta de callback** → recibe `code`, intercambiás por token en servidor, guardás token (y opcionalmente refresh / long-lived).
3. **Ruta de datos del feed** (ej. `GET /api/instagram/feed`) → con el token en servidor, llamás a la API de Meta, devolvés JSON con URLs de imagen/video, permalink, caption truncado, etc.
4. **Componente React** → `fetch` a tu propia API (misma origen) y renderizás grid o carrusel. Opcional: `revalidate` en fetch o cache con TTL para no golpear la API en cada request.

### Caché y límites

- Usá **revalidación** (ISR) o caché en memoria/edge con TTL de pocos minutos para no superar límites de la API y para que la web no sea lenta.
- Tratá errores de token expirado: log + aviso para re-ejecutar OAuth con el cliente.

---

## 4. ¿Queda automático después de la configuración inicial?

| Automático | Manual / excepcional |
|------------|----------------------|
| Nuevas publicaciones en Instagram aparecen cuando tu servidor vuelve a consultar la API. | Primera autorización OAuth y, si falla, re-autorización. |
| Renovación del token si implementaste el flujo de extensión que indica Meta. | Cambios en la app Meta, revocación de permisos, o cambios de contraseña/configuración que invaliden sesiones. |
| Actualización de la UI al recargar o al vencer la caché. | App Review si Meta lo exige para tu caso de uso. |

---

## 5. Checklist rápido antes de programar

- [ ] Instagram del cliente es **Profesional** y está **vinculado** a una **Página de Facebook**.
- [ ] El cliente sabe que hará **un inicio de sesión con Facebook** (o equivalente Meta) **una vez** para autorizar la app.
- [ ] Tenés **App ID**, **App Secret** y **redirect URI** configurados en el panel de Meta.
- [ ] Tenés plan para **guardar y renovar** el token solo en servidor.
- [ ] Revisaste la documentación actual de Meta para permisos y endpoints de medios.

---

## 6. Enlaces útiles (oficiales)

- [Meta for Developers](https://developers.facebook.com/)
- [Documentación Instagram API](https://developers.facebook.com/docs/instagram-api/)

Cuando implementes el código, alineá permisos y URLs con la guía vigente; este documento es una **guía operativa** para equipo y cliente, no sustituye la documentación de Meta.
