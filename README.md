# 💻 Simulador de Carrera IT: De HelpDesk a Leyenda del Silicio

[![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg?logo=vite)](https://vitejs.dev/)
[![Version](https://img.shields.io/badge/version-v1.7-cyan.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

> Un juego interactivo de simulación, estrategia e **Idle RPG** donde comienzas como un humilde Técnico de Soporte L1 y escalas en la jerarquía corporativa tecnológica hasta convertirte en CTO & Leyenda del Silicio. Sobrevive a tareas críticas, gestiona tu cordura a base de café y sortea las implacables crisis de la **Ley de Murphy**.

---

## 🚀 Características Principales

### 📈 1. Sistema de Progresión y Roles Profesionales
Asciende a lo largo de 10 roles realistas con sus propias responsabilidades, escalas salariales y descripciones satíricas del mundo corporativo tecnológico:
1. **Técnico Informático**: *"¿Sopló el conector antes de llamarme?"*
2. **Analista Help Desk**: *"¿Ha intentado apagarlo y volverlo a encender?"*
3. **Tester Manual (QA)**: *"No es un bug, es una característica no documentada."*
4. **Administrador de Redes**: Cables espagueti, switches rebeldes y loops de broadcast.
5. **Administrador de Servidores (SysAdmin)**: Comandos de terminal, crontabs y sudo a las 3 AM.
6. **Desarrollador Frontend**: Centrar divs en CSS, Safari bugs y node_modules gigantes.
7. **Desarrollador Backend**: APIs REST, WebSockets, race conditions y validaciones defensivas.
8. **Administrador de Base de Datos (DBA)**: Índices compuestos, bloqueos deadlocks y pesadillas con DROP TABLE.
9. **Ingeniero DevOps**: Pipelines de CI/CD rotos, YAML indescifrables y clústeres de Kubernetes.
10. **Arquitecto de Software & Tech Lead**: Dibujar diagramas en Miro, debates monolito vs. microservicios y keynotes.

Cada rol cuenta con niveles de seniority (**Junior**, **Semi-Senior**, **Senior**) y requiere completar **50 tareas del rol** y alcanzar el XP objetivo para desbloquear la promoción.

---

### ⏱️ 2. Catálogo Extendido de Tareas por Rol y Seniority (5 a 60 Minutos)
El juego cuenta con más de **110 tareas especializadas** distribuidas estratégicamente en los 10 roles y en cada uno de los 3 niveles de seniority (**Junior**, **Semi-Senior**, **Senior**):
- **Nivel Junior**: Tareas de iniciación, novatadas y primeros auxilios informáticos (3-4 tareas por rol de 5m, 10m y 30m).
- **Nivel Semi-Senior**: Desafíos técnicos intermedios, rescates de servidores y refactorizaciones (3-4 tareas por rol de 5m, 10m, 30m y 60m con mayores recompensas y chatarra).
- **Nivel Senior**: Operaciones críticas de alta tensión, arquitectura, migraciones globales y contingencias (3 tareas maestras por rol de 10m, 30m y 60m con enormes recompensas en XP y sueldo).
- **Filtro Rápido por Seniority**: La vista principal permite filtrar fácilmente las tareas en *Todas*, *Junior*, *Semi-Senior* o *Senior*.

#### Tiempos Congruentes y Realistas:
- **Sprint Corto (5 min)**: Mantenimiento rápido, cambio de tóner, desatorar cables, pings de emergencia.
- **Sprint Medio (10 min)**: Configuración de routers, refactorización de componentes React, consultas SQL complejas.
- **Sprint Largo (30 min)**: Implementación de pipelines de Docker, resolución de incidentes, arquitectura DDD.
- **Maratón Crítico (60 min)**: Migraciones masivas de bases de datos, despliegues multi-cloud, recuperación de desastres.

#### Mecánicas de Aceleración:
- **Clic Activo (Rush / Apuro)**: Acelera la barra de progreso de una tarea activa (+15% por clic de base), pero **consume -2.0 de Cordura por clic** debido al agotamiento mental de apurarse.
- **Agotamiento por Crunch**: Acelerar impulsivamente sin descanso ni café puede reducir rápidamente tu cordura a 0 y detonar el temido **Burnout**.
- **Cancelación Segura**: Puedes cancelar tareas en ejecución si necesitas reordenar tus prioridades.

---

### 🧠 3. Sistema Dinámico de Cordura (Sanity) & Burnout
El bienestar mental es el recurso más valioso de un profesional de IT:
- **Fatiga por Aceleración (Crunch Time)**: Forzar el avance manual de tareas consume **-2.0 de cordura por clic** (mitigable con perks y certificaciones).
- **Desgaste Cognitivo Pasivo**: Cada tarea en ejecución genera un drenaje sostenido de **-0.15 cordura/segundo**.
- **Fatiga por Multitasking**: Ejecutar 2 o 3 tareas simultáneas gracias al *Monitor Ultrawide* acumula el drenaje de cordura.
- **Pausa de Descanso Pasiva**: Cuando no hay tareas activas, recuperas naturalmente **+0.35 cordura/segundo**.
- **¡BURNOUT TOTAL!**:
  - Si tu cordura llega a 0, caes en agotamiento extremo: la aceleración manual de tareas queda **totalmente bloqueada**, la velocidad de avance pasiva se reduce al **35%** y tus ingresos bajan al **25%**.
  - Para salir del Burnout, debes recuperar al menos un **25% de Cordura** descansando o mediante consumibles (café, siestas o pizza).
- **Indicador en Vivo**: La barra superior muestra en tiempo real tu tasa neta de recuperación o drenaje (ej. `+0.35/s` o `-0.15/s`).
- **Rubber Duck Debugger 🦆**: Haz clic en el pato de goma en cualquier momento para obtener **+0.5 de Cordura** instantánea por alivio antiestrés.

---

### 🏪 4. Tienda de Oficina, Mascotas y Certificaciones

| Categoría | Ítem | Efecto Principal |
| :--- | :--- | :--- |
| **Consumibles** | ☕ Café Expresso Doble | Recupera +15% de Cordura ($15) |
| **Consumibles** | 🍕 Pizza Fría de Delivery | Recupera +50% de Cordura ($45) |
| **Consumibles** | ⚡ Bebida Energizante Ultra | Recupera +80% de Cordura ($90) |
| **Consumibles** | 😴 Siesta bajo el Escritorio | Restaura 100% de Cordura ($160) |
| **Estación de Trabajo** | 🪑 Silla Ergonómica Lumbar | +0.10 de regeneración de cordura/seg por nivel |
| **Estación de Trabajo** | ⌨️ Teclado Mecánico RGB | +25% de velocidad al hacer clic en tareas |
| **Estación de Trabajo** | 🖥️ Monitor Ultrawide 49" | +1 ranura de tarea simultánea (hasta 3) |
| **Estación de Trabajo** | 🎧 Auriculares Noise-Cancelling | +20 de Cordura Máxima |
| **Estación de Trabajo** | 🍓 Granja de Raspberry Pi | Genera Chatarra Electrónica pasiva |
| **Mascotas** | 🦆 Pato de Goma | +8% XP en tareas y desahogo interactivo |
| **Mascotas** | 🐹 Hámster en Rueda de Servidor | +0.08 de regeneración de cordura/seg por nivel |
| **Mascotas** | 🌵 Cactus Indestructible | Reduce el costo de cordura de tareas en 10% |
| **Cursos** | 📘 Clean Code & Refactoring | +10% de XP por nivel |
| **Cursos** | ☁️ Certificación Cloud Architect | +40% de Sueldo pasivo y recompensas |
| **Cursos** | 📋 Certificado Scrum Master | Reduce el costo de cordura en 12% |
| **Cursos** | ⚡ Maestría en Vim & Linux | +30% velocidad de ejecución de tareas |

---

### ⚠️ 5. Crisis de la Ley de Murphy (12 Eventos Aleatorios)
Aproximadamente cada 2 minutos de juego activo, puede desencadenarse una emergencia tecnológica impredecible inspirada en desastres reales del mundo de la tecnología:
- 🚨 *¡Caída masiva de AWS US-EAST-1!*
- 👔 *¡Visita sorpresa del CEO con consultores!*
- ⏰ *Deploy a producción: Viernes 17:59.*
- 👶 *El trainee ejecutó un comando peligroso en el servidor.*
- ☕ *¡La cafetera central ha explotado!*
- 📅 *Reunión de 2 horas sin agenda ni objetivos.*
- ☣️ *Alerta de phishing y ransomware en el sector contable.*
- 🧯 **[NUEVO]** *¡Incendio en el rack de baterías (UPS)!*
- 💣 **[NUEVO]** *Certificado SSL wildcard expirado en producción.*
- 🤖 **[NUEVO]** *La IA alucinó y borró la tabla de usuarios.*
- ⚡ **[NUEVO]** *Inspección sorpresa de licencias de software de Microsoft.*
- 🌧️ **[NUEVO]** *Filtración de agua del aire acondicionado sobre el switch central.*

#### ⚖️ Rebalanceo de Probabilidades y Riesgo Táctico:
Las probabilidades de éxito han sido reajustadas con rigor para que las decisiones tengan verdadero peso e incertidumbre:
- Las opciones temerarias ofrecen enormes recompensas de XP, Sueldo y Chatarra con un éxito del ~40%-65%.
- Las soluciones de compromiso o diplomacia técnica rondan el ~68%-78% de éxito.
- Incluso las alternativas conservadoras o evasivas conllevan un riesgo real (~80%-84%) con desenlaces humorísticos en caso de fracaso.

---

### 💻 6. Minijuego de Terminal Linux Interactiva
Accede a una consola retro con comandos reales de UNIX para diagnosticar servidores:
- Comandos soportados: `ping`, `kill`, `chmod`, `rm -rf`, `curl`, `htop`, `ssh`, `clear`, `help`, entre otros.
- Supera los incidentes de la terminal para obtener **Chatarra Electrónica** y recuperar **Cordura**.

---

### 💤 7. Progresión Offline (Away From Keyboard)
El juego registra el tiempo transcurrido cuando cierras la pestaña o sales del navegador:
- Simula hasta **8 horas de trabajo offline**.
- Avanza el progreso de tus tareas activas.
- Acumula tu sueldo pasivo de acuerdo a tu rol actual y multiplicadores.
- Restaura la cordura de tu personaje para que regreses listo para el siguiente sprint.

---

### 🏆 8. Sistema de Logros y Estadísticas
- **12 Logros desbloqueables** con recompensas monetarias y de experiencia:
  - *Primer Clic*, *Adicto a la Cafeína*, *Superviviente del Viernes*, *Chatarrero Digital*, *Setup Soñado*, *Leyenda del Código*, y más.
- Panel completo de estadísticas globales: tiempo jugado, tareas completadas, clics totales, sueldo acumulado, quemaduras por burnout y crisis superadas.

---

### 💾 9. Guardado Local y Gestión de Partida
- **Autoguardado**: Persistencia continua en `localStorage`.
- **Exportar Partida**: Descarga un archivo JSON con tu progreso para hacer copias de respaldo o jugar en otra máquina.
- **Importar Partida**: Carga tu archivo JSON en cualquier momento.
- **Enlace al Repositorio Git**: Configurable desde la barra superior para vincular directamente al código fuente.

---

## 🛠️ Tecnologías Utilizadas

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Empaquetador**: [Vite 6](https://vitejs.dev/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Animaciones**: [Motion (Framer Motion)](https://motion.dev/)
- **Efectos Visuales**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Audio Engine**: Generación de audio procedural mediante **Web Audio API** nativa (sin archivos de audio pesados externos).

---

## 📦 Instalación y Ejecución Local

### Prerrequisitos
- [Node.js](https://nodejs.org/) v18.0 o superior
- [npm](https://www.npmjs.com/) v9.0 o superior (o pnpm / yarn)

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/simulador-carrera-it.git
cd simulador-carrera-it
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```
Abre tu navegador en `http://localhost:3000` para comenzar a jugar.

### 4. Compilar para producción
```bash
npm run build
```
Los archivos optimizados y estáticos se generarán en la carpeta `dist/`.

### 5. Verificación de tipos y linter
```bash
npm run lint
```

---

## 📂 Estructura del Proyecto

```text
├── public/                  # Favicons y assets públicos
├── src/
│   ├── components/          # Componentes de la interfaz de usuario
│   │   ├── AchievementsModal.tsx  # Modal de logros y trofeos
│   │   ├── Header.tsx             # Barra superior (roles, dinero, cordura, audio)
│   │   ├── MainGameView.tsx       # Vista principal (tareas, cafetería, pato)
│   │   ├── MurphyModal.tsx        # Diálogo de crisis de la Ley de Murphy
│   │   ├── OfflineModal.tsx       # Informe de bienvenida tras estar AFK
│   │   ├── RoleModal.tsx          # Árbol de carrera y requisitos de ascenso
│   │   ├── SettingsModal.tsx      # Configuración, import/export y reset
│   │   ├── ShopView.tsx           # Tienda de oficina, hardware y cursos
│   │   ├── StatsModal.tsx         # Panel de estadísticas acumuladas
│   │   └── TerminalMinigame.tsx   # Minijuego de consola interactiva
│   ├── context/
│   │   └── GameContext.tsx  # Estado global, bucle del juego (tick) y lógica
│   ├── data/
│   │   ├── achievementsData.ts    # Definición de logros
│   │   ├── murphyData.ts          # Eventos y elecciones de la Ley de Murphy
│   │   ├── rolesData.ts           # 7 roles, tareas de 5 a 60 min y lore
│   │   └── shopData.ts            # Consumibles, mejoras de oficina y cursos
│   ├── types/
│   │   └── game.ts          # Definiciones TypeScript de estados y entidades
│   ├── utils/
│   │   ├── sound.ts         # Sintetizador procedural con Web Audio API
│   │   ├── storage.ts       # Serialización y persistencia en LocalStorage
│   │   └── version.ts       # Constantes de versión de la aplicación
│   ├── App.tsx              # Componente raíz y navegación por pestañas
│   ├── index.css            # Configuración de Tailwind CSS v4
│   └── main.tsx             # Punto de entrada de React
├── metadata.json            # Metadatos de la aplicación
├── package.json             # Dependencias y scripts
├── tsconfig.json            # Configuración del compilador TypeScript
├── vite.config.ts           # Configuración de Vite
└── README.md                # Documentación del proyecto
```

---

## 📅 Historial de Versiones (Changelog)

### [v1.7] - 2026
- **Retiro de Mascota de Soporte (Gato Programador)**: Se retiró el "Gato Programador en el Teclado" del catálogo de mascotas de oficina y su efecto de autoclics por segundo, manteniendo en su categoría a las mascotas de soporte táctico (el Pato de Goma, el Hámster en Rueda y el Cactus Indestructible).
- **Incremento de Versión**: Proyecto y dependencias actualizados a `v1.7`.

### [v1.6] - 2026
- **Ajuste de Evento de Crisis a Inspección de Microsoft**: Se adaptó el evento de auditoría de licencias de software para reflejar una inspección directa de inspectores de Microsoft (revisión de licencias CAL de Windows Server, SQL Server y puestos de Office), manteniendo la hilarante defensa con software libre GNU/Linux.
- **Incremento de Versión**: Proyecto y dependencias actualizados a `v1.6`.

### [v1.5] - 2026
- **Bloqueo Estricto de Aceleración en Burnout**: Si el jugador agota su Cordura (0%) y entra en estado de Burnout, queda totalmente deshabilitada la aceleración manual de tareas hasta que consuma café o descanse. El botón visual de aceleración pasa a estado deshabilitado con mensaje explicativo y sonido de error.
- **Incremento de Versión**: Proyecto y dependencias actualizados a `v1.5`.

### [v1.4] - 2026
- **Unificación de Nomenclatura Profesional**: Reemplazadas todas las referencias a "becario" y "pasante" por la designación estándar de la industria IT "**trainee**" (en crisis de Murphy, tareas y descripciones).
- **Incremento de Versión**: Proyecto y dependencias actualizados a `v1.4`.

### [v1.3] - 2026
- **Ajuste Tipográfico y Corrección de Textos Cortados**: Se eliminaron las restricciones de truncamiento (`truncate`, `line-clamp-1` y `line-clamp-2`) en las tarjetas de tareas activas y del catálogo disponible, permitiendo que las descripciones y títulos completos se lean fluidamente con salto de línea natural y espaciado relajado.
- **Incremento de Versión**: Proyecto y dependencias actualizados a `v1.3`.

### [v1.2] - 2026
- **Ajuste de Probabilidades en Crisis de Murphy**: Se redujeron y calibraron las probabilidades de éxito de las decisiones (anteriormente muy indulgentes entre 85%-100%), creando un balance más tenso, impredecible y con riesgo real de fallo.
- **5 Nuevas Crisis Aleatorias de Murphy**: Se añadieron 5 incidentes catastróficos inspirados en el anecdotario informático (incendio de UPS, certificado SSL wildcard expirado, IA que borra usuarios, auditoría sorpresa de licencias de la BSA y goteras de aire acondicionado sobre el switch central), llevando el total a 12 emergencias únicas.
- **Consecuencias de Fracaso Específicas**: Cada opción de respuesta ahora incluye desenlaces satíricos y penalizaciones calculadas en cordura, sueldo y chatarra en caso de fallar la tirada de probabilidad.
- **Incremento de Versión**: Proyecto y dependencias actualizados a `v1.2`.

### [v1.1] - 2026
- **Expansión Masiva de Tareas**: Más de 110 tareas especializadas distribuidas entre los 10 roles y categorizadas por seniority (**Junior**, **Semi-Senior**, **Senior**).
- **Filtro Rápido por Seniority**: Selector de pestañas dinámico en la vista de trabajo para filtrar tareas por nivel con conteos en vivo.
- **Mecánica de Desgaste por Aceleración (Crunch Time)**: Acelerar tareas manualmente (+15% de progreso) ahora consume -2.0 de Cordura por clic, introduciendo riesgo táctico de Burnout.
- **Penalización por Burnout**: Al caer en Burnout, la velocidad de procesamiento de tareas y la ganancia de recursos se reduce severamente hasta recuperar la estabilidad mental.
- **Sincronización de Versión**: Indicadores visuales de versión (v1.1) visibles en la barra de pie de página y en el modal de configuración.

### [v1.0] - 2026
- **Lanzamiento Inicial**:
  - 10 roles profesionales de la industria IT con progresión y árboles de carrera.
  - Gestión de recursos vitales: Dinero, Cordura mental y Chatarra electrónica.
  - Eventos aleatorios interactivos de la **Ley de Murphy** con decisiones de riesgo/recompensa.
  - Tienda de consumibles, mejoras ergonómicas de oficina y cursos de formación técnica.
  - Minijuego de consola interactiva con comandos reales (`ping`, `curl`, `grep`, `fsck`, `vim`).
  - Efectos de sonido procedurales con Web Audio API y persistencia en LocalStorage con exportación JSON.

---

## 💡 Consejos de Estrategia para Desarrolladores

1. **No descuides tu Cordura**: Trabajar con 2 o 3 tareas simultáneas acelera tus ganancias, pero drenará tu barra mental rápidamente. Ten siempre a mano presupuesto para un *Café Expresso* o una *Pizza Fría*.
2. **Invierte pronto en Ergonomía**: Comprar los primeros niveles de la *Silla Ergonómica* compensa el desgaste pasivo de las tareas cortas.
3. **Acaricia al Pato**: Si te quedas sin dinero para café a mitad de un sprint largo, hacer clic repetido en el *Rubber Duck Debugger* te otorgará pequeños impulsos de cordura para evitar el Burnout.
4. **Resuelve la Terminal**: Jugar en el minijuego de terminal te entrega *Chatarra Electrónica*, la cual es necesaria para adquirir hardware especializado como los racks de Raspberry Pi y los cursos de Linux.
5. **No le temas a Murphy**: Algunas opciones arriesgadas en las crisis de Murphy pueden otorgar grandes sumas de XP y Chatarra si tu personaje tiene buena suerte.

---

## 📄 Licencia

Este proyecto está bajo la Licencia [MIT](LICENSE). Siéntete libre de clonarlo, modificarlo, mejorarlo o desplegarlo en tu plataforma favorita.

---

*Hecho con ☕, insomnio y pasión por el desarrollo de software.*
