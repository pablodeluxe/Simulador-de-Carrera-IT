import { ConsumableItem, ShopUpgrade } from '../types/game';

export const CONSUMABLES: ConsumableItem[] = [
  {
    id: 'coffee',
    name: 'Café Expresso Doble',
    description: 'El combustible nuclear de todo informático. Recupera +15% de tu Cordura.',
    icon: 'Coffee',
    cost: 15,
    currency: 'salary',
    sanityRestorePercent: 15,
    cooldownSeconds: 0
  },
  {
    id: 'fast-food',
    name: 'Porción de Pizza Fría / Comida Rápida',
    description: 'Sabor a queso recalentado y nostalgia de delivery nocturno. Recupera +50% de Cordura.',
    icon: 'Utensils',
    cost: 45,
    currency: 'salary',
    sanityRestorePercent: 50,
    cooldownSeconds: 0
  },
  {
    id: 'energy-drink',
    name: 'Bebida Energizante Ultra',
    description: 'Taurina pura con sabor a batería de litio. Recupera +80% de Cordura.',
    icon: 'Zap',
    cost: 90,
    currency: 'salary',
    sanityRestorePercent: 80,
    cooldownSeconds: 0
  },
  {
    id: 'desk-nap',
    name: 'Siesta de 20 Minutos bajo el Escritorio',
    description: 'Nadie te ve si apagas el monitor. Restaura el 100% de tu Cordura al instante.',
    icon: 'Moon',
    cost: 160,
    currency: 'salary',
    sanityRestorePercent: 100,
    cooldownSeconds: 5
  }
];

