import { Achievement } from '../types/game';

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'ach-first-task',
    title: 'Hello World',
    description: 'Completaste tu primera tarea en el mundo IT.',
    icon: 'Terminal',
    isUnlocked: false,
    xpReward: 50,
    salaryReward: 50
  },
  {
    id: 'ach-first-coffee',
    title: 'Adicción Iniciada',
    description: 'Tomaste tu primer café para recuperar cordura.',
    icon: 'Coffee',
    isUnlocked: false,
    xpReward: 100,
    salaryReward: 80
  },
  {
    id: 'ach-first-burnout',
    title: 'El Límite Humano',
    description: 'Sufriste tu primer episodio de Burnout al llegar a 0 de Cordura.',
    icon: 'Flame',
    isUnlocked: false,
    xpReward: 150,
    salaryReward: 100
  },
  {
    id: 'ach-duck-owner',
    title: 'El Consultor de Hule',
    description: 'Compraste tu primer Pato de Goma.',
    icon: 'Sparkles',
    isUnlocked: false,
    xpReward: 200,
    salaryReward: 150
  },
  {
    id: 'ach-murphy-survivor',
    title: 'Héroe de Producción',
    description: 'Sobreviviste a tu primera crisis de la Ley de Murphy.',
    icon: 'ShieldAlert',
    isUnlocked: false,
    xpReward: 250,
    salaryReward: 200
  },
  {
    id: 'ach-role-helpdesk',
    title: 'Ascenso a Help Desk',
    description: 'Dejaste atrás el hardware sucio y entraste a la mesa de ayuda.',
    icon: 'Headphones',
    isUnlocked: false,
    xpReward: 500,
    salaryReward: 400
  },
  {
    id: 'ach-role-dev',
    title: 'Bienvenido al Código',
    description: 'Desbloqueaste tu primer rol de Desarrollo de Software.',
    icon: 'Code2',
    isUnlocked: false,
    xpReward: 1000,
    salaryReward: 800
  },
  {
    id: 'ach-scrap-collector',
    title: 'Chatarrero Digital',
    description: 'Recolectaste más de 100 unidades de Chatarra Electrónica.',
    icon: 'Wrench',
    isUnlocked: false,
    xpReward: 600,
    salaryReward: 500
  },
  {
    id: 'ach-senior-rank',
    title: 'El Respeto del Senior',
    description: 'Alcanzaste el rango Senior en cualquier rol.',
    icon: 'Award',
    isUnlocked: false,
    xpReward: 1200,
    salaryReward: 1000
  },
  {
    id: 'ach-architect-guru',
    title: 'Arquitecto Supremo (Nivel Gurú)',
    description: 'Llegaste a la cima de la carrera: Arquitecto de Software.',
    icon: 'Crown',
    isUnlocked: false,
    xpReward: 5000,
    salaryReward: 10000
  },
  {
    id: 'ach-keyboard-warrior',
    title: 'Guerrero del Teclado',
    description: 'Hiciste más de 500 clics para acelerar tareas.',
    icon: 'MousePointer',
    isUnlocked: false,
    xpReward: 800,
    salaryReward: 600
  },
  {
    id: 'ach-setup-god',
    title: 'Setup Nivel Dios',
    description: 'Adquiriste la Silla Ergonómica, Teclado Mecánico y Monitor Ultrawide.',
    icon: 'Monitor',
    isUnlocked: false,
    xpReward: 1500,
    salaryReward: 1200
  }
];
