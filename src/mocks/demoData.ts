import type { CircularItem, NewsItem, SchoolEvent } from '../types/portal';

// Datos locales servidos por el Mock REST en Vite (ningún componente de UI los importa directamente).
export const DEMO_NEWS: NewsItem[] = [
  {
    id: 'news-01',
    slug: 'muestra-proyectos-productivos-agroempresariales',
    title: 'Muestra anual de proyectos productivos agroempresariales',
    summary:
      'Estudiantes de la media técnica presentan avances de huerta escolar sostenible, vivero comunitario y gestión agroempresarial.',
    content: [
      'La comunidad educativa de la Institución Educativa Técnica Agroempresarial Pozo Azul participa en la socialización de los proyectos productivos desarrollados por los estudiantes de educación media técnica.',
      'Durante la jornada se comparten experiencias sobre agricultura sostenible, manejo responsable del suelo, costos de producción y aprovechamiento de los recursos locales del Sur de Bolívar.',
      'Invitamos a padres de familia, acudientes y habitantes de las veredas vecinas a acompañar estos espacios que fortalecen el vínculo entre educación y desarrollo rural.',
    ],
    category: 'agroempresarial',
    publishedAt: '2026-11-18',
  },
  {
    id: 'news-02',
    slug: 'orientaciones-consulta-boletines-sinai',
    title: 'Orientaciones para acudientes sobre consulta de boletines en SINAI',
    summary:
      'Paso a paso para que padres de familia y estudiantes ingresen de forma segura al portal académico SINAI desde el celular.',
    content: [
      'Con el fin de facilitar el seguimiento académico de los estudiantes, recordamos a padres de familia y acudientes que pueden consultar boletines e informes de periodo a través de la plataforma oficial SINAI.',
      'Antes de ingresar su documento de identidad o contraseña, verifique siempre que la dirección web corresponda al portal oficial de SINAI.',
      'En la sección Plataformas Educativas de este sitio encontrará el enlace directo y las instrucciones detalladas para realizar el ingreso.',
    ],
    category: 'academico',
    publishedAt: '2026-11-12',
  },
  {
    id: 'news-03',
    slug: 'preparacion-documentos-proceso-matriculas',
    title: 'Preparación de documentos para el próximo proceso de matrículas',
    summary:
      'Recomendaciones generales para familias de estudiantes nuevos y antiguos antes de acercarse a la secretaría académica.',
    content: [
      'Para agilizar la atención y evitar desplazamientos innecesarios desde las veredas, la institución invita a las familias a revisar con anticipación la lista de documentos requeridos para matrícula y renovación de cupo.',
      'Consulte la sección de Trámites y Servicios para conocer los pasos generales, requisitos habituales y horarios de atención en la sede principal.',
    ],
    category: 'institucional',
    publishedAt: '2026-11-05',
  },
  {
    id: 'news-04',
    slug: 'articulacion-comunitaria-escuela-familias',
    title: 'Jornada de articulación con familias y veredas del área de influencia',
    summary:
      'Espacio de diálogo entre directivos, docentes y acudientes sobre permanencia escolar y acompañamiento académico.',
    content: [
      'La escuela rural se fortalece con la participación activa de las familias. En este encuentro comunitario se abordan estrategias de acompañamiento en casa, asistencia escolar y comunicación oportuna.',
      'Las circulares y fechas de próximas reuniones se publican de manera centralizada en el calendario institucional.',
    ],
    category: 'comunidad',
    publishedAt: '2026-10-28',
  },
];

export const DEMO_EVENTS: SchoolEvent[] = [
  {
    id: 'evt-01',
    title: 'Jornada de entrega de informes académicos de cierre de periodo',
    date: '2026-11-28',
    timeLabel: '8:00 a. m. – 12:00 m.',
    location: 'Sede principal — Pozo Azul',
    audience: 'acudientes',
    description:
      'Encuentro con directores de grupo para entrega de boletines, diálogo pedagógico y orientaciones de cierre de año.',
  },
  {
    id: 'evt-02',
    title: 'Feria escolar de proyectos de media técnica agroempresarial',
    date: '2026-12-03',
    timeLabel: '9:00 a. m. – 1:00 p. m.',
    location: 'Zona pedagógica productiva',
    audience: 'comunidad',
    description:
      'Exposición abierta de iniciativas agropecuarias, vivero escolar y propuestas de emprendimiento estudiantil.',
  },
  {
    id: 'evt-03',
    title: 'Jornada de orientación y recepción de documentos para matrículas',
    date: '2026-12-10',
    timeLabel: '8:00 a. m. – 2:00 p. m.',
    location: 'Secretaría académica — Sede principal',
    audience: 'acudientes',
    description:
      'Atención presencial a padres y acudientes para renovación de cupos y orientación a estudiantes nuevos.',
  },
];

export const DEMO_CIRCULARS: CircularItem[] = [
  {
    id: 'cir-01',
    code: 'CIR-2026-014',
    title: 'Orientaciones generales para el cierre del año lectivo y entrega de informes',
    publishedAt: '2026-11-15',
    audience: 'Padres de familia y acudientes',
    summary: 'Cronograma de actividades finales, nivelaciones y entrega de boletines.',
    fileSizeLabel: 'PDF · 180 KB',
  },
  {
    id: 'cir-02',
    code: 'CIR-2026-012',
    title: 'Recomendaciones de acceso seguro a las plataformas SIMAT y SINAI',
    publishedAt: '2026-11-04',
    audience: 'Docentes, estudiantes y acudientes',
    summary: 'Lineamientos prácticos para verificar enlaces oficiales y proteger credenciales.',
    fileSizeLabel: 'PDF · 145 KB',
  },
];
