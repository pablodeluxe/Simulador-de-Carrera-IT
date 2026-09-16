import { RoleDefinition } from '../types/game';

export const ROLES_DATA: RoleDefinition[] = [
  {
    id: 1,
    title: 'Técnico Informático',
    department: 'Soporte de Software & Hardware',
    icon: 'Wrench',
    description: 'El guardián del hardware. Tu trabajo consiste en limpiar disqueteras, desenredar cables y revivir PCs que estaban dadas por muertas.',
    minSalary: 100,
    maxSalary: 250,
    unlockXP: 3000,
    color: '#38bdf8', // Sky Blue
    lore: [
      '“¿Sopló el conector antes de llamarme?”',
      'El 90% de los problemas se solucionan pateando suavemente la torre.',
      'El polvo en la fuente de poder podría formar una nueva civilización.'
    ],
    tasks: [
      {
        id: 'tech-1',
        title: 'Arqueología de Teclados',
        description: 'Extraer restos fósiles de papas fritas y clips atascados entre las teclas WASD.',
        durationSeconds: 4,
        baseXP: 20,
        baseSalaryReward: 15,
        baseSanityCost: 4,
        scrapChance: 0.7,
        minScrap: 1,
        maxScrap: 3,
        iconName: 'Keyboard'
      },
      {
        id: 'tech-2',
        title: 'Exorcismo de Impresora',
        description: 'La impresora láser huele el miedo. Tienes que convencerla de que no hay atasco de papel fantasma.',
        durationSeconds: 8,
        baseXP: 50,
        baseSalaryReward: 35,
        baseSanityCost: 8,
        scrapChance: 0.85,
        minScrap: 2,
        maxScrap: 5,
        iconName: 'Printer'
      },
      {
        id: 'tech-3',
        title: 'Terapia de Choque / Formateo',
        description: 'Windows 98 con 47 barras de búsqueda en Internet Explorer. No hay salvación: formateo masivo.',
        durationSeconds: 15,
        baseXP: 150,
        baseSalaryReward: 90,
        baseSanityCost: 16,
        scrapChance: 0.9,
        minScrap: 4,
        maxScrap: 8,
        iconName: 'HardDrive'
      },
      {
        id: 'tech-4',
        title: 'Cambio de Toner en Camisa Blanca',
        description: 'Una operación de precisión quirúrgica para no terminar como minero de carbón.',
        durationSeconds: 22,
        baseXP: 220,
        baseSalaryReward: 140,
        baseSanityCost: 22,
        scrapChance: 0.95,
        minScrap: 6,
        maxScrap: 12,
        iconName: 'Sparkles',
        requiredSeniority: 'Semi-Senior'
      }
    ]
  },
  {
    id: 2,
    title: 'Analista Help Desk',
    department: 'Mesa de Ayuda & Atención a Usuarios',
    icon: 'Headphones',
    description: 'La primera línea de defensa psicológica. Escuchas llantos, quejas sobre la taza de café en la bandeja de CD y preguntas existenciales.',
    minSalary: 250,
    maxSalary: 500,
    unlockXP: 5000,
    color: '#34d399', // Emerald
    lore: [
      '“¿Ha intentado apagarlo y volverlo a encender?”',
      'La tecla Any no existe en ningún teclado conocido por la humanidad.',
      'El usuario jura que no tocó nada.'
    ],
    tasks: [
      {
        id: 'hd-1',
        title: 'La Búsqueda de la Tecla "Any"',
        description: 'Explicarle al usuario que presione cualquier tecla física y no busque la palabra ANY.',
        durationSeconds: 5,
        baseXP: 25,
        baseSalaryReward: 25,
        baseSanityCost: 6,
        scrapChance: 0.5,
        minScrap: 1,
        maxScrap: 2,
        iconName: 'HelpCircle'
      },
      {
        id: 'hd-2',
        title: 'El Traductor de Gritos',
        description: 'Decodificar un correo en mayúsculas con 18 signos de exclamación para entender que se desconectó el mouse.',
        durationSeconds: 9,
        baseXP: 40,
        baseSalaryReward: 45,
        baseSanityCost: 10,
        scrapChance: 0.6,
        minScrap: 2,
        maxScrap: 4,
        iconName: 'MessageSquare'
      },
      {
        id: 'hd-3',
        title: 'Resetear Password por 5ta Vez Hoy',
        description: 'El usuario insistió en que su contraseña "123456" era inviolable hasta que la olvidó tras el almuerzo.',
        durationSeconds: 14,
        baseXP: 95,
        baseSalaryReward: 85,
        baseSanityCost: 14,
        scrapChance: 0.7,
        minScrap: 3,
        maxScrap: 6,
        iconName: 'Key'
      },
      {
        id: 'hd-4',
        title: 'Ticket Fantasma de Prioridad 1',
        description: 'Cerrar un ticket urgente cuyo único contenido es "ayuda por favor" sin captura de pantalla.',
        durationSeconds: 24,
        baseXP: 240,
        baseSalaryReward: 180,
        baseSanityCost: 24,
        scrapChance: 0.8,
        minScrap: 5,
        maxScrap: 10,
        iconName: 'AlertTriangle',
        requiredSeniority: 'Semi-Senior'
      }
    ]
  },
  {
    id: 3,
    title: 'Tester Manual (QA)',
    department: 'Control de Calidad & Caos Creativo',
    icon: 'Bug',
    description: 'Un programador entra a un bar. Pide una cerveza. Pide 0 cervezas. Pide 9999999 cervezas. Pide un lagarto. Pide -1 cervezas. Tu misión es romper todo.',
    minSalary: 500,
    maxSalary: 1200,
    unlockXP: 7500,
    color: '#a78bfa', // Purple
    lore: [
      '“No es un bug, es una característica no documentada.”',
      'Hice clic en el botón 700 veces por segundo hasta que la BD explotó.',
      'Si funciona a la primera, sospecha de inmediato.'
    ],
    tasks: [
      {
        id: 'qa-1',
        title: 'El Clic Destructor',
        description: 'Hacer doble clic frenético en el botón de "Pagar" para ver si duplica los cargos bancarios.',
        durationSeconds: 5,
        baseXP: 30,
        baseSalaryReward: 35,
        baseSanityCost: 5,
        scrapChance: 0.5,
        minScrap: 2,
        maxScrap: 4,
        iconName: 'MousePointer'
      },
      {
        id: 'qa-2',
        title: 'El Simulador de Vuelo / Spoofing',
        description: 'Inyectar emojis en el campo de código postal y comprobar si el backend arroja un 500.',
        durationSeconds: 10,
        baseXP: 50,
        baseSalaryReward: 65,
        baseSanityCost: 9,
        scrapChance: 0.65,
        minScrap: 3,
        maxScrap: 6,
        iconName: 'Zap'
      },
      {
        id: 'qa-3',
        title: 'Reportar Botón con 1px de Desfase',
        description: 'Redactar un informe de 12 páginas con gifs en cámara lenta mostrando el desalineamiento en Firefox móvil.',
        durationSeconds: 16,
        baseXP: 140,
        baseSalaryReward: 120,
        baseSanityCost: 15,
        scrapChance: 0.75,
        minScrap: 4,
        maxScrap: 8,
        iconName: 'Eye'
      },
      {
        id: 'qa-4',
        title: 'Bug en Vivo Durante la Demo del CEO',
        description: 'El bug que nunca apareció en 6 meses de testing decide debutar en la presentación a inversionistas.',
        durationSeconds: 26,
        baseXP: 290,
        baseSalaryReward: 230,
        baseSanityCost: 28,
        scrapChance: 0.85,
        minScrap: 7,
        maxScrap: 14,
        iconName: 'Flame',
        requiredSeniority: 'Semi-Senior'
      }
    ]
  },
  {
    id: 4,
    title: 'Administrador de Redes',
    department: 'Infraestructura & Telecomunicaciones',
    icon: 'Network',
    description: 'Vives en el rack de servidores a 16°C. Si el Wi-Fi parpadea 2 segundos, 500 personas te miran como si hubieras apagado el sol.',
    minSalary: 500,
    maxSalary: 1200,
    unlockXP: 10000,
    color: '#f59e0b', // Amber
    lore: [
      '“Siempre es el DNS. Cuando no es el DNS, era el firewall bloqueando el DNS.”',
      'Un loop de red puede derribar un edificio corporativo en 12 milisegundos.',
      'El rack parece un plato de tallarines con salsa boloñesa.'
    ],
    tasks: [
      {
        id: 'net-1',
        title: 'El Laberinto de Espagueti',
        description: 'Tirar de un cable azul pensando que es del router y apagar el switch central de contabilidad.',
        durationSeconds: 7,
        baseXP: 80,
        baseSalaryReward: 60,
        baseSanityCost: 8,
        scrapChance: 0.8,
        minScrap: 3,
        maxScrap: 7,
        iconName: 'GitBranch'
      },
      {
        id: 'net-2',
        title: 'El Loop Mortal',
        description: 'Alguien conectó los dos extremos de un cable de red al mismo switch y creó un agujero negro de paquetes.',
        durationSeconds: 12,
        baseXP: 120,
        baseSalaryReward: 95,
        baseSanityCost: 13,
        scrapChance: 0.85,
        minScrap: 5,
        maxScrap: 9,
        iconName: 'RefreshCw'
      },
      {
        id: 'net-3',
        title: 'Crimpar Cable RJ45 a Ciegas',
        description: 'Blanco-Naranja, Naranja, Blanco-Verde, Azul... y que la patita de plástico no se rompa al entrar.',
        durationSeconds: 18,
        baseXP: 210,
        baseSalaryReward: 160,
        baseSanityCost: 18,
        scrapChance: 0.9,
        minScrap: 6,
        maxScrap: 12,
        iconName: 'Sliders'
      },
      {
        id: 'net-4',
        title: 'Caza del Router Clandestino',
        description: 'Descubrir el repetidor Wi-Fi TP-Link de $10 que ventas escondió detrás de la cafetera.',
        durationSeconds: 28,
        baseXP: 360,
        baseSalaryReward: 290,
        baseSanityCost: 26,
        scrapChance: 0.95,
        minScrap: 8,
        maxScrap: 16,
        iconName: 'Radio',
        requiredSeniority: 'Semi-Senior'
      }
    ]
  },
  {
    id: 5,
    title: 'Administrador de Servidores',
    department: 'SysAdmin & Linux Ops',
    icon: 'Server',
    description: 'Los dioses de la terminal negra. Escribes comandos crípticos en Bash mientras rezas para que el disco RAID no empiece a sonar como helicóptero.',
    minSalary: 1200,
    maxSalary: 3500,
    unlockXP: 18000,
    color: '#06b6d4', // Cyan
    lore: [
      '“`sudo rm -rf /*` nunca es una solución recomendable.”',
      'Uptime: 1428 días. Nadie sabe qué corre en ese servidor pero si se apaga quiebra la empresa.',
      'El ventilador de 10.000 RPM es tu ruido blanco para dormir.'
    ],
    tasks: [
      {
        id: 'sys-1',
        title: 'Sudor Frío a las 3 AM',
        description: 'El bot de monitoreo envió 90 mensajes seguidos: el CPU está al 100% y la swap se agotó.',
        durationSeconds: 8,
        baseXP: 100,
        baseSalaryReward: 90,
        baseSanityCost: 12,
        scrapChance: 0.7,
        minScrap: 4,
        maxScrap: 8,
        iconName: 'Moon'
      },
      {
        id: 'sys-2',
        title: 'Lectura de Runas Antiguas (Bash)',
        description: 'Descifrar un script de 300 líneas escrito por un SysAdmin que renunció en el año 2004.',
        durationSeconds: 14,
        baseXP: 120,
        baseSalaryReward: 140,
        baseSanityCost: 16,
        scrapChance: 0.75,
        minScrap: 5,
        maxScrap: 10,
        iconName: 'Terminal'
      },
      {
        id: 'sys-3',
        title: 'Rescate de Servidor Zombie',
        description: 'Servidor Windows Server 2003 con telarañas que aloja el sistema de nómina principal.',
        durationSeconds: 20,
        baseXP: 260,
        baseSalaryReward: 240,
        baseSanityCost: 22,
        scrapChance: 0.85,
        minScrap: 8,
        maxScrap: 15,
        iconName: 'Cpu'
      },
      {
        id: 'sys-4',
        title: 'Reconstrucción de RAID en Degradado',
        description: 'Un disco falló y el segundo está haciendo ruidos metálicos sospechosos mientras sincroniza.',
        durationSeconds: 30,
        baseXP: 450,
        baseSalaryReward: 420,
        baseSanityCost: 32,
        scrapChance: 0.95,
        minScrap: 12,
        maxScrap: 22,
        iconName: 'Database',
        requiredSeniority: 'Semi-Senior'
      }
    ]
  },
  {
    id: 6,
    title: 'Desarrollador Frontend',
    department: 'Ingeniería de Software (UI/UX)',
    icon: 'Layout',
    description: 'El artesano del DOM. Luchas contra el desfase de Safari, frameworks que cambian de versión cada martes y el eterno dilema de cómo centrar un div.',
    minSalary: 1200,
    maxSalary: 3500,
    unlockXP: 15000,
    color: '#ec4899', // Pink
    lore: [
      '“Funciona en mi Chrome. En Safari se ve como un collage cubista.”',
      'node_modules pesa más que el telescopio espacial James Webb.',
      'El cliente pidió que el botón fuera más interactivo y tuviera purpurina.'
    ],
    tasks: [
      {
        id: 'fe-1',
        title: 'El Santo Grial: Centrar un Div',
        description: 'Intentar flexbox, grid, margin: auto, translate(-50%, -50%) hasta que quede en el medio.',
        durationSeconds: 6,
        baseXP: 60,
        baseSalaryReward: 70,
        baseSanityCost: 7,
        scrapChance: 0.5,
        minScrap: 2,
        maxScrap: 5,
        iconName: 'AlignCenter'
      },
      {
        id: 'fe-2',
        title: 'Acrobacias Móviles (Safari Bug)',
        description: 'La barra de navegación flotante desaparece detrás del teclado virtual solo en iPhones dorados.',
        durationSeconds: 12,
        baseXP: 90,
        baseSalaryReward: 120,
        baseSanityCost: 14,
        scrapChance: 0.6,
        minScrap: 4,
        maxScrap: 8,
        iconName: 'Smartphone'
      },
      {
        id: 'fe-3',
        title: 'Actualizar 47 Dependencias de NPM',
        description: 'Una advertencia de vulnerabilidad crítica en un paquete que solo redondeaba esquinas.',
        durationSeconds: 18,
        baseXP: 220,
        baseSalaryReward: 210,
        baseSanityCost: 20,
        scrapChance: 0.7,
        minScrap: 6,
        maxScrap: 12,
        iconName: 'Package'
      },
      {
        id: 'fe-4',
        title: 'Pixel Perfect contra Figma a las 18:00',
        description: 'Diseño descubrió que el padding izquierdo tiene 15px en vez de 16px en la vista tablet.',
        durationSeconds: 28,
        baseXP: 380,
        baseSalaryReward: 380,
        baseSanityCost: 28,
        scrapChance: 0.8,
        minScrap: 10,
        maxScrap: 18,
        iconName: 'Layers',
        requiredSeniority: 'Semi-Senior'
      }
    ]
  },
  {
    id: 7,
    title: 'Desarrollador Backend',
    department: 'Ingeniería de Software (APIs & Core)',
    icon: 'Code2',
    description: 'Construyes las tuberías invisibles que sostienen el mundo digital. Tu hábitat son los endpoints REST, WebSockets y race conditions que solo ocurren en producción.',
    minSalary: 1200,
    maxSalary: 3500,
    unlockXP: 16000,
    color: '#8b5cf6', // Violet
    lore: [
      '“El frontend me mandó un string en un campo booleano y quemó el microservicio.”',
      'No hay nada más permanente que un parche temporal con un comentario `// TODO: fix later 2017`.',
      '200 OK pero con `{ error: true }` en el body.'
    ],
    tasks: [
      {
        id: 'be-1',
        title: 'Arqueología de Código Legado',
        description: 'Una función de 800 líneas llamada `processDataFinal_v2_DEFINITIVO()` sin un solo test.',
        durationSeconds: 7,
        baseXP: 150,
        baseSalaryReward: 90,
        baseSanityCost: 11,
        scrapChance: 0.6,
        minScrap: 3,
        maxScrap: 6,
        iconName: 'FileCode'
      },
      {
        id: 'be-2',
        title: 'Escudo Deflector contra el Frontend',
        description: 'Validar y sanitizar 90 campos de entrada antes de que un payload malformado tumbe el server.',
        durationSeconds: 11,
        baseXP: 180,
        baseSalaryReward: 135,
        baseSanityCost: 13,
        scrapChance: 0.65,
        minScrap: 4,
        maxScrap: 8,
        iconName: 'ShieldCheck'
      },
      {
        id: 'be-3',
        title: 'Caza de la Race Condition Fantasma',
        description: 'El saldo del usuario se duplicó solo cuando dos pagos entraron en el mismo microsegundo.',
        durationSeconds: 19,
        baseXP: 290,
        baseSalaryReward: 270,
        baseSanityCost: 24,
        scrapChance: 0.75,
        minScrap: 7,
        maxScrap: 14,
        iconName: 'Activity'
      },
      {
        id: 'be-4',
        title: 'Microservicio Monstruoso sin Documentar',
        description: 'Reescribir un endpoint en Go que procesaba 50k transacciones por segundo con fugas de memoria.',
        durationSeconds: 29,
        baseXP: 440,
        baseSalaryReward: 430,
        baseSanityCost: 31,
        scrapChance: 0.85,
        minScrap: 11,
        maxScrap: 20,
        iconName: 'Cpu',
        requiredSeniority: 'Semi-Senior'
      }
    ]
  },
  {
    id: 8,
    title: 'Administrador de Base de Datos (DBA)',
    department: 'Gestión de Datos & Rendimiento SQL',
    icon: 'Database',
    description: 'El guardián supremo de los datos. Tienes pesadillas con `DROP TABLE` y bloqueos de tablas en pleno Black Friday.',
    minSalary: 3500,
    maxSalary: 8000,
    unlockXP: 20000,
    color: '#eab308', // Gold
    lore: [
      '“Una query sin índice es una invitación formal a prenderle fuego al servidor.”',
      '¿Hiciste backup antes de tocar eso? Mírame a los ojos y repítelo.',
      'El desarrollador hizo un `SELECT *` de una tabla con 400 millones de filas.'
    ],
    tasks: [
      {
        id: 'dba-1',
        title: 'Índices Mágicos',
        description: 'Crear un índice compuesto y reducir el tiempo de consulta de 42 segundos a 1.2 milisegundos.',
        durationSeconds: 8,
        baseXP: 90,
        baseSalaryReward: 160,
        baseSanityCost: 9,
        scrapChance: 0.55,
        minScrap: 4,
        maxScrap: 9,
        iconName: 'Search'
      },
      {
        id: 'dba-2',
        title: 'Query de 14 JOINs sin WHERE',
        description: 'Matar un proceso zombie que estaba calculando el producto cartesiano de toda la historia de la empresa.',
        durationSeconds: 15,
        baseXP: 210,
        baseSalaryReward: 280,
        baseSanityCost: 18,
        scrapChance: 0.7,
        minScrap: 6,
        maxScrap: 13,
        iconName: 'ListFilter'
      },
      {
        id: 'dba-3',
        title: 'El "DROP" Prohibido',
        description: 'Restaurar la tabla de clientes antes de que ventas se dé cuenta de que el script borró los últimos 3 meses.',
        durationSeconds: 22,
        baseXP: 300,
        baseSalaryReward: 450,
        baseSanityCost: 28,
        scrapChance: 0.85,
        minScrap: 10,
        maxScrap: 20,
        iconName: 'RotateCcw'
      },
      {
        id: 'dba-4',
        title: 'Migración Zero-Downtime a Medianoche',
        description: 'Migrar 8 Terabytes de PostgreSQL a un nuevo cluster sin perder una sola transacción en vuelo.',
        durationSeconds: 32,
        baseXP: 550,
        baseSalaryReward: 680,
        baseSanityCost: 35,
        scrapChance: 0.95,
        minScrap: 15,
        maxScrap: 28,
        iconName: 'HardDriveDownload',
        requiredSeniority: 'Semi-Senior'
      }
    ]
  },
  {
    id: 9,
    title: 'Ingeniero DevOps',
    department: 'Cloud, CI/CD & Kubernetes',
    icon: 'Infinity',
    description: 'Automatizas todo para poder tomar café mientras los pipelines despliegan contenedores a 12 regiones en la nube.',
    minSalary: 3500,
    maxSalary: 8000,
    unlockXP: 25000,
    color: '#f97316', // Orange
    lore: [
      '“Un espacio mal indentado en el YAML y la mitad de internet se cae.”',
      'En mi máquina funcionaba... así que enviamos tu máquina a producción en un Docker.',
      'La factura de AWS este mes parece el número de teléfono del director.'
    ],
    tasks: [
      {
        id: 'devops-1',
        title: 'El Infierno YAML',
        description: 'Luchar 2 horas contra un espacio invisible en la línea 48 que rompía el despliegue de Kubernetes.',
        durationSeconds: 8,
        baseXP: 160,
        baseSalaryReward: 190,
        baseSanityCost: 11,
        scrapChance: 0.6,
        minScrap: 5,
        maxScrap: 10,
        iconName: 'FileText'
      },
      {
        id: 'devops-2',
        title: 'El Botón Nuclear (Terraform)',
        description: 'Aplicar `terraform apply` conteniendo la respiración para no destruir la VPC principal por accidente.',
        durationSeconds: 14,
        baseXP: 300,
        baseSalaryReward: 340,
        baseSanityCost: 20,
        scrapChance: 0.75,
        minScrap: 8,
        maxScrap: 16,
        iconName: 'Radioactive'
      },
      {
        id: 'devops-3',
        title: 'Pipeline de CI/CD en Llamas',
        description: 'El build falló en el paso 89 de 90 porque expiró un certificado SSL autogenerado.',
        durationSeconds: 21,
        baseXP: 420,
        baseSalaryReward: 490,
        baseSanityCost: 27,
        scrapChance: 0.85,
        minScrap: 12,
        maxScrap: 24,
        iconName: 'Flame'
      },
      {
        id: 'devops-4',
        title: 'Reducir la Factura Cloud de $50k a $5k',
        description: 'Apagar instancias GPU que el equipo de marketing dejó encendidas haciendo pruebas de IA hace 6 meses.',
        durationSeconds: 34,
        baseXP: 680,
        baseSalaryReward: 850,
        baseSanityCost: 36,
        scrapChance: 0.95,
        minScrap: 18,
        maxScrap: 35,
        iconName: 'DollarSign',
        requiredSeniority: 'Semi-Senior'
      }
    ]
  },
  {
    id: 10,
    title: 'Arquitecto de Software',
    department: 'Liderazgo Técnico & Estrategia',
    icon: 'Crown',
    description: 'El pico de la evolución IT. Ya no escribes código: dibujas cajas, flechas y tomas decisiones que definirán los próximos 5 años de la compañía.',
    minSalary: 8000,
    maxSalary: 15000,
    unlockXP: 30000, // Meta Final (Nivel Gurú)
    color: '#10b981', // Emerald Gold
    lore: [
      '“Todo problema en computación puede resolverse con otra capa de indirección.”',
      'Microservicios o Monolito Modular: La batalla filosófica eterna.',
      'Un diagrama bien dibujado en Lucidchart vale más que 10.000 líneas de código.'
    ],
    tasks: [
      {
        id: 'arch-1',
        title: 'Lluvia de Buzzwords en la Junta',
        description: 'Mencionar "Serverless, Event-Driven, AI-Native y Zero-Trust" en la misma frase para conseguir presupuesto.',
        durationSeconds: 9,
        baseXP: 250,
        baseSalaryReward: 380,
        baseSanityCost: 10,
        scrapChance: 0.65,
        minScrap: 7,
        maxScrap: 15,
        iconName: 'Sparkles'
      },
      {
        id: 'arch-2',
        title: 'Arte Abstracto en Pizarra (Diagramas C4)',
        description: 'Dibujar 47 rectángulos de colores interconectados hasta que el equipo asienta con la cabeza sin entender.',
        durationSeconds: 16,
        baseXP: 450,
        baseSalaryReward: 620,
        baseSanityCost: 19,
        scrapChance: 0.8,
        minScrap: 12,
        maxScrap: 24,
        iconName: 'PenTool'
      },
      {
        id: 'arch-3',
        title: 'Aprobar RFC de 80 Páginas sin Leerlo',
        description: 'Poner un emoji de pulgar arriba en GitHub con el comentario "LGTM (Looks Good To Me)".',
        durationSeconds: 23,
        baseXP: 650,
        baseSalaryReward: 950,
        baseSanityCost: 26,
        scrapChance: 0.9,
        minScrap: 16,
        maxScrap: 32,
        iconName: 'CheckCheck'
      },
      {
        id: 'arch-4',
        title: 'La Iluminación del Gurú Tecnológico',
        description: 'Alcanzar el estado supremo donde el software simplemente funciona por la fuerza de tu reputación.',
        durationSeconds: 36,
        baseXP: 1000,
        baseSalaryReward: 1600,
        baseSanityCost: 35,
        scrapChance: 1.0,
        minScrap: 25,
        maxScrap: 50,
        iconName: 'Crown',
        requiredSeniority: 'Senior'
      }
    ]
  }
];
