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
        successRate: 0.70,
        failureOutcome: {
          text: 'Las réplicas también fallaron por congestión en Frankfurt y te dio una migraña.',
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
        successRate: 0.82,
        failureOutcome: {
          text: 'Los usuarios furiosos llenaron las redes de memes burlándose de tu comunicado.',
          sanityDelta: -15,
          salaryDelta: 0
        }
      },
      {
        text: '🤷 Culpar a la empresa de telecomunicaciones local',
        description: 'Una excusa clásica de la vieja escuela.',
        sanityDelta: -5,
        xpDelta: 150,
        salaryDelta: 120,
        scrapDelta: 5,
        successRate: 0.55,
        failureOutcome: {
          text: 'El CEO descubrió que era AWS en Twitter y tu coartada se desmoronó.',
          sanityDelta: -25,
          salaryDelta: -30
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
        successRate: 0.72,
        failureOutcome: {
          text: 'El CEO es ex-programador y te preguntó con sorna por qué pingueas a Google.',
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
        successRate: 0.68,
        failureOutcome: {
          text: 'Pidió que exportaras todas las tablas a PowerPoint para mañana a las 8 AM.',
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
        successRate: 0.80,
        failureOutcome: {
          text: 'El CEO entró al mismo baño a lavarse las manos y te vio en un rincón con la laptop.',
          sanityDelta: -25,
          salaryDelta: -20
        }
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
        description: 'Alto riesgo de arruinar tu fin de semana.',
        sanityDelta: -40,
        xpDelta: 600,
        salaryDelta: 500,
        scrapDelta: 15,
        successRate: 0.40,
        failureOutcome: {
          text: '¡Explotó la pasarela de pagos! Estuviste hasta las 4 AM haciendo rollback y migración manual.',
          sanityDelta: -65,
          salaryDelta: -200
        }
      },
      {
        text: '🛑 Fingir que el pipeline de CI/CD se trabó misteriosamente',
        description: 'El clásico "lo vemos el lunes a primera hora con calma".',
        sanityDelta: 20,
        xpDelta: 100,
        salaryDelta: 80,
        scrapDelta: 3,
        successRate: 0.75,
        failureOutcome: {
          text: 'El PM reinició el runner de GitHub Actions en vivo y te atrapó con las manos en la masa.',
          sanityDelta: -30,
          salaryDelta: -40
        }
      },
      {
        text: '🧪 Ejecutar una batería de tests relámpago antes de aprobar',
        description: 'La solución profesional pero agotadora.',
        sanityDelta: -20,
        xpDelta: 380,
        salaryDelta: 320,
        scrapDelta: 8,
        successRate: 0.68,
        failureOutcome: {
          text: 'Los tests pasaron en verde pero un endpoint no documentado rompió el login de clientes.',
          sanityDelta: -35,
          salaryDelta: -60
        }
      }
    ]
  },
  {
    id: 'intern-rm-rf',
    title: '👶 EL TRAINEE EJECUTÓ UN COMANDO PELIGROSO',
    subtitle: 'Se escuchó un "oh oh..." desde el rincón de los trainees.',
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
        successRate: 0.72,
        failureOutcome: {
          text: 'El snapshot estaba dañado por desincronización. Tuviste que reconstruir datos a mano.',
          sanityDelta: -45,
          salaryDelta: -40
        }
      },
      {
        text: '👨‍🏫 Calmar al trainee, invitarle un café y enseñarle a usar Git',
        description: 'Buen karma y liderazgo empático.',
        sanityDelta: 10,
        xpDelta: 280,
        salaryDelta: 150,
        scrapDelta: 5,
        successRate: 0.84,
        failureOutcome: {
          text: 'El trainee del susto derramó el café sobre el switch de escritorio y quemó la regleta.',
          sanityDelta: -15,
          salaryDelta: -30
        }
      },
      {
        text: '🏃‍♂️ Correr y arrancar el cable de red del rack para detener el borrado',
        description: 'Acción de película de acción de los 90s.',
        sanityDelta: -15,
        xpDelta: 200,
        salaryDelta: 190,
        scrapDelta: 14,
        successRate: 0.60,
        failureOutcome: {
          text: 'Te tropezaste con una zapatilla eléctrica y desconectaste el servidor de telefonía IP.',
          sanityDelta: -30,
          salaryDelta: -50
        }
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
        successRate: 0.68,
        failureOutcome: {
          text: 'La bomba hizo cortocircuito con un chispazo y ahora solo expulsa vapor frío con gusto a quemado.',
          sanityDelta: -25,
          salaryDelta: -40
        }
      },
      {
        text: '🛵 Hacer un pedido de emergencia a la cafetería de especialidad',
        description: 'Cuesta dinero de tu bolsillo pero salva la cordura de todos.',
        sanityDelta: 35,
        xpDelta: 100,
        salaryDelta: -60,
        scrapDelta: 2,
        successRate: 0.82,
        failureOutcome: {
          text: 'El repartidor tardó 1 hora y media en llegar y el café estaba aguado y tibio.',
          sanityDelta: -15,
          salaryDelta: -60
        }
      },
      {
        text: '⚡ Tomar agua de la canilla y fingir que es mate cocido',
        description: 'Austeridad extrema para guerreros del teclado.',
        sanityDelta: -15,
        xpDelta: 120,
        salaryDelta: 50,
        scrapDelta: 4,
        successRate: 0.78,
        failureOutcome: {
          text: 'El agua tenía gusto a cañería oxidada y te dejó dolor de cabeza por abstinencia de cafeína.',
          sanityDelta: -25,
          salaryDelta: 0
        }
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
        successRate: 0.72,
        failureOutcome: {
          text: 'Te preguntaron repentinamente "¿qué opinas de esto?" y te quedaste mudo 10 segundos.',
          sanityDelta: -25,
          salaryDelta: 0
        }
      },
      {
        text: '🗣️ Decir "Estoy de acuerdo con lo que dijo Carlos" y volver a mutear',
        description: 'La jugada clásica de supervivencia en videollamadas.',
        sanityDelta: 5,
        xpDelta: 140,
        salaryDelta: 110,
        scrapDelta: 1,
        successRate: 0.74,
        failureOutcome: {
          text: 'Carlos acababa de sugerir trabajar horas extra el sábado y acabas de apoyarlo con entusiasmo.',
          sanityDelta: -35,
          salaryDelta: 0
        }
      },
      {
        text: '📡 Fingir problemas de conexión y abandonar la llamada',
        description: '“Hola... se te... corta... ¿me escuch...?”',
        sanityDelta: 20,
        xpDelta: 80,
        salaryDelta: 40,
        scrapDelta: 3,
        successRate: 0.80,
        failureOutcome: {
          text: 'Olvidaste mutearte y se escuchó nítidamente el audio de un video de gatitos.',
          sanityDelta: -25,
          salaryDelta: -30
        }
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
        text: '🛡️ Aislar la VLAN contable y desconectar el switch en 10 segundos',
        description: 'Protocolo relámpago de contención de desastres.',
        sanityDelta: -30,
        xpDelta: 500,
        salaryDelta: 450,
        scrapDelta: 20,
        successRate: 0.70,
        failureOutcome: {
          text: 'El gusano se propagó por Wi-Fi de invitados antes de aislar el switch y contagió 6 PCs.',
          sanityDelta: -55,
          salaryDelta: -160
        }
      },
      {
        text: '🔍 Revertir las máquinas a imágenes congeladas de seguridad',
        description: 'La vieja confiable de los administradores de sistemas.',
        sanityDelta: -15,
        xpDelta: 380,
        salaryDelta: 320,
        scrapDelta: 12,
        successRate: 0.76,
        failureOutcome: {
          text: 'La imagen base no tenía el software del banco y perdiste 3 horas reinstalando certificados.',
          sanityDelta: -35,
          salaryDelta: -50
        }
      }
    ]
  },
  {
    id: 'ups-battery-fire',
    title: '🧯 ¡INCENDIO EN EL RACK DE BATERÍAS (UPS)!',
    subtitle: 'Un pitido ensordecedor de 110 dB retumba y huele a plástico quemado.',
    flavorText: 'El sensor térmico marca 48°C. Los condensadores del sistema de alimentación ininterrumpida están hirviendo.',
    severity: 'critical',
    choices: [
      {
        text: '🧯 Vaciar el extintor de CO2 (Gas limpio) sin apagar los servidores',
        description: 'Operación táctica de riesgo extremo para evitar downtime.',
        sanityDelta: -35,
        xpDelta: 550,
        salaryDelta: 480,
        scrapDelta: 22,
        successRate: 0.65,
        failureOutcome: {
          text: 'El gas activó los detectores de humo ópticos y evacuaron a todo el edificio bajo la lluvia.',
          sanityDelta: -50,
          salaryDelta: -120
        }
      },
      {
        text: '🔌 Bajar la llave térmica general del edificio de golpe',
        description: 'Medida drástica pero segura para extinguir la sobrecarga.',
        sanityDelta: -20,
        xpDelta: 320,
        salaryDelta: 200,
        scrapDelta: 15,
        successRate: 0.80,
        failureOutcome: {
          text: 'La sobretensión del corte repentino quemó dos fuentes redundantes de almacenamiento.',
          sanityDelta: -40,
          salaryDelta: -90
        }
      },
      {
        text: '🚪 Cerrar la puerta blindada y llamar a mantenimiento edilicio',
        description: 'Que los profesionales con casco se encarguen del fuego.',
        sanityDelta: 10,
        xpDelta: 150,
        salaryDelta: 80,
        scrapDelta: 5,
        successRate: 0.74,
        failureOutcome: {
          text: 'Mantenimiento tardó 40 minutos en encontrar las llaves y el humo llegó a presidencia.',
          sanityDelta: -30,
          salaryDelta: -40
        }
      }
    ]
  },
  {
    id: 'expired-ssl-cert',
    title: '💣 CERTIFICADO SSL EXPIRADO EN PRODUCCIÓN',
    subtitle: 'Todos los navegadores del mundo muestran: "SU CONEXIÓN NO ES PRIVADA".',
    flavorText: 'Nadie anotó en el calendario que el certificado Wildcard vencía hoy a las 14:00. Las transacciones cayeron a cero.',
    severity: 'high',
    choices: [
      {
        text: '📜 Generar e instalar certificado Let\'s Encrypt por SSH a contrarreloj',
        description: 'Desafío de DNS manual y recarga de Nginx en caliente.',
        sanityDelta: -25,
        xpDelta: 420,
        salaryDelta: 350,
        scrapDelta: 10,
        successRate: 0.70,
        failureOutcome: {
          text: 'Te equivocaste en el path de `fullchain.pem` y el servidor web arrojó error de sintaxis.',
          sanityDelta: -40,
          salaryDelta: -80
        }
      },
      {
        text: '💳 Comprar certificado comercial exprés con la tarjeta corporativa',
        description: 'Validación por email en 10 minutos si finanzas no bloquea el pago.',
        sanityDelta: -10,
        xpDelta: 260,
        salaryDelta: 180,
        scrapDelta: 4,
        successRate: 0.78,
        failureOutcome: {
          text: 'El banco rechazó la transacción internacional por "consumo sospechoso" y perdiste 45 minutos llamando.',
          sanityDelta: -35,
          salaryDelta: 0
        }
      },
      {
        text: '📢 Tuitear que es una "ventana de optimización criptográfica planificada"',
        description: 'Transformar un error garrafal en un supuesto hito de ciberseguridad.',
        sanityDelta: 15,
        xpDelta: 180,
        salaryDelta: 120,
        scrapDelta: 3,
        successRate: 0.58,
        failureOutcome: {
          text: 'Comunidad de Reddit descubrió el flag `SEC_ERROR_EXPIRED_CERTIFICATE` y te dedicaron un hilo viral.',
          sanityDelta: -30,
          salaryDelta: -30
        }
      }
    ]
  },
  {
    id: 'ai-dropped-users',
    title: '🤖 LA IA ALUCINÓ Y BORRÓ LA TABLA DE USUARIOS',
    subtitle: 'El script de "optimización predictiva" tomó decisiones demasiado creativas.',
    flavorText: 'Le pediste que limpiara registros antiguos sin actividad. Consideró que todos los usuarios registrados eran redundantes.',
    severity: 'critical',
    choices: [
      {
        text: '🧬 Reconstruir la tabla leyendo los binlogs de MySQL / WAL de PostgreSQL',
        description: 'Arqueología forense de transacciones a bajo nivel.',
        sanityDelta: -35,
        xpDelta: 580,
        salaryDelta: 520,
        scrapDelta: 18,
        successRate: 0.66,
        failureOutcome: {
          text: 'El WAL rotó automáticamente a mitad del proceso y los IDs de clientes VIP quedaron en null.',
          sanityDelta: -55,
          salaryDelta: -150
        }
      },
      {
        text: '⏳ Restaurar el backup frío de la medianoche y emitir comunicado de disculpas',
        description: 'Se perderán las últimas 10 horas de registros, pero el sistema volverá a la vida.',
        sanityDelta: -15,
        xpDelta: 320,
        salaryDelta: 220,
        scrapDelta: 8,
        successRate: 0.82,
        failureOutcome: {
          text: 'El restore tardó el doble de lo previsto y los clientes furiosos saturaron la mesa de ayuda.',
          sanityDelta: -35,
          salaryDelta: -60
        }
      },
      {
        text: '🤖 Preguntarle al mismo modelo de IA cómo arreglar lo que acaba de romper',
        description: 'Confianza ciega en la era del silicio.',
        sanityDelta: -10,
        xpDelta: 200,
        salaryDelta: 150,
        scrapDelta: 6,
        successRate: 0.42,
        failureOutcome: {
          text: 'La IA te dio un script en Python que borró también las tablas de auditoría y facturas.',
          sanityDelta: -60,
          salaryDelta: -180
        }
      }
    ]
  },
  {
    id: 'license-audit-surprise',
    title: '⚡ AUDITORÍA DE LICENCIAS DE SOFTWARE SIN AVISO',
    subtitle: 'Dos inspectores de la BSA tocan la puerta con portafolios y planillas Excel.',
    flavorText: 'Alguien instaló WinRAR hace 1200 días sin pagar la licencia, además de 5 copias piratas de Photoshop en diseño gráfico.',
    severity: 'medium',
    choices: [
      {
        text: '🧹 Lanzar script silencioso de PowerShell para desinstalar ejecutables piratas',
        description: 'Barrer la casa antes de que los inspectores lleguen a los cubículos.',
        sanityDelta: -20,
        xpDelta: 360,
        salaryDelta: 300,
        scrapDelta: 14,
        successRate: 0.70,
        failureOutcome: {
          text: 'El script barrió con demasiada agresividad y desinstaló los drivers de red de 15 puestos.',
          sanityDelta: -35,
          salaryDelta: -70
        }
      },
      {
        text: '☕ Entretener a los auditores en recepción con medialunas y café de grano',
        description: 'Diplomacia gastronómica para ganar tiempo valioso.',
        sanityDelta: 10,
        xpDelta: 180,
        salaryDelta: 140,
        scrapDelta: 4,
        successRate: 0.75,
        failureOutcome: {
          text: 'Comieron con gusto las medialunas pero exigieron revisar todos los servidores locales uno por uno.',
          sanityDelta: -25,
          salaryDelta: -50
        }
      },
      {
        text: '🐧 Afirmar con convicción que en esta empresa solo se usa GNU/Linux y FOSS',
        description: 'La defensa Stallman: confundirlos con la filosofía del software libre.',
        sanityDelta: -5,
        xpDelta: 220,
        salaryDelta: 180,
        scrapDelta: 8,
        successRate: 0.54,
        failureOutcome: {
          text: 'Vieron el protector de pantalla de Windows XP en la máquina de recepción y te multaron.',
          sanityDelta: -40,
          salaryDelta: -100
        }
      }
    ]
  },
  {
    id: 'water-leak-switch',
    title: '🌧️ FILTRACIÓN DE AGUA SOBRE EL SWITCH PRINCIPAL',
    subtitle: 'El aire acondicionado del piso superior empezó a condensar sobre el rack central.',
    flavorText: 'Gota a gota... clink... clink... cae agua helada exactamente sobre las rejillas de ventilación de un Cisco de 48 puertos.',
    severity: 'high',
    choices: [
      {
        text: '☂️ Improvisar canaleta con botellas plásticas cortadas y cinta aisladora',
        description: 'Ingeniería de emergencia con lo que haya en la oficina.',
        sanityDelta: -15,
        xpDelta: 390,
        salaryDelta: 310,
        scrapDelta: 24,
        successRate: 0.72,
        failureOutcome: {
          text: 'La cinta cedió por el peso acumulado y salpicó directo a la fuente de alimentación secundaria.',
          sanityDelta: -40,
          salaryDelta: -80
        }
      },
      {
        text: '🔄 Migrar el tráfico al switch secundario por Spanning Tree y apagar el core',
        description: 'La solución prolija de manual de redes.',
        sanityDelta: -25,
        xpDelta: 460,
        salaryDelta: 380,
        scrapDelta: 12,
        successRate: 0.78,
        failureOutcome: {
          text: 'El switch secundario tenía una versión de firmware obsoleta y provocó un loop de broadcast.',
          sanityDelta: -45,
          salaryDelta: -90
        }
      },
      {
        text: '🧤 Tapar el rack con una toalla vieja del baño y colocar un caloventor',
        description: 'Mantener la electrónica seca a cualquier costo.',
        sanityDelta: 5,
        xpDelta: 150,
        salaryDelta: 90,
        scrapDelta: 6,
        successRate: 0.60,
        failureOutcome: {
          text: 'El switch recalentó a 75°C por falta de ventilación y se apagó de emergencia.',
          sanityDelta: -30,
          salaryDelta: -40
        }
      }
    ]
  }
];
