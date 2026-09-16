import { MurphyEvent } from '../types/game';

export const MURPHY_EVENTS: MurphyEvent[] = [
  {
    id: 'aws-outage',
    title: '🚨 ¡CAÍDA MASIVA DE AWS US-EAST-1!',
    subtitle: 'La mitad de internet está en llamas y los directores están llamando.',
    flavorText: 'El datacenter en Virginia del Norte tuvo un hipo y todos tus servidores están respondiendo con 503 Service Unavailable.',
    severity: 'critical',
    choices: [
      {
        text: '🔥 Entrar en modo bombero y levantar réplicas en EU-Central',
        description: 'Requiere concentración sobrehumana y agota tu cordura.',
        sanityDelta: -35,
        xpDelta: 450,
        salaryDelta: 300,
        scrapDelta: 12,
        successRate: 0.85,
        failureOutcome: {
          text: 'Las réplicas también fallaron y te dio una migraña.',
          sanityDelta: -45,
          salaryDelta: -100
        }
      },
      {
        text: '☕ Publicar en Twitter que "estamos investigando" y tomar café',
        description: 'Aceptar que no puedes arreglar los servidores de Amazon tú solo.',
        sanityDelta: 10,
        xpDelta: 80,
        salaryDelta: 50,
        scrapDelta: 2,
        successRate: 1.0
      },
      {
        text: '🤷 Culpar a la empresa de telecomunicaciones local',
        description: 'Una excusa clásica de la vieja escuela.',
        sanityDelta: -5,
        xpDelta: 150,
        salaryDelta: 120,
        scrapDelta: 5,
        successRate: 0.7,
        failureOutcome: {
          text: 'El CEO descubrió que era AWS y quedaste en evidencia.',
          sanityDelta: -20,
          salaryDelta: 0
        }
      }
    ]
  },
  {
    id: 'ceo-visit',
    title: '👔 ¡VISITA SORPRESA DEL CEO!',
    subtitle: 'El jefe supremo está caminando por las islas mirando pantallas.',
    flavorText: 'Viene acompañado por 3 consultores con trajes caros. Tienes 3 segundos para parecer intensamente ocupado.',
    severity: 'high',
    choices: [
      {
        text: '💻 Abrir una terminal verde y hacer `ping 8.8.8.8 -t` con cara seria',
        description: 'Efecto Hollywood instantáneo.',
        sanityDelta: -10,
        xpDelta: 220,
        salaryDelta: 250,
        scrapDelta: 4,
        successRate: 0.9,
        failureOutcome: {
          text: 'El CEO es ex-programador y te preguntó por qué pingueas a Google.',
          sanityDelta: -25,
          salaryDelta: -50
        }
      },
      {
        text: '📊 Mostrarle un dashboard lleno de gráficos circulares con gradientes',
        description: 'A los ejecutivos les encantan las métricas coloridas.',
        sanityDelta: -15,
        xpDelta: 300,
        salaryDelta: 400,
        scrapDelta: 6,
        successRate: 0.8,
        failureOutcome: {
          text: 'Pidió que exportaras el gráfico a PowerPoint para mañana a las 8 AM.',
          sanityDelta: -30,
          salaryDelta: 50
        }
      },
      {
        text: '🚪 Esconderte en el baño de servidores hasta que se vaya',
        description: 'Táctico y seguro, pero frío.',
        sanityDelta: 15,
        xpDelta: 40,
        salaryDelta: 0,
        scrapDelta: 8,
        successRate: 1.0
      }
    ]
  },
  {
    id: 'friday-deploy',
    title: '⏰ DEPLOY A PRODUCCIÓN: VIERNES 17:59',
    subtitle: 'El product manager insiste en subir el feature antes del fin de semana.',
    flavorText: 'La regla sagrada número 1 de la informática está a punto de ser violada con premeditación y alevosía.',
    severity: 'critical',
    choices: [
      {
        text: '🚀 Aceptar el deploy y rezar a todos los dioses de Silicon Valley',
        description: 'Alto riesgo de arruinar tu viernes por la noche.',
        sanityDelta: -40,
        xpDelta: 600,
        salaryDelta: 500,
        scrapDelta: 15,
        successRate: 0.5,
        failureOutcome: {
          text: '¡Explotó la pasarela de pagos! Estuviste hasta las 4 AM haciendo rollback.',
          sanityDelta: -60,
          salaryDelta: -200
        }
      },
      {
        text: '🛑 Fingir que el pipeline de CI/CD se trabó misteriosamente',
        description: 'El clásico "lo vemos el lunes a primera hora".',
        sanityDelta: 20,
        xpDelta: 100,
        salaryDelta: 80,
        scrapDelta: 3,
        successRate: 0.95
      },
      {
        text: '🧪 Ejecutar una batería de tests relámpago antes de aprobar',
        description: 'La solución profesional pero agotadora.',
        sanityDelta: -20,
        xpDelta: 380,
        salaryDelta: 320,
        scrapDelta: 8,
        successRate: 0.85
      }
    ]
  },
  {
    id: 'intern-rm-rf',
    title: '👶 EL BECARIO EJECUTÓ UN COMANDO PELIGROSO',
    subtitle: 'Se escuchó un "oh oh..." desde el rincón de los pasantes.',
    flavorText: 'Buscaba liberar espacio en disco y copió una línea de StackOverflow con permisos de root sin entenderla.',
    severity: 'high',
    choices: [
      {
        text: '💾 Restaurar el backup del snapshot de hace 30 minutos',
        description: 'Demuestra por qué te pagan el sueldo.',
        sanityDelta: -20,
        xpDelta: 350,
        salaryDelta: 280,
        scrapDelta: 10,
        successRate: 0.9,
        failureOutcome: {
          text: 'El backup estaba corrupto. Tuviste que reconstruir las tablas a mano.',
          sanityDelta: -45,
          salaryDelta: 0
        }
      },
      {
        text: '👨‍🏫 Calmar al becario, invitarle un café y enseñarle a usar Git',
        description: 'Buen karma y liderazgo empático.',
        sanityDelta: 10,
        xpDelta: 280,
        salaryDelta: 150,
        scrapDelta: 5,
        successRate: 1.0
      },
      {
        text: '🏃‍♂️ Correr el cable de red del rack para detener el borrado',
        description: 'Acción de película de acción de los 90s.',
        sanityDelta: -15,
        xpDelta: 200,
        salaryDelta: 190,
        scrapDelta: 14,
        successRate: 0.75
      }
    ]
  },
  {
    id: 'coffee-machine-dead',
    title: '☕ ¡LA CAFETERA CENTRAL HA EXPLOTADO!',
    subtitle: 'El soporte vital de todo el departamento de tecnología ha caído.',
    flavorText: 'Un charco de expresso negro cubre el suelo de la cocina. Los desarrolladores deambulan como zombies balbuceando syntax errors.',
    severity: 'medium',
    choices: [
      {
        text: '🔧 Desarmar la cafetera con un destornillador y arreglar la bomba',
        description: 'Habilidades de técnico informático aplicadas a electrodomésticos.',
        sanityDelta: -10,
        xpDelta: 250,
        salaryDelta: 180,
        scrapDelta: 16,
        successRate: 0.85,
        failureOutcome: {
          text: 'La bomba hizo un cortocircuito y ahora solo expulsa vapor frío.',
          sanityDelta: -25,
          salaryDelta: -30
        }
      },
      {
        text: '🛵 Hacer un pedido de emergencia a la cafetería de especialidad',
        description: 'Cuesta dinero de tu bolsillo pero salva la cordura de todos.',
        sanityDelta: 35,
        xpDelta: 100,
        salaryDelta: -60,
        scrapDelta: 2,
        successRate: 1.0
      },
      {
        text: '⚡ Tomar agua de la canilla y fingir que es mate cocido',
        description: 'Austeridad extrema para guerreros del teclado.',
        sanityDelta: -15,
        xpDelta: 120,
        salaryDelta: 50,
        scrapDelta: 4,
        successRate: 1.0
      }
    ]
  },
  {
    id: 'endless-meeting',
    title: '📅 REUNIÓN DE 2 HORAS SIN AGENDA',
    subtitle: '"Alineación sinérgica de objetivos holísticos Q3"',
    flavorText: '18 personas en la videollamada. 15 tienen el micrófono muteado y están jugando o respondiendo tickets.',
    severity: 'low',
    choices: [
      {
        text: '🎧 Dejar la llamada de fondo mientras programas en silencio',
        description: 'Multitasking ninja.',
        sanityDelta: -8,
        xpDelta: 240,
        salaryDelta: 160,
        scrapDelta: 5,
        successRate: 0.9,
        failureOutcome: {
          text: 'Te preguntaron "¿qué opinas tú de esto?" y estabas distraído.',
          sanityDelta: -20,
          salaryDelta: 0
        }
      },
      {
        text: '🗣️ Decir "Estoy de acuerdo con lo que dijo Carlos" y volver a mutear',
        description: 'La jugada maestra infalible.',
        sanityDelta: 5,
        xpDelta: 140,
        salaryDelta: 110,
        scrapDelta: 1,
        successRate: 0.95
      },
      {
        text: '📡 Fingir problemas de conexión y abandonar la llamada',
        description: '“Hola... se te... corta... ¿me escuch...?”',
        sanityDelta: 20,
        xpDelta: 80,
        salaryDelta: 40,
        scrapDelta: 3,
        successRate: 1.0
      }
    ]
  },
  {
    id: 'ransomware-scare',
    title: '☣️ ALERTA DE PHISHING EN CONTABILIDAD',
    subtitle: 'Alguien abrió un archivo llamado `Factura_Urgente_Premio.exe`',
    flavorText: 'Las pantallas del sector de finanzas empiezan a mostrar calaveras rojas pidiendo 2 Bitcoins.',
    severity: 'critical',
    choices: [
      {
        text: '🛡️ Aislar la VLAN contable y aislar el switch en 10 segundos',
        description: 'Protocolo de contención de desastres.',
        sanityDelta: -30,
        xpDelta: 500,
        salaryDelta: 450,
        scrapDelta: 20,
        successRate: 0.85,
        failureOutcome: {
          text: 'El gusano saltó por Wi-Fi y tuviste que reinstalar 8 máquinas.',
          sanityDelta: -50,
          salaryDelta: -150
        }
      },
      {
        text: '🔍 Revertir las máquinas a imágenes congeladas con Deep Freeze',
        description: 'La vieja confiable de los laboratorios.',
        sanityDelta: -15,
        xpDelta: 380,
        salaryDelta: 320,
        scrapDelta: 12,
        successRate: 0.95
      }
    ]
  }
];
