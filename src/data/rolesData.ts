import { RoleDefinition } from '../types/game';

export const ROLES_DATA: RoleDefinition[] = [
  /* ==========================================================================
     ROL 1: TÉCNICO INFORMÁTICO (HARDWARE & SOPORTE FÍSICO)
     ========================================================================== */
  {
    id: 1,
    title: 'Técnico Informático',
    department: 'Soporte de Software & Hardware',
    icon: 'Wrench',
    description: 'El guardián del hardware. Tu trabajo consiste en limpiar disqueteras, desenredar cables y revivir PCs que estaban dadas por muertas.',
    minSalary: 100,
    maxSalary: 250,
    unlockXP: 10000,
    requiredTasks: 50,
    color: '#38bdf8', // Sky Blue
    lore: [
      '“¿Sopló el conector antes de llamarme?”',
      'El 90% de los problemas se solucionan pateando suavemente la torre.',
      'El polvo en la fuente de poder podría formar una nueva civilización.'
    ],
    tasks: [
      // --- NIVEL JUNIOR ---
      {
        id: 'tech-1',
        title: 'Arqueología de Teclados',
        description: 'Extraer restos fósiles de papas fritas y clips atascados entre las teclas WASD.',
        durationSeconds: 300, // 5 min
        baseXP: 120,
        baseSalaryReward: 80,
        baseSanityCost: 6,
        scrapChance: 0.75,
        minScrap: 2,
        maxScrap: 5,
        iconName: 'Keyboard'
      },
      {
        id: 'tech-j1',
        title: 'El Enchufe de la Zapatilla Mágica',
        description: 'Verificar si la zapatilla eléctrica está enchufada a la pared o a sí misma en un bucle infinito.',
        durationSeconds: 300, // 5 min
        baseXP: 130,
        baseSalaryReward: 90,
        baseSanityCost: 5,
        scrapChance: 0.70,
        minScrap: 2,
        maxScrap: 4,
        iconName: 'Zap'
      },
      {
        id: 'tech-2',
        title: 'Exorcismo de Impresora',
        description: 'La impresora láser huele el miedo. Tienes que convencerla de que no hay atasco de papel fantasma.',
        durationSeconds: 600, // 10 min
        baseXP: 240,
        baseSalaryReward: 160,
        baseSanityCost: 12,
        scrapChance: 0.85,
        minScrap: 4,
        maxScrap: 8,
        iconName: 'Printer'
      },
      {
        id: 'tech-j2',
        title: 'Limpieza de Pelusa Termonuclear',
        description: 'Abrir una torre de oficina abandonada y cambiar pasta térmica petrificada desde 2011.',
        durationSeconds: 1800, // 30 min
        baseXP: 680,
        baseSalaryReward: 460,
        baseSanityCost: 22,
        scrapChance: 0.90,
        minScrap: 6,
        maxScrap: 14,
        iconName: 'Cpu'
      },

      // --- NIVEL SEMI-SENIOR ---
      {
        id: 'tech-s1',
        title: 'Diagnóstico por Olor a Quemado',
        description: 'Olfatear la fuente de poder genérica para identificar cuál capacitor explotó primero.',
        durationSeconds: 300, // 5 min
        baseXP: 210,
        baseSalaryReward: 150,
        baseSanityCost: 8,
        scrapChance: 0.85,
        minScrap: 3,
        maxScrap: 7,
        iconName: 'Flame',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'tech-4',
        title: 'Cambio de Toner en Camisa Blanca',
        description: 'Una operación de precisión quirúrgica para no terminar como minero de carbón.',
        durationSeconds: 600, // 10 min
        baseXP: 380,
        baseSalaryReward: 260,
        baseSanityCost: 14,
        scrapChance: 0.95,
        minScrap: 5,
        maxScrap: 10,
        iconName: 'Sparkles',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'tech-3',
        title: 'Terapia de Choque / Formateo Masivo',
        description: 'Windows 98 con 47 barras de búsqueda en Internet Explorer. Formateo e instalación limpia.',
        durationSeconds: 1800, // 30 min
        baseXP: 850,
        baseSalaryReward: 620,
        baseSanityCost: 24,
        scrapChance: 0.95,
        minScrap: 8,
        maxScrap: 16,
        iconName: 'HardDrive',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'tech-s2',
        title: 'Clonación Forense de Disco Ruidoso',
        description: 'Rescatar los datos del disco mecánico del director que hace ruidos como licuadora.',
        durationSeconds: 3600, // 60 min
        baseXP: 1900,
        baseSalaryReward: 1400,
        baseSanityCost: 35,
        scrapChance: 0.95,
        minScrap: 14,
        maxScrap: 28,
        iconName: 'Save',
        requiredSeniority: 'Semi-Senior'
      },

      // --- NIVEL SENIOR ---
      {
        id: 'tech-sr1',
        title: 'Modding y Tuning de Flujo Térmico',
        description: 'Instalar 6 ventiladores de levitación magnética y ajustar curvas de disipación silenciosa.',
        durationSeconds: 600, // 10 min
        baseXP: 550,
        baseSalaryReward: 420,
        baseSanityCost: 16,
        scrapChance: 0.90,
        minScrap: 7,
        maxScrap: 14,
        iconName: 'Wind',
        requiredSeniority: 'Senior'
      },
      {
        id: 'tech-sr2',
        title: 'Despliegue Masivo por Red PXE',
        description: 'Instalar sistemas operativos simultáneamente en 80 terminales del call center sin tocar un pendrive.',
        durationSeconds: 1800, // 30 min
        baseXP: 1350,
        baseSalaryReward: 1050,
        baseSanityCost: 28,
        scrapChance: 0.95,
        minScrap: 12,
        maxScrap: 24,
        iconName: 'Layers',
        requiredSeniority: 'Senior'
      },
      {
        id: 'tech-sr3',
        title: 'Micro-soldadura en Placa Madre',
        description: 'Reemplazar capacitores de estado sólido y reparar pistas cortadas con microscopio binocular.',
        durationSeconds: 3600, // 60 min
        baseXP: 2800,
        baseSalaryReward: 2200,
        baseSanityCost: 40,
        scrapChance: 1.0,
        minScrap: 20,
        maxScrap: 40,
        iconName: 'Activity',
        requiredSeniority: 'Senior'
      }
    ]
  },

  /* ==========================================================================
     ROL 2: ANALISTA HELP DESK (MESA DE AYUDA)
     ========================================================================== */
  {
    id: 2,
    title: 'Analista Help Desk',
    department: 'Mesa de Ayuda & Atención a Usuarios',
    icon: 'Headphones',
    description: 'La primera línea de defensa psicológica. Escuchas llantos, quejas sobre la taza de café en la bandeja de CD y preguntas existenciales.',
    minSalary: 250,
    maxSalary: 500,
    unlockXP: 18000,
    requiredTasks: 50,
    color: '#34d399', // Emerald
    lore: [
      '“¿Ha intentado apagarlo y volverlo a encender?”',
      'La tecla Any no existe en ningún teclado conocido por la humanidad.',
      'El usuario jura que no tocó nada.'
    ],
    tasks: [
      // --- NIVEL JUNIOR ---
      {
        id: 'hd-1',
        title: 'La Búsqueda de la Tecla "Any"',
        description: 'Explicarle al usuario que presione cualquier tecla física y no busque la palabra ANY.',
        durationSeconds: 300, // 5 min
        baseXP: 160,
        baseSalaryReward: 120,
        baseSanityCost: 7,
        scrapChance: 0.6,
        minScrap: 2,
        maxScrap: 5,
        iconName: 'HelpCircle'
      },
      {
        id: 'hd-j1',
        title: 'El Posavasos Retráctil (Lector CD)',
        description: 'Explicar con diplomacia que la bandeja de la lectora no está diseñada para tazas térmicas.',
        durationSeconds: 300, // 5 min
        baseXP: 170,
        baseSalaryReward: 130,
        baseSanityCost: 6,
        scrapChance: 0.65,
        minScrap: 2,
        maxScrap: 6,
        iconName: 'Coffee'
      },
      {
        id: 'hd-2',
        title: 'El Traductor de Gritos',
        description: 'Decodificar un correo en mayúsculas con 18 signos de exclamación para entender que se desconectó el mouse.',
        durationSeconds: 600, // 10 min
        baseXP: 320,
        baseSalaryReward: 240,
        baseSanityCost: 13,
        scrapChance: 0.7,
        minScrap: 4,
        maxScrap: 8,
        iconName: 'MessageSquare'
      },
      {
        id: 'hd-j2',
        title: 'Caminar 4 Pisos por un Cable HDMI',
        description: 'El monitor "no da video". Subir corriendo cuatro pisos para empujar el cable 2 milímetros.',
        durationSeconds: 1800, // 30 min
        baseXP: 920,
        baseSalaryReward: 680,
        baseSanityCost: 24,
        scrapChance: 0.75,
        minScrap: 7,
        maxScrap: 14,
        iconName: 'Navigation'
      },

      // --- NIVEL SEMI-SENIOR ---
      {
        id: 'hd-s1',
        title: 'Cerrar Ticket por Inactividad',
        description: 'El arte zen de esperar pacientemente 72 horas sin respuesta del usuario para cerrar el ticket con honor.',
        durationSeconds: 300, // 5 min
        baseXP: 260,
        baseSalaryReward: 190,
        baseSanityCost: 8,
        scrapChance: 0.75,
        minScrap: 4,
        maxScrap: 7,
        iconName: 'CheckSquare',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'hd-s2',
        title: 'Desactivar Bloqueo de Mayúsculas al VIP',
        description: 'El gerente jura que su cuenta está hackeada porque el Caps Lock está activado.',
        durationSeconds: 600, // 10 min
        baseXP: 480,
        baseSalaryReward: 360,
        baseSanityCost: 16,
        scrapChance: 0.80,
        minScrap: 5,
        maxScrap: 10,
        iconName: 'Key',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'hd-3',
        title: 'Resetear Password por 5ta Vez Hoy',
        description: 'El usuario insistió en que su contraseña "123456" era inviolable hasta que la olvidó tras el almuerzo.',
        durationSeconds: 1800, // 30 min
        baseXP: 1000,
        baseSalaryReward: 750,
        baseSanityCost: 25,
        scrapChance: 0.8,
        minScrap: 8,
        maxScrap: 16,
        iconName: 'ShieldAlert',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'hd-4',
        title: 'Ticket Fantasma de Prioridad 1',
        description: 'Cerrar un ticket urgente cuyo único contenido es "ayuda por favor" sin captura de pantalla.',
        durationSeconds: 3600, // 60 min
        baseXP: 2200,
        baseSalaryReward: 1600,
        baseSanityCost: 36,
        scrapChance: 0.9,
        minScrap: 14,
        maxScrap: 28,
        iconName: 'AlertTriangle',
        requiredSeniority: 'Semi-Senior'
      },

      // --- NIVEL SENIOR ---
      {
        id: 'hd-sr1',
        title: 'Mediación Diplomática con Dirección',
        description: 'Calmar a toda la junta directiva durante una caída no programada de Teams.',
        durationSeconds: 600, // 10 min
        baseXP: 680,
        baseSalaryReward: 520,
        baseSanityCost: 18,
        scrapChance: 0.85,
        minScrap: 7,
        maxScrap: 14,
        iconName: 'Smile',
        requiredSeniority: 'Senior'
      },
      {
        id: 'hd-sr2',
        title: 'Manual de FAQ Definitivo (Con Dibujitos)',
        description: 'Redactar una base de conocimientos visual que reduzca los tickets repetitivos en un 40%.',
        durationSeconds: 1800, // 30 min
        baseXP: 1650,
        baseSalaryReward: 1300,
        baseSanityCost: 29,
        scrapChance: 0.90,
        minScrap: 12,
        maxScrap: 24,
        iconName: 'BookOpen',
        requiredSeniority: 'Senior'
      },
      {
        id: 'hd-sr3',
        title: 'Comité de Crisis por Caída de Correo',
        description: 'Atender 300 llamadas consecutivas manteniendo una compostura de monje tibetano.',
        durationSeconds: 3600, // 60 min
        baseXP: 3400,
        baseSalaryReward: 2600,
        baseSanityCost: 42,
        scrapChance: 0.95,
        minScrap: 18,
        maxScrap: 36,
        iconName: 'Mail',
        requiredSeniority: 'Senior'
      }
    ]
  },

  /* ==========================================================================
     ROL 3: TESTER MANUAL (QA / CONTROL DE CALIDAD)
     ========================================================================== */
  {
    id: 3,
    title: 'Tester Manual (QA)',
    department: 'Control de Calidad & Caos Creativo',
    icon: 'Bug',
    description: 'Un programador entra a un bar. Pide una cerveza. Pide 0 cervezas. Pide 9999999 cervezas. Pide un lagarto. Pide -1 cervezas. Tu misión es romper todo.',
    minSalary: 500,
    maxSalary: 1200,
    unlockXP: 28000,
    requiredTasks: 50,
    color: '#a78bfa', // Purple
    lore: [
      '“No es un bug, es una característica no documentada.”',
      'Hice clic en el botón 700 veces por segundo hasta que la BD explotó.',
      'Si funciona a la primera, sospecha de inmediato.'
    ],
    tasks: [
      // --- NIVEL JUNIOR ---
      {
        id: 'qa-1',
        title: 'El Clic Destructor',
        description: 'Hacer doble clic frenético en el botón de "Pagar" para ver si duplica los cargos bancarios.',
        durationSeconds: 300, // 5 min
        baseXP: 220,
        baseSalaryReward: 160,
        baseSanityCost: 8,
        scrapChance: 0.55,
        minScrap: 3,
        maxScrap: 6,
        iconName: 'MousePointer'
      },
      {
        id: 'qa-j1',
        title: 'Ataque de Caracteres Emoji',
        description: 'Pegar 500 emojis de fueguito en el campo de código postal para comprobar si la vista colapsa.',
        durationSeconds: 300, // 5 min
        baseXP: 230,
        baseSalaryReward: 170,
        baseSanityCost: 7,
        scrapChance: 0.60,
        minScrap: 3,
        maxScrap: 6,
        iconName: 'Smile'
      },
      {
        id: 'qa-2',
        title: 'El Simulador de Vuelo / Spoofing',
        description: 'Inyectar caracteres cirílicos en el formulario de registro y verificar el código de error.',
        durationSeconds: 600, // 10 min
        baseXP: 450,
        baseSalaryReward: 340,
        baseSanityCost: 15,
        scrapChance: 0.7,
        minScrap: 5,
        maxScrap: 10,
        iconName: 'Zap'
      },
      {
        id: 'qa-j2',
        title: 'Prueba de Estrés Humana (50 Pestañas)',
        description: 'Abrir 50 pestañas de Chrome a la vez para comprobar la sincronización del carrito de compras.',
        durationSeconds: 1800, // 30 min
        baseXP: 1250,
        baseSalaryReward: 950,
        baseSanityCost: 24,
        scrapChance: 0.75,
        minScrap: 8,
        maxScrap: 16,
        iconName: 'Layers'
      },

      // --- NIVEL SEMI-SENIOR ---
      {
        id: 'qa-s1',
        title: 'Copiar la Biblia en un Textarea',
        description: 'Pegar el Génesis entero en el campo de "Comentarios breves" para provocar un overflow.',
        durationSeconds: 300, // 5 min
        baseXP: 320,
        baseSalaryReward: 240,
        baseSanityCost: 10,
        scrapChance: 0.75,
        minScrap: 4,
        maxScrap: 8,
        iconName: 'FileText',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'qa-s2',
        title: 'Caza de Regresiones en Release Final',
        description: 'Confirmar si el arreglo de la barra de búsqueda rompió el checkout por enésima vez.',
        durationSeconds: 600, // 10 min
        baseXP: 680,
        baseSalaryReward: 520,
        baseSanityCost: 18,
        scrapChance: 0.80,
        minScrap: 6,
        maxScrap: 12,
        iconName: 'Search',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'qa-3',
        title: 'Reportar Botón con 1px de Desfase',
        description: 'Redactar un informe de 12 páginas con gifs en cámara lenta mostrando el desalineamiento en Firefox móvil.',
        durationSeconds: 1800, // 30 min
        baseXP: 1400,
        baseSalaryReward: 1050,
        baseSanityCost: 26,
        scrapChance: 0.8,
        minScrap: 8,
        maxScrap: 16,
        iconName: 'Eye',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'qa-4',
        title: 'Bug en Vivo Durante la Demo del CEO',
        description: 'El bug que nunca apareció en 6 meses de testing decide debutar en la presentación a inversionistas.',
        durationSeconds: 3600, // 60 min
        baseXP: 3000,
        baseSalaryReward: 2200,
        baseSanityCost: 40,
        scrapChance: 0.9,
        minScrap: 16,
        maxScrap: 32,
        iconName: 'Flame',
        requiredSeniority: 'Semi-Senior'
      },

      // --- NIVEL SENIOR ---
      {
        id: 'qa-sr1',
        title: 'Matriz de Caos en Transacciones Críticas',
        description: 'Cortar la conexión de red en el microsegundo exacto en que la pasarela de pago procesa el token.',
        durationSeconds: 600, // 10 min
        baseXP: 950,
        baseSalaryReward: 750,
        baseSanityCost: 20,
        scrapChance: 0.85,
        minScrap: 8,
        maxScrap: 16,
        iconName: 'Shuffle',
        requiredSeniority: 'Senior'
      },
      {
        id: 'qa-sr2',
        title: 'Suite de Pruebas E2E Automatizadas',
        description: 'Programar robots en Playwright para que ataquen la plataforma 24/7 y atrapen bugs nocturnos.',
        durationSeconds: 1800, // 30 min
        baseXP: 2200,
        baseSalaryReward: 1700,
        baseSanityCost: 32,
        scrapChance: 0.92,
        minScrap: 14,
        maxScrap: 28,
        iconName: 'Cpu',
        requiredSeniority: 'Senior'
      },
      {
        id: 'qa-sr3',
        title: 'Auditoría y Certificación de Release',
        description: 'Estampar tu firma de aprobación para el pase a producción, asumiendo la gloria o el abismo.',
        durationSeconds: 3600, // 60 min
        baseXP: 4500,
        baseSalaryReward: 3500,
        baseSanityCost: 46,
        scrapChance: 0.98,
        minScrap: 22,
        maxScrap: 44,
        iconName: 'CheckCircle',
        requiredSeniority: 'Senior'
      }
    ]
  },

  /* ==========================================================================
     ROL 4: ADMINISTRADOR DE REDES (TELECOMUNICACIONES)
     ========================================================================== */
  {
    id: 4,
    title: 'Administrador de Redes',
    department: 'Infraestructura & Telecomunicaciones',
    icon: 'Network',
    description: 'Vives en el rack de servidores a 16°C. Si el Wi-Fi parpadea 2 segundos, 500 personas te miran como si hubieras apagado el sol.',
    minSalary: 500,
    maxSalary: 1200,
    unlockXP: 40000,
    requiredTasks: 50,
    color: '#f59e0b', // Amber
    lore: [
      '“Siempre es el DNS. Cuando no es el DNS, era el firewall bloqueando el DNS.”',
      'Un loop de red puede derribar un edificio corporativo en 12 milisegundos.',
      'El rack parece un plato de tallarines con salsa boloñesa.'
    ],
    tasks: [
      // --- NIVEL JUNIOR ---
      {
        id: 'net-1',
        title: 'El Laberinto de Espagueti',
        description: 'Tirar de un cable azul pensando que es del router y apagar el switch central de contabilidad.',
        durationSeconds: 300, // 5 min
        baseXP: 280,
        baseSalaryReward: 220,
        baseSanityCost: 9,
        scrapChance: 0.8,
        minScrap: 3,
        maxScrap: 7,
        iconName: 'GitBranch'
      },
      {
        id: 'net-j1',
        title: 'Ping de la Esperanza (8.8.8.8)',
        description: 'Mirar fijamente la consola rogando que no salga "Request timed out" mientras reinicias el módem.',
        durationSeconds: 300, // 5 min
        baseXP: 300,
        baseSalaryReward: 240,
        baseSanityCost: 8,
        scrapChance: 0.75,
        minScrap: 3,
        maxScrap: 7,
        iconName: 'Radio'
      },
      {
        id: 'net-2',
        title: 'Crimpar Cable RJ45 a Ciegas',
        description: 'Blanco-Naranja, Naranja, Blanco-Verde, Azul... y que la patita de plástico no se rompa al entrar.',
        durationSeconds: 600, // 10 min
        baseXP: 600,
        baseSalaryReward: 460,
        baseSanityCost: 16,
        scrapChance: 0.85,
        minScrap: 6,
        maxScrap: 12,
        iconName: 'Sliders'
      },
      {
        id: 'net-j2',
        title: 'Mapeo del Switch Olvidado',
        description: 'Descubrir qué oficina está conectada al misterioso puerto 24 etiquetado con cinta de papel de 2008.',
        durationSeconds: 1800, // 30 min
        baseXP: 1600,
        baseSalaryReward: 1200,
        baseSanityCost: 26,
        scrapChance: 0.88,
        minScrap: 9,
        maxScrap: 18,
        iconName: 'Server'
      },

      // --- NIVEL SEMI-SENIOR ---
      {
        id: 'net-s1',
        title: 'Expulsar Dispositivo Vampiro de Wi-Fi',
        description: 'Descubrir la Smart TV del guardia nocturno que está transmitiendo 4K y devorando el ancho de banda.',
        durationSeconds: 300, // 5 min
        baseXP: 420,
        baseSalaryReward: 320,
        baseSanityCost: 11,
        scrapChance: 0.85,
        minScrap: 5,
        maxScrap: 9,
        iconName: 'WifiOff',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'net-s2',
        title: 'Aislamiento de VLAN para Invitados',
        description: 'Configurar 802.1Q para que los clientes no puedan explorar la base de datos de sueldos.',
        durationSeconds: 600, // 10 min
        baseXP: 880,
        baseSalaryReward: 680,
        baseSanityCost: 19,
        scrapChance: 0.88,
        minScrap: 7,
        maxScrap: 14,
        iconName: 'Shield',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'net-3',
        title: 'Caza del Router Clandestino',
        description: 'Descubrir el repetidor Wi-Fi TP-Link de $10 que ventas escondió detrás de la cafetera.',
        durationSeconds: 1800, // 30 min
        baseXP: 1800,
        baseSalaryReward: 1400,
        baseSanityCost: 28,
        scrapChance: 0.9,
        minScrap: 10,
        maxScrap: 20,
        iconName: 'Radio',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'net-4',
        title: 'El Loop Mortal de Red',
        description: 'Alguien conectó los dos extremos de un cable de red al mismo switch y creó una tormenta de broadcast masiva.',
        durationSeconds: 3600, // 60 min
        baseXP: 3800,
        baseSalaryReward: 2900,
        baseSanityCost: 42,
        scrapChance: 0.95,
        minScrap: 18,
        maxScrap: 36,
        iconName: 'RefreshCw',
        requiredSeniority: 'Semi-Senior'
      },

      // --- NIVEL SENIOR ---
      {
        id: 'net-sr1',
        title: 'Renegociación BGP por Corte de Fibra',
        description: 'Reenrutar el tráfico de 3 países en tiempo real tras la rotura de un cable submarino.',
        durationSeconds: 600, // 10 min
        baseXP: 1200,
        baseSalaryReward: 950,
        baseSanityCost: 22,
        scrapChance: 0.92,
        minScrap: 9,
        maxScrap: 18,
        iconName: 'Globe',
        requiredSeniority: 'Senior'
      },
      {
        id: 'net-sr2',
        title: 'Sustitución de Switch Core sin Caída',
        description: 'Maniobra a corazón abierto en el rack central transfiriendo enlaces troncales de 40 Gbps.',
        durationSeconds: 1800, // 30 min
        baseXP: 2900,
        baseSalaryReward: 2250,
        baseSanityCost: 35,
        scrapChance: 0.95,
        minScrap: 15,
        maxScrap: 30,
        iconName: 'Activity',
        requiredSeniority: 'Senior'
      },
      {
        id: 'net-sr3',
        title: 'Infraestructura Mesh para Convención Anual',
        description: 'Desplegar 40 puntos de acceso de alta densidad para sostener 3000 laptops simultáneas sin latencia.',
        durationSeconds: 3600, // 60 min
        baseXP: 5800,
        baseSalaryReward: 4600,
        baseSanityCost: 48,
        scrapChance: 1.0,
        minScrap: 24,
        maxScrap: 48,
        iconName: 'Wifi',
        requiredSeniority: 'Senior'
      }
    ]
  },

  /* ==========================================================================
     ROL 5: ADMINISTRADOR DE SISTEMAS (SYSADMIN & LINUX OPS)
     ========================================================================== */
  {
    id: 5,
    title: 'Administrador de Servidores',
    department: 'SysAdmin & Linux Ops',
    icon: 'Server',
    description: 'Los dioses de la terminal negra. Escribes comandos crípticos en Bash mientras rezas para que el disco RAID no empiece a sonar como helicóptero.',
    minSalary: 1200,
    maxSalary: 3500,
    unlockXP: 55000,
    requiredTasks: 50,
    color: '#06b6d4', // Cyan
    lore: [
      '“`sudo rm -rf /*` nunca es una solución recomendable.”',
      'Uptime: 1428 días. Nadie sabe qué corre en ese servidor pero si se apaga quiebra la empresa.',
      'El ventilador de 10.000 RPM es tu ruido blanco para dormir.'
    ],
    tasks: [
      // --- NIVEL JUNIOR ---
      {
        id: 'sys-1',
        title: 'Sudor Frío a las 3 AM',
        description: 'El bot de monitoreo envió 90 mensajes seguidos: el CPU está al 100% y la swap se agotó.',
        durationSeconds: 300, // 5 min
        baseXP: 360,
        baseSalaryReward: 280,
        baseSanityCost: 10,
        scrapChance: 0.7,
        minScrap: 4,
        maxScrap: 8,
        iconName: 'Moon'
      },
      {
        id: 'sys-j1',
        title: 'El Log que Llenó el Disco al 100%',
        description: 'Descubrir un `/var/log/syslog` de 450 Gigabytes generado por un driver que no encontraba la disquetera.',
        durationSeconds: 300, // 5 min
        baseXP: 390,
        baseSalaryReward: 310,
        baseSanityCost: 9,
        scrapChance: 0.72,
        minScrap: 4,
        maxScrap: 9,
        iconName: 'HardDrive'
      },
      {
        id: 'sys-2',
        title: 'Lectura de Runas Antiguas (Bash)',
        description: 'Descifrar un script de 300 líneas escrito por un SysAdmin que renunció en el año 2004.',
        durationSeconds: 600, // 10 min
        baseXP: 750,
        baseSalaryReward: 600,
        baseSanityCost: 18,
        scrapChance: 0.75,
        minScrap: 6,
        maxScrap: 12,
        iconName: 'Terminal'
      },
      {
        id: 'sys-j2',
        title: 'El Enigma de los 5 Asteriscos de Crontab',
        description: 'Ajustar la tarea programada para que corra los domingos y no cada milisegundo colapsando el servidor.',
        durationSeconds: 1800, // 30 min
        baseXP: 1950,
        baseSalaryReward: 1550,
        baseSanityCost: 26,
        scrapChance: 0.82,
        minScrap: 10,
        maxScrap: 20,
        iconName: 'Clock'
      },

      // --- NIVEL SEMI-SENIOR ---
      {
        id: 'sys-s1',
        title: 'Cacería con `kill -9`',
        description: 'Identificar y fulminar procesos zombi desbocados que se rehúsan a liberar memoria compartida.',
        durationSeconds: 300, // 5 min
        baseXP: 520,
        baseSalaryReward: 410,
        baseSanityCost: 12,
        scrapChance: 0.80,
        minScrap: 5,
        maxScrap: 10,
        iconName: 'Skull',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'sys-s2',
        title: 'Certificado SSL a 15 Minutos de Vencer',
        description: 'Renovar las llaves y certificados del servidor antes de que aparezca la temida pantalla roja de advertencia.',
        durationSeconds: 600, // 10 min
        baseXP: 1100,
        baseSalaryReward: 880,
        baseSanityCost: 20,
        scrapChance: 0.82,
        minScrap: 8,
        maxScrap: 16,
        iconName: 'Lock',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'sys-3',
        title: 'Rescate de Servidor Zombie',
        description: 'Servidor Windows Server 2003 con telarañas que aloja el sistema de nómina principal.',
        durationSeconds: 1800, // 30 min
        baseXP: 2300,
        baseSalaryReward: 1800,
        baseSanityCost: 30,
        scrapChance: 0.85,
        minScrap: 12,
        maxScrap: 22,
        iconName: 'Cpu',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'sys-4',
        title: 'Reconstrucción de RAID en Degradado',
        description: 'Un disco falló y el segundo está haciendo ruidos metálicos sospechosos mientras sincroniza.',
        durationSeconds: 3600, // 60 min
        baseXP: 5000,
        baseSalaryReward: 3800,
        baseSanityCost: 46,
        scrapChance: 0.95,
        minScrap: 20,
        maxScrap: 40,
        iconName: 'Database',
        requiredSeniority: 'Semi-Senior'
      },

      // --- NIVEL SENIOR ---
      {
        id: 'sys-sr1',
        title: 'Parche Zero-Day en Kernel sin Reiniciar',
        description: 'Aplicar live-patching con kpatch a 150 servidores de producción en plena hora pico de operaciones.',
        durationSeconds: 600, // 10 min
        baseXP: 1550,
        baseSalaryReward: 1250,
        baseSanityCost: 24,
        scrapChance: 0.90,
        minScrap: 11,
        maxScrap: 22,
        iconName: 'ShieldCheck',
        requiredSeniority: 'Senior'
      },
      {
        id: 'sys-sr2',
        title: 'Cluster de Alta Disponibilidad (Corosync/Pacemaker)',
        description: 'Configurar failover automático por IP flotante para tolerancia a fallas de hardware instantánea.',
        durationSeconds: 1800, // 30 min
        baseXP: 3700,
        baseSalaryReward: 2900,
        baseSanityCost: 36,
        scrapChance: 0.92,
        minScrap: 16,
        maxScrap: 32,
        iconName: 'Server',
        requiredSeniority: 'Senior'
      },
      {
        id: 'sys-sr3',
        title: 'Plan de Desastre ante Falla del Data Center',
        description: 'Levantar toda la infraestructura corporativa en el datacenter secundario tras corte general de energía.',
        durationSeconds: 3600, // 60 min
        baseXP: 7500,
        baseSalaryReward: 5900,
        baseSanityCost: 52,
        scrapChance: 1.0,
        minScrap: 25,
        maxScrap: 50,
        iconName: 'Flame',
        requiredSeniority: 'Senior'
      }
    ]
  },

  /* ==========================================================================
     ROL 6: DESARROLLADOR FRONTEND (UI/UX)
     ========================================================================== */
  {
    id: 6,
    title: 'Desarrollador Frontend',
    department: 'Ingeniería de Software (UI/UX)',
    icon: 'Layout',
    description: 'El artesano del DOM. Luchas contra el desfase de Safari, frameworks que cambian de versión cada martes y el eterno dilema de cómo centrar un div.',
    minSalary: 1200,
    maxSalary: 3500,
    unlockXP: 75000,
    requiredTasks: 50,
    color: '#ec4899', // Pink
    lore: [
      '“Funciona en mi Chrome. En Safari se ve como un collage cubista.”',
      'node_modules pesa más que el telescopio espacial James Webb.',
      'El cliente pidió que el botón fuera más interactivo y tuviera purpurina.'
    ],
    tasks: [
      // --- NIVEL JUNIOR ---
      {
        id: 'fe-1',
        title: 'El Santo Grial: Centrar un Div',
        description: 'Intentar flexbox, grid, margin: auto, translate(-50%, -50%) hasta que quede en el medio.',
        durationSeconds: 300, // 5 min
        baseXP: 450,
        baseSalaryReward: 360,
        baseSanityCost: 10,
        scrapChance: 0.55,
        minScrap: 3,
        maxScrap: 7,
        iconName: 'AlignCenter'
      },
      {
        id: 'fe-j1',
        title: 'La Tipografía Alemana que Rompe el Botón',
        description: 'Soportar palabras de 42 letras como "Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz".',
        durationSeconds: 300, // 5 min
        baseXP: 480,
        baseSalaryReward: 390,
        baseSanityCost: 9,
        scrapChance: 0.60,
        minScrap: 4,
        maxScrap: 8,
        iconName: 'Type'
      },
      {
        id: 'fe-2',
        title: 'Acrobacias Móviles (Safari Bug)',
        description: 'La barra de navegación flotante desaparece detrás del teclado virtual solo en iPhones dorados.',
        durationSeconds: 600, // 10 min
        baseXP: 950,
        baseSalaryReward: 750,
        baseSanityCost: 18,
        scrapChance: 0.65,
        minScrap: 6,
        maxScrap: 12,
        iconName: 'Smartphone'
      },
      {
        id: 'fe-j2',
        title: 'Modo Oscuro sin Quemar la Retina',
        description: 'Invertir paletas de colores asegurando que los logos con fondo blanco no se vean como estampitas.',
        durationSeconds: 1800, // 30 min
        baseXP: 2400,
        baseSalaryReward: 1900,
        baseSanityCost: 28,
        scrapChance: 0.70,
        minScrap: 10,
        maxScrap: 20,
        iconName: 'Moon'
      },

      // --- NIVEL SEMI-SENIOR ---
      {
        id: 'fe-s1',
        title: 'Bucle Infinito en useEffect',
        description: 'Detener el re-render desbocado que calentó la laptop del usuario hasta poder cocinar un huevo.',
        durationSeconds: 300, // 5 min
        baseXP: 680,
        baseSalaryReward: 540,
        baseSanityCost: 12,
        scrapChance: 0.75,
        minScrap: 5,
        maxScrap: 10,
        iconName: 'RefreshCw',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'fe-s2',
        title: 'Rescate de Imágenes Gigantes de Marketing',
        description: 'Comprimir banners de 28MB subidos en PNG a WebP responsivo para salvar el tiempo de carga.',
        durationSeconds: 600, // 10 min
        baseXP: 1400,
        baseSalaryReward: 1100,
        baseSanityCost: 20,
        scrapChance: 0.78,
        minScrap: 8,
        maxScrap: 16,
        iconName: 'Image',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'fe-3',
        title: 'Actualizar 47 Dependencias de NPM',
        description: 'Una advertencia de vulnerabilidad crítica en un paquete que solo redondeaba esquinas.',
        durationSeconds: 1800, // 30 min
        baseXP: 2900,
        baseSalaryReward: 2300,
        baseSanityCost: 32,
        scrapChance: 0.75,
        minScrap: 12,
        maxScrap: 24,
        iconName: 'Package',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'fe-4',
        title: 'Pixel Perfect contra Figma a las 18:00',
        description: 'Diseño descubrió que el padding izquierdo tiene 15px en vez de 16px en la vista tablet.',
        durationSeconds: 3600, // 60 min
        baseXP: 6200,
        baseSalaryReward: 4800,
        baseSanityCost: 48,
        scrapChance: 0.85,
        minScrap: 20,
        maxScrap: 40,
        iconName: 'Layers',
        requiredSeniority: 'Semi-Senior'
      },

      // --- NIVEL SENIOR ---
      {
        id: 'fe-sr1',
        title: 'Orquestación de Microfrontends',
        description: 'Configurar Module Federation en Webpack/Vite para combinar 4 aplicaciones en un solo portal.',
        durationSeconds: 600, // 10 min
        baseXP: 1950,
        baseSalaryReward: 1550,
        baseSanityCost: 24,
        scrapChance: 0.88,
        minScrap: 12,
        maxScrap: 24,
        iconName: 'Grid',
        requiredSeniority: 'Senior'
      },
      {
        id: 'fe-sr2',
        title: 'Design System Accesible (WCAG AAA)',
        description: 'Crear la biblioteca de componentes corporativos con navegación por teclado y contraste matemáticamente perfecto.',
        durationSeconds: 1800, // 30 min
        baseXP: 4500,
        baseSalaryReward: 3500,
        baseSanityCost: 38,
        scrapChance: 0.90,
        minScrap: 18,
        maxScrap: 36,
        iconName: 'Palette',
        requiredSeniority: 'Senior'
      },
      {
        id: 'fe-sr3',
        title: 'Puntaje 100/100 en Google Lighthouse',
        description: 'Optimizar Core Web Vitals (LCP, FID, CLS) hasta dejar la gráfica en verde fosforescente absoluto.',
        durationSeconds: 3600, // 60 min
        baseXP: 9200,
        baseSalaryReward: 7200,
        baseSanityCost: 52,
        scrapChance: 0.98,
        minScrap: 26,
        maxScrap: 52,
        iconName: 'Award',
        requiredSeniority: 'Senior'
      }
    ]
  },

  /* ==========================================================================
     ROL 7: DESARROLLADOR BACKEND (APIS & CORE)
     ========================================================================== */
  {
    id: 7,
    title: 'Desarrollador Backend',
    department: 'Ingeniería de Software (APIs & Core)',
    icon: 'Code2',
    description: 'Construyes las tuberías invisibles que sostienen el mundo digital. Tu hábitat son los endpoints REST, WebSockets y race conditions que solo ocurren en producción.',
    minSalary: 1200,
    maxSalary: 3500,
    unlockXP: 100000,
    requiredTasks: 50,
    color: '#8b5cf6', // Violet
    lore: [
      '“El frontend me mandó un string en un campo booleano y quemó el microservicio.”',
      'No hay nada más permanente que un parche temporal con un comentario `// TODO: fix later 2017`.',
      '200 OK pero con `{ error: true }` en el body.'
    ],
    tasks: [
      // --- NIVEL JUNIOR ---
      {
        id: 'be-1',
        title: 'Escudo Deflector contra el Frontend',
        description: 'Validar y sanitizar 90 campos de entrada antes de que un payload malformado tumbe el server.',
        durationSeconds: 300, // 5 min
        baseXP: 550,
        baseSalaryReward: 450,
        baseSanityCost: 11,
        scrapChance: 0.65,
        minScrap: 4,
        maxScrap: 8,
        iconName: 'ShieldCheck'
      },
      {
        id: 'be-j1',
        title: 'El Laberinto de Fechas y Timezones',
        description: 'Arreglar transacciones que se registraban ayer porque el servidor estaba en UTC y el cliente en Tokio.',
        durationSeconds: 300, // 5 min
        baseXP: 580,
        baseSalaryReward: 470,
        baseSanityCost: 10,
        scrapChance: 0.68,
        minScrap: 4,
        maxScrap: 9,
        iconName: 'Clock'
      },
      {
        id: 'be-2',
        title: 'Arqueología de Código Legado',
        description: 'Una función de 800 líneas llamada `processDataFinal_v2_DEFINITIVO()` sin un solo test.',
        durationSeconds: 600, // 10 min
        baseXP: 1200,
        baseSalaryReward: 950,
        baseSanityCost: 20,
        scrapChance: 0.7,
        minScrap: 6,
        maxScrap: 12,
        iconName: 'FileCode'
      },
      {
        id: 'be-j2',
        title: 'CRUD Expreso con Validaciones Zod',
        description: 'Construir el backend completo de un nuevo módulo con paginación, filtros y ordenamiento.',
        durationSeconds: 1800, // 30 min
        baseXP: 2900,
        baseSalaryReward: 2300,
        baseSanityCost: 30,
        scrapChance: 0.75,
        minScrap: 10,
        maxScrap: 20,
        iconName: 'Database'
      },

      // --- NIVEL SEMI-SENIOR ---
      {
        id: 'be-s1',
        title: 'Frenar Ataque de Fuerza Bruta (Rate Limiting)',
        description: 'Configurar limitador de peticiones en Redis para frenar un bot que probaba 5000 contraseñas por segundo.',
        durationSeconds: 300, // 5 min
        baseXP: 820,
        baseSalaryReward: 650,
        baseSanityCost: 13,
        scrapChance: 0.78,
        minScrap: 6,
        maxScrap: 12,
        iconName: 'ShieldAlert',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'be-s2',
        title: 'Colas Asíncronas con Redis y BullMQ',
        description: 'Desacoplar el envío de emails lentos para que la API vuelva a responder en menos de 18ms.',
        durationSeconds: 600, // 10 min
        baseXP: 1750,
        baseSalaryReward: 1400,
        baseSanityCost: 22,
        scrapChance: 0.80,
        minScrap: 8,
        maxScrap: 16,
        iconName: 'ListOrdered',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'be-3',
        title: 'Caza de la Race Condition Fantasma',
        description: 'El saldo del usuario se duplicó solo cuando dos pagos entraron en el mismo microsegundo.',
        durationSeconds: 1800, // 30 min
        baseXP: 3600,
        baseSalaryReward: 2800,
        baseSanityCost: 34,
        scrapChance: 0.8,
        minScrap: 12,
        maxScrap: 24,
        iconName: 'Activity',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'be-4',
        title: 'Microservicio Monstruoso sin Documentar',
        description: 'Reescribir un endpoint en Go que procesaba 50k transacciones por segundo con fugas de memoria.',
        durationSeconds: 3600, // 60 min
        baseXP: 7800,
        baseSalaryReward: 6000,
        baseSanityCost: 50,
        scrapChance: 0.9,
        minScrap: 22,
        maxScrap: 44,
        iconName: 'Cpu',
        requiredSeniority: 'Semi-Senior'
      },

      // --- NIVEL SENIOR ---
      {
        id: 'be-sr1',
        title: 'Arquitectura Hexagonal & DDD Puro',
        description: 'Blindar el núcleo del negocio desacoplándolo por completo de frameworks y bases de datos.',
        durationSeconds: 600, // 10 min
        baseXP: 2400,
        baseSalaryReward: 1900,
        baseSanityCost: 25,
        scrapChance: 0.88,
        minScrap: 12,
        maxScrap: 24,
        iconName: 'Box',
        requiredSeniority: 'Senior'
      },
      {
        id: 'be-sr2',
        title: 'Transmisión de Eventos con Apache Kafka',
        description: 'Procesar un flujo de 100.000 eventos por segundo con particionamiento y garantías idempotentes.',
        durationSeconds: 1800, // 30 min
        baseXP: 5500,
        baseSalaryReward: 4300,
        baseSanityCost: 40,
        scrapChance: 0.92,
        minScrap: 18,
        maxScrap: 36,
        iconName: 'Zap',
        requiredSeniority: 'Senior'
      },
      {
        id: 'be-sr3',
        title: 'Separación del Monolito a Microservicios',
        description: 'Cortar el monolito histórico en 8 servicios independientes sin interrumpir el flujo comercial.',
        durationSeconds: 3600, // 60 min
        baseXP: 11000,
        baseSalaryReward: 8600,
        baseSanityCost: 55,
        scrapChance: 0.98,
        minScrap: 28,
        maxScrap: 56,
        iconName: 'Network',
        requiredSeniority: 'Senior'
      }
    ]
  },

  /* ==========================================================================
     ROL 8: ADMINISTRADOR DE BASE DE DATOS (DBA)
     ========================================================================== */
  {
    id: 8,
    title: 'Administrador de Base de Datos (DBA)',
    department: 'Gestión de Datos & Rendimiento SQL',
    icon: 'Database',
    description: 'El guardián supremo de los datos. Tienes pesadillas con `DROP TABLE` y bloqueos de tablas en pleno Black Friday.',
    minSalary: 3500,
    maxSalary: 8000,
    unlockXP: 135000,
    requiredTasks: 50,
    color: '#eab308', // Gold
    lore: [
      '“Una query sin índice es una invitación formal a prenderle fuego al servidor.”',
      '¿Hiciste backup antes de tocar eso? Mírame a los ojos y repítelo.',
      'El desarrollador hizo un `SELECT *` de una tabla con 400 millones de filas.'
    ],
    tasks: [
      // --- NIVEL JUNIOR ---
      {
        id: 'dba-1',
        title: 'Índices Mágicos',
        description: 'Crear un índice compuesto y reducir el tiempo de consulta de 42 segundos a 1.2 milisegundos.',
        durationSeconds: 300, // 5 min
        baseXP: 700,
        baseSalaryReward: 580,
        baseSanityCost: 12,
        scrapChance: 0.6,
        minScrap: 5,
        maxScrap: 10,
        iconName: 'Search'
      },
      {
        id: 'dba-j1',
        title: 'Desbloqueo de Deadlock Mortal',
        description: 'Dos transacciones se bloquearon mutuamente en la tabla de facturación. Matar la menor y salvar el día.',
        durationSeconds: 300, // 5 min
        baseXP: 740,
        baseSalaryReward: 610,
        baseSanityCost: 11,
        scrapChance: 0.65,
        minScrap: 5,
        maxScrap: 11,
        iconName: 'Lock'
      },
      {
        id: 'dba-2',
        title: 'Query de 14 JOINs sin WHERE',
        description: 'Matar un proceso zombie que estaba calculando el producto cartesiano de toda la historia de la empresa.',
        durationSeconds: 600, // 10 min
        baseXP: 1500,
        baseSalaryReward: 1250,
        baseSanityCost: 22,
        scrapChance: 0.75,
        minScrap: 8,
        maxScrap: 16,
        iconName: 'ListFilter'
      },
      {
        id: 'dba-j2',
        title: 'Limpieza de Tablas Huérfanas de 2014',
        description: 'Purgar 80 Gigabytes de logs temporales acumulados en tablas sin índices ni llaves foráneas.',
        durationSeconds: 1800, // 30 min
        baseXP: 3600,
        baseSalaryReward: 2900,
        baseSanityCost: 32,
        scrapChance: 0.80,
        minScrap: 12,
        maxScrap: 24,
        iconName: 'Trash2'
      },

      // --- NIVEL SEMI-SENIOR ---
      {
        id: 'dba-s1',
        title: 'EXPLAIN ANALYZE Forense',
        description: 'Descifrar por qué una consulta hacía un Sequential Scan de 60 millones de filas en vez de usar el índice.',
        durationSeconds: 300, // 5 min
        baseXP: 1100,
        baseSalaryReward: 900,
        baseSanityCost: 15,
        scrapChance: 0.80,
        minScrap: 7,
        maxScrap: 14,
        iconName: 'SearchCode',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'dba-s2',
        title: 'Particionamiento Declarativo por Fechas',
        description: 'Particionar la tabla de movimientos contables por mes para acelerar las lecturas en un 400%.',
        durationSeconds: 600, // 10 min
        baseXP: 2300,
        baseSalaryReward: 1900,
        baseSanityCost: 26,
        scrapChance: 0.82,
        minScrap: 10,
        maxScrap: 20,
        iconName: 'Calendar',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'dba-3',
        title: 'El "DROP" Prohibido (PITR Recovery)',
        description: 'Restaurar la base de datos a partir de backups transaccionales antes de que gerencia note el incidente.',
        durationSeconds: 1800, // 30 min
        baseXP: 4600,
        baseSalaryReward: 3700,
        baseSanityCost: 36,
        scrapChance: 0.85,
        minScrap: 14,
        maxScrap: 28,
        iconName: 'RotateCcw',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'dba-4',
        title: 'Migración Zero-Downtime a Medianoche',
        description: 'Migrar 8 Terabytes de PostgreSQL a un nuevo cluster sin perder una sola transacción en vuelo.',
        durationSeconds: 3600, // 60 min
        baseXP: 10000,
        baseSalaryReward: 8000,
        baseSanityCost: 52,
        scrapChance: 0.95,
        minScrap: 24,
        maxScrap: 48,
        iconName: 'HardDriveDownload',
        requiredSeniority: 'Semi-Senior'
      },

      // --- NIVEL SENIOR ---
      {
        id: 'dba-sr1',
        title: 'Réplicas de Lectura Globales Multirregión',
        description: 'Sincronizar réplicas de streaming en Virginia, Frankfurt y Singapur con menos de 10ms de lag.',
        durationSeconds: 600, // 10 min
        baseXP: 3100,
        baseSalaryReward: 2500,
        baseSanityCost: 28,
        scrapChance: 0.90,
        minScrap: 14,
        maxScrap: 28,
        iconName: 'Globe',
        requiredSeniority: 'Senior'
      },
      {
        id: 'dba-sr2',
        title: 'Sharding Horizontal a Gran Escala',
        description: 'Distribuir tablas maestras entre 32 nodos mediante claves de dispersión determinísticas.',
        durationSeconds: 1800, // 30 min
        baseXP: 7200,
        baseSalaryReward: 5800,
        baseSanityCost: 42,
        scrapChance: 0.95,
        minScrap: 20,
        maxScrap: 40,
        iconName: 'Share2',
        requiredSeniority: 'Senior'
      },
      {
        id: 'dba-sr3',
        title: 'Prueba de Catástrofe de Cluster Spanner',
        description: 'Desconectar un tercio de los nodos en plena hora pico para verificar el consenso Raft y cero pérdidas.',
        durationSeconds: 3600, // 60 min
        baseXP: 14500,
        baseSalaryReward: 11500,
        baseSanityCost: 58,
        scrapChance: 1.0,
        minScrap: 30,
        maxScrap: 60,
        iconName: 'ShieldAlert',
        requiredSeniority: 'Senior'
      }
    ]
  },

  /* ==========================================================================
     ROL 9: INGENIERO DEVOPS (CLOUD, CI/CD & KUBERNETES)
     ========================================================================== */
  {
    id: 9,
    title: 'Ingeniero DevOps',
    department: 'Cloud, CI/CD & Kubernetes',
    icon: 'Infinity',
    description: 'Automatizas todo para poder tomar café mientras los pipelines despliegan contenedores a 12 regiones en la nube.',
    minSalary: 3500,
    maxSalary: 8000,
    unlockXP: 180000,
    requiredTasks: 50,
    color: '#f97316', // Orange
    lore: [
      '“Un espacio mal indentado en el YAML y la mitad de internet se cae.”',
      'En mi máquina funcionaba... así que enviamos tu máquina a producción en un Docker.',
      'La factura de AWS este mes parece el número de teléfono del director.'
    ],
    tasks: [
      // --- NIVEL JUNIOR ---
      {
        id: 'devops-1',
        title: 'El Infierno YAML',
        description: 'Luchar contra un espacio invisible en la línea 48 que rompía el despliegue de Kubernetes.',
        durationSeconds: 300, // 5 min
        baseXP: 900,
        baseSalaryReward: 750,
        baseSanityCost: 13,
        scrapChance: 0.65,
        minScrap: 6,
        maxScrap: 12,
        iconName: 'FileText'
      },
      {
        id: 'devops-j1',
        title: 'Pod en CrashLoopBackOff Eterno',
        description: 'Descubrir que el contenedor fallaba porque faltaba una variable en el configmap.',
        durationSeconds: 300, // 5 min
        baseXP: 950,
        baseSalaryReward: 790,
        baseSanityCost: 12,
        scrapChance: 0.70,
        minScrap: 6,
        maxScrap: 13,
        iconName: 'RotateCcw'
      },
      {
        id: 'devops-2',
        title: 'El Botón Nuclear (Terraform)',
        description: 'Aplicar `terraform apply` conteniendo la respiración para no destruir la VPC principal por accidente.',
        durationSeconds: 600, // 10 min
        baseXP: 1900,
        baseSalaryReward: 1600,
        baseSanityCost: 24,
        scrapChance: 0.75,
        minScrap: 10,
        maxScrap: 20,
        iconName: 'Radioactive'
      },
      {
        id: 'devops-j2',
        title: 'Dieta Extrema de Imagen Docker',
        description: 'Reducir una imagen de Node.js de 1.8 GB a 75 MB usando multistage builds y Alpine Linux.',
        durationSeconds: 1800, // 30 min
        baseXP: 4500,
        baseSalaryReward: 3700,
        baseSanityCost: 32,
        scrapChance: 0.80,
        minScrap: 14,
        maxScrap: 28,
        iconName: 'Box'
      },

      // --- NIVEL SEMI-SENIOR ---
      {
        id: 'devops-s1',
        title: 'Rollback Inmediato de Emergencia',
        description: 'Revertir el despliegue roto en 12 segundos usando ArgoCD antes de que los usuarios se den cuenta.',
        durationSeconds: 300, // 5 min
        baseXP: 1300,
        baseSalaryReward: 1050,
        baseSanityCost: 16,
        scrapChance: 0.82,
        minScrap: 8,
        maxScrap: 16,
        iconName: 'CornerUpLeft',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'devops-s2',
        title: 'Auto-Scaling de Pods bajo Tráfico Masivo',
        description: 'Ajustar el HPA para escalar de 4 a 80 pods automáticamente durante una campaña viral en televisión.',
        durationSeconds: 600, // 10 min
        baseXP: 2700,
        baseSalaryReward: 2200,
        baseSanityCost: 28,
        scrapChance: 0.85,
        minScrap: 12,
        maxScrap: 24,
        iconName: 'TrendingUp',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'devops-3',
        title: 'Pipeline de CI/CD en Llamas',
        description: 'El build falló en el paso 89 de 90 porque expiró un certificado SSL autogenerado.',
        durationSeconds: 1800, // 30 min
        baseXP: 5800,
        baseSalaryReward: 4800,
        baseSanityCost: 38,
        scrapChance: 0.85,
        minScrap: 16,
        maxScrap: 32,
        iconName: 'Flame',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'devops-4',
        title: 'Reducir la Factura Cloud de $50k a $5k',
        description: 'Apagar instancias GPU que el equipo de marketing dejó encendidas haciendo pruebas de IA hace 6 meses.',
        durationSeconds: 3600, // 60 min
        baseXP: 12500,
        baseSalaryReward: 10200,
        baseSanityCost: 55,
        scrapChance: 0.95,
        minScrap: 26,
        maxScrap: 50,
        iconName: 'DollarSign',
        requiredSeniority: 'Semi-Senior'
      },

      // --- NIVEL SENIOR ---
      {
        id: 'devops-sr1',
        title: 'Despliegues Canary Progresivos',
        description: 'Derivar el 2% del tráfico real a la nueva versión mediante Istio Service Mesh analizando anomalías.',
        durationSeconds: 600, // 10 min
        baseXP: 3800,
        baseSalaryReward: 3100,
        baseSanityCost: 30,
        scrapChance: 0.90,
        minScrap: 16,
        maxScrap: 32,
        iconName: 'GitMerge',
        requiredSeniority: 'Senior'
      },
      {
        id: 'devops-sr2',
        title: 'Infraestructura Multi-Cloud Híbrida',
        description: 'Orquestar clústeres simultáneos en AWS, Google Cloud y On-Premise con sincronización GitOps.',
        durationSeconds: 1800, // 30 min
        baseXP: 8800,
        baseSalaryReward: 7200,
        baseSanityCost: 44,
        scrapChance: 0.94,
        minScrap: 22,
        maxScrap: 44,
        iconName: 'Cloud',
        requiredSeniority: 'Senior'
      },
      {
        id: 'devops-sr3',
        title: 'Invasión de Chaos Monkey en Producción',
        description: 'Desatar caos controlado matando nodos y cortando enlaces de red para validar resiliencia absoluta.',
        durationSeconds: 3600, // 60 min
        baseXP: 17500,
        baseSalaryReward: 14000,
        baseSanityCost: 60,
        scrapChance: 1.0,
        minScrap: 32,
        maxScrap: 64,
        iconName: 'Zap',
        requiredSeniority: 'Senior'
      }
    ]
  },

  /* ==========================================================================
     ROL 10: ARQUITECTO DE SOFTWARE (TECH LEAD & LEYENDA DEL SILICIO)
     ========================================================================== */
  {
    id: 10,
    title: 'Arquitecto de Software',
    department: 'Liderazgo Técnico & Estrategia',
    icon: 'Crown',
    description: 'El pico de la evolución IT. Ya no escribes código: dibujas cajas, flechas y tomas decisiones que definirán los próximos 5 años de la compañía.',
    minSalary: 8000,
    maxSalary: 15000,
    unlockXP: 250000, // Meta Final (Nivel Gurú)
    requiredTasks: 50,
    color: '#10b981', // Emerald Gold
    lore: [
      '“Todo problema en computación puede resolverse con otra capa de indirección.”',
      'Microservicios o Monolito Modular: La batalla filosófica eterna.',
      'Un diagrama bien dibujado en Lucidchart vale más que 10.000 líneas de código.'
    ],
    tasks: [
      // --- NIVEL JUNIOR ---
      {
        id: 'arch-1',
        title: 'Lluvia de Buzzwords en la Junta',
        description: 'Mencionar "Serverless, Event-Driven, AI-Native y Zero-Trust" en la misma frase para conseguir presupuesto.',
        durationSeconds: 300, // 5 min
        baseXP: 1200,
        baseSalaryReward: 1050,
        baseSanityCost: 14,
        scrapChance: 0.7,
        minScrap: 8,
        maxScrap: 16,
        iconName: 'Sparkles'
      },
      {
        id: 'arch-j1',
        title: 'Bautizo Mitológico del Proyecto',
        description: 'Debatir 2 horas si el nuevo microservicio de notificaciones debe llamarse Odín, Valquiria o Hermes.',
        durationSeconds: 300, // 5 min
        baseXP: 1300,
        baseSalaryReward: 1100,
        baseSanityCost: 13,
        scrapChance: 0.72,
        minScrap: 8,
        maxScrap: 17,
        iconName: 'Award'
      },
      {
        id: 'arch-2',
        title: 'Arte Abstracto en Pizarra (Diagramas C4)',
        description: 'Dibujar 47 rectángulos de colores interconectados hasta que el equipo asienta con la cabeza sin entender.',
        durationSeconds: 600, // 10 min
        baseXP: 2600,
        baseSalaryReward: 2200,
        baseSanityCost: 25,
        scrapChance: 0.8,
        minScrap: 14,
        maxScrap: 28,
        iconName: 'PenTool'
      },
      {
        id: 'arch-j2',
        title: 'Redacción de RFC Técnico de 40 Páginas',
        description: 'Documentar los lineamientos que el equipo seguirá antes de que alguien empiece a tirar código sin pensar.',
        durationSeconds: 1800, // 30 min
        baseXP: 6200,
        baseSalaryReward: 5200,
        baseSanityCost: 35,
        scrapChance: 0.85,
        minScrap: 18,
        maxScrap: 36,
        iconName: 'FileText'
      },

      // --- NIVEL SEMI-SENIOR ---
      {
        id: 'arch-s1',
        title: 'Arbitraje Sagrado: Tabs vs. Spaces',
        description: 'Imponer el estándar en el archivo `.editorconfig` con autoridad suprema y zanjar un debate de 3 semanas.',
        durationSeconds: 300, // 5 min
        baseXP: 1800,
        baseSalaryReward: 1500,
        baseSanityCost: 16,
        scrapChance: 0.85,
        minScrap: 10,
        maxScrap: 20,
        iconName: 'AlignLeft',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'arch-s2',
        title: 'Veto Técnico a la Idea del Trainee',
        description: 'Explicar calmadamente por qué no vamos a reescribir todo el backend en un framework que salió ayer en HackerNews.',
        durationSeconds: 600, // 10 min
        baseXP: 3800,
        baseSalaryReward: 3200,
        baseSanityCost: 28,
        scrapChance: 0.88,
        minScrap: 16,
        maxScrap: 32,
        iconName: 'ShieldAlert',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'arch-3',
        title: 'Aprobar RFC de 80 Páginas sin Leerlo',
        description: 'Poner un emoji de pulgar arriba en GitHub con el comentario "LGTM (Looks Good To Me)".',
        durationSeconds: 1800, // 30 min
        baseXP: 7800,
        baseSalaryReward: 6500,
        baseSanityCost: 40,
        scrapChance: 0.9,
        minScrap: 20,
        maxScrap: 40,
        iconName: 'CheckCheck',
        requiredSeniority: 'Semi-Senior'
      },
      {
        id: 'arch-s3',
        title: 'Plan de Refactorización de Deuda Técnica',
        description: 'Convencer a los inversionistas de destinar 3 sprints a pagar deuda técnica acumulada durante 5 años.',
        durationSeconds: 3600, // 60 min
        baseXP: 14000,
        baseSalaryReward: 11500,
        baseSanityCost: 52,
        scrapChance: 0.95,
        minScrap: 26,
        maxScrap: 52,
        iconName: 'Tool',
        requiredSeniority: 'Semi-Senior'
      },

      // --- NIVEL SENIOR ---
      {
        id: 'arch-sr1',
        title: 'Keynote Visionaria ante Inversionistas',
        description: 'Presentar la hoja de ruta tecnológica de la compañía y lograr una ronda de financiación Serie B.',
        durationSeconds: 600, // 10 min
        baseXP: 5200,
        baseSalaryReward: 4400,
        baseSanityCost: 30,
        scrapChance: 0.92,
        minScrap: 20,
        maxScrap: 40,
        iconName: 'Presentation',
        requiredSeniority: 'Senior'
      },
      {
        id: 'arch-sr2',
        title: 'Diseño de Resiliencia Planetaria Activa',
        description: 'Garantizar disponibilidad 99.999% ante caídas continentales de proveedores cloud con failover autónomo.',
        durationSeconds: 1800, // 30 min
        baseXP: 11500,
        baseSalaryReward: 9600,
        baseSanityCost: 45,
        scrapChance: 0.96,
        minScrap: 25,
        maxScrap: 50,
        iconName: 'Globe',
        requiredSeniority: 'Senior'
      },
      {
        id: 'arch-4',
        title: 'La Iluminación del Gurú Tecnológico',
        description: 'Alcanzar el estado supremo donde el software simplemente funciona por la fuerza de tu reputación.',
        durationSeconds: 3600, // 60 min
        baseXP: 22000,
        baseSalaryReward: 18500,
        baseSanityCost: 60,
        scrapChance: 1.0,
        minScrap: 35,
        maxScrap: 70,
        iconName: 'Crown',
        requiredSeniority: 'Senior'
      }
    ]
  }
];