export const SHOP_UPGRADES: ShopUpgrade[] = [
  // Setup Category
  {
    id: 'chair',
    name: 'Silla Ergonómica con Soporte Lumbar',
    category: 'setup',
    description: 'Dile adiós al dolor de espalda por encorvarte como un camarón.',
    icon: 'Armchair',
    cost: 120,
    currency: 'salary',
    level: 0,
    maxLevel: 10,
    costMultiplier: 1.6,
    effectDescription: '+1.5 de regeneración pasiva de cordura / seg',
    sanityRegenBonus: 1.5
  },
  {
    id: 'keyboard',
    name: 'Teclado Mecánico RGB (Switches Blue)',
    category: 'setup',
    description: 'Hacer sonar las teclas tan fuerte que tus compañeros crean que estás hackeando la NASA.',
    icon: 'Keyboard',
    cost: 180,
    currency: 'salary',
    level: 0,
    maxLevel: 10,
    costMultiplier: 1.7,
    effectDescription: '+25% velocidad al hacer clic en tareas',
    taskSpeedMultiplier: 0.25
  },
  {
    id: 'monitor',
    name: 'Monitor Ultrawide Curvo 49 Pulgadas',
    category: 'setup',
    description: 'Espacio para tener 8 terminales, Spotify, Slack y un video de gatos a la vez.',
    icon: 'Monitor',
    cost: 350,
    currency: 'salary',
    level: 0,
    maxLevel: 5,
    costMultiplier: 2.2,
    effectDescription: '+1 ranura de tarea simultánea',
    concurrentTaskSlotsBonus: 1
  },
  {
    id: 'headphones',
    name: 'Auriculares con Cancelación de Ruido Activa',
    category: 'setup',
    description: 'Aísla las conversaciones sobre el clima y las risas estruendosas de recursos humanos.',
    icon: 'Headphones',
    cost: 250,
    currency: 'salary',
    level: 0,
    maxLevel: 8,
    costMultiplier: 1.8,
    effectDescription: '+20 de Cordura Máxima',
    maxSanityBonus: 20
  },
  {
    id: 'server-rig',
    name: 'Granja Casera de Raspberry Pis',
    category: 'setup',
    description: 'Un rack artesanal parpadeando en la esquina de tu habitación.',
    icon: 'Server',
    cost: 50,
    currency: 'scrap',
    level: 0,
    maxLevel: 8,
    costMultiplier: 2.0,
    effectDescription: 'Genera +1 Chatarra Electrónica pasiva cada 10 seg',
    scrapChanceBonus: 0.15
  },

  // Emotional Support Pets
  {
    id: 'pet-duck',
    name: '🦆 Pato de Goma (Rubber Duck Debugger)',
    category: 'pet',
    description: 'Explícale tu código línea por línea hasta que te des cuenta de que olvidaste un punto y coma.',
    icon: 'Sparkles',
    cost: 150,
    currency: 'salary',
    level: 0,
    maxLevel: 10,
    costMultiplier: 1.8,
    effectDescription: '+20% de Experiencia (XP) en todas las tareas',
    xpMultiplier: 0.20
  },
  {
    id: 'pet-cat',
    name: '🐱 Gato Programador en el Teclado',
    category: 'pet',
    description: 'Camina sobre la barra espaciadora y hace clics automáticos mientras duerme plácidamente.',
    icon: 'Cat',
    cost: 300,
    currency: 'salary',
    level: 0,
    maxLevel: 10,
    costMultiplier: 1.9,
    effectDescription: '+1 clic automático por segundo en la tarea activa',
    autoClickPower: 1
  },
  {
    id: 'pet-hamster',
    name: '🐹 Hámster en Rueda de Servidor',
    category: 'pet',
    description: 'Genera energía cinética de emergencia cuando se corta la luz en el edificio.',
    icon: 'Zap',
    cost: 400,
    currency: 'salary',
    level: 0,
    maxLevel: 8,
    costMultiplier: 2.0,
    effectDescription: '+1.0 de regeneración pasiva de cordura / seg',
    sanityRegenBonus: 1.0
  },
  {
    id: 'pet-cactus',
    name: '🌵 Cactus Indestructible de Oficina',
    category: 'pet',
    description: 'Resiste la radiación de 4 monitores, café derramado y semanas sin agua.',
    icon: 'Shield',
    cost: 40,
    currency: 'scrap',
    level: 0,
    maxLevel: 5,
    costMultiplier: 2.2,
    effectDescription: 'Reduce el costo de cordura de todas las tareas en 10%',
    sanityCostReduction: 0.10
  },

  // Certifications & Courses
  {
    id: 'course-cleancode',
    name: '📘 Curso de Clean Code & Refactoring',
    category: 'course',
    description: 'Aprende a nombrar variables como un ser humano civilizado en vez de usar `var x1_final_test`.',
    icon: 'BookOpen',
    cost: 450,
    currency: 'salary',
    level: 0,
    maxLevel: 5,
    costMultiplier: 2.2,
    effectDescription: '+35% multiplicador permanente de XP',
    xpMultiplier: 0.35
  },
  {
    id: 'course-cloud',
    name: '☁️ Certificación AWS / Cloud Solutions Architect',
    category: 'course',
    description: 'Un diploma digital con insignia dorada que multiplica tu valor en el mercado laboral.',
    icon: 'Cloud',
    cost: 750,
    currency: 'salary',
    level: 0,
    maxLevel: 5,
    costMultiplier: 2.5,
    effectDescription: '+40% de Sueldo pasivo y recompensas de tareas',
    salaryMultiplier: 0.40
  },
  {
    id: 'course-scrum',
    name: '📋 Certificado de Scrum Master Ninja',
    category: 'course',
    description: 'Domina el arte de mover post-its de "In Progress" a "Done" y decir "bloqueante".',
    icon: 'Trello',
    cost: 500,
    currency: 'salary',
    level: 0,
    maxLevel: 5,
    costMultiplier: 2.1,
    effectDescription: 'Reduce el costo de cordura de las tareas en 12%',
    sanityCostReduction: 0.12
  },
  {
    id: 'course-vim',
    name: '⚡ Maestría en Vim & Terminal Linux',
    category: 'course',
    description: 'Por fin descubres el comando secreto para salir de Vim (`:wq!`) sin reiniciar la PC.',
    icon: 'Terminal',
    cost: 60,
    currency: 'scrap',
    level: 0,
    maxLevel: 5,
    costMultiplier: 2.3,
    effectDescription: '+30% velocidad de ejecución de tareas',
    taskSpeedMultiplier: 0.30
  }
];
