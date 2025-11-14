export interface Tip {
  title: string;
  description: string;
  link: string;
  type: 'stories' | 'reels' | 'posts';
}

export const tips: Tip[] = [
  {
    title: 'Checklist de mantenimiento del lavarropas',
    description: 'Aprendé a extender la vida útil de tus electrodomésticos con micro-tutoriales en nuestras historias.',
    link: 'https://www.instagram.com/stories/electrocentro/',
    type: 'stories'
  },
  {
    title: 'Reel: cómo detectar sobrecargas',
    description: 'Nuestros técnicos te muestran señales tempranas de fallas eléctricas para evitar cortes y pérdidas.',
    link: 'https://www.instagram.com/reels/electrocentro/',
    type: 'reels'
  },
  {
    title: 'Guía de eficiencia energética',
    description: 'Descargá la lista de chequeo con acciones simples que reducen tu consumo eléctrico.',
    link: 'https://www.instagram.com/electrocentro/',
    type: 'posts'
  }
];
