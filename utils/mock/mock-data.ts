// Dados mock para o sistema de plataforma de estudos

export interface Professor {
    id: string;
    nome: string;
    email: string;
    especialidade: string;
    telefone: string;
    dataAdmissao: string;
    status: 'ativo' | 'inativo';
  }
  
  export interface Materia {
    id: string;
    nome: string;
    descricao: string;
    cargaHoraria: number;
    professorId: string;
    professorNome: string;
    cor: string;
    status: 'ativa' | 'inativa';
  }
  
  export interface Aula {
    id: string;
    titulo: string;
    descricao: string;
    materiaId: string;
    materiaNome: string;
    professorId: string;
    professorNome: string;
    dataHora: string;
    duracao: number;
    tipo: 'presencial' | 'online';
    status: 'agendada' | 'concluida' | 'cancelada';
  }
  
  export interface Prova {
    id: string;
    titulo: string;
    descricao: string;
    materiaId: string;
    materiaNome: string;
    professorId: string;
    professorNome: string;
    dataHora: string;
    duracao: number;
    valorTotal: number;
    status: 'agendada' | 'realizada' | 'cancelada';
  }
  
  export const PROFESSORES_MOCK: Professor[] = [
    {
      id: '1',
      nome: 'Dr. Carlos Silva',
      email: 'carlos.silva@escola.com',
      especialidade: 'Matemática',
      telefone: '(11) 98765-4321',
      dataAdmissao: '2020-03-15',
      status: 'ativo'
    },
    {
      id: '2',
      nome: 'Profa. Ana Santos',
      email: 'ana.santos@escola.com',
      especialidade: 'Português',
      telefone: '(11) 98765-4322',
      dataAdmissao: '2019-08-10',
      status: 'ativo'
    },
    {
      id: '3',
      nome: 'Prof. João Oliveira',
      email: 'joao.oliveira@escola.com',
      especialidade: 'Física',
      telefone: '(11) 98765-4323',
      dataAdmissao: '2021-01-20',
      status: 'ativo'
    },
    {
      id: '4',
      nome: 'Profa. Maria Costa',
      email: 'maria.costa@escola.com',
      especialidade: 'Química',
      telefone: '(11) 98765-4324',
      dataAdmissao: '2018-05-12',
      status: 'ativo'
    },
    {
      id: '5',
      nome: 'Prof. Pedro Lima',
      email: 'pedro.lima@escola.com',
      especialidade: 'História',
      telefone: '(11) 98765-4325',
      dataAdmissao: '2022-02-28',
      status: 'inativo'
    }
  ];
  
  export const MATERIAS_MOCK: Materia[] = [
    {
      id: '1',
      nome: 'Cálculo I',
      descricao: 'Introdução ao cálculo diferencial e integral',
      cargaHoraria: 80,
      professorId: '1',
      professorNome: 'Dr. Carlos Silva',
      cor: '#4f46e5',
      status: 'ativa'
    },
    {
      id: '2',
      nome: 'Literatura Brasileira',
      descricao: 'Estudo da literatura brasileira do período colonial à contemporaneidade',
      cargaHoraria: 60,
      professorId: '2',
      professorNome: 'Profa. Ana Santos',
      cor: '#22c55e',
      status: 'ativa'
    },
    {
      id: '3',
      nome: 'Mecânica Clássica',
      descricao: 'Fundamentos da física newtoniana e suas aplicações',
      cargaHoraria: 80,
      professorId: '3',
      professorNome: 'Prof. João Oliveira',
      cor: '#f59e0b',
      status: 'ativa'
    },
    {
      id: '4',
      nome: 'Química Orgânica',
      descricao: 'Estudo dos compostos orgânicos e suas reações',
      cargaHoraria: 60,
      professorId: '4',
      professorNome: 'Profa. Maria Costa',
      cor: '#ef4444',
      status: 'ativa'
    },
    {
      id: '5',
      nome: 'História do Brasil',
      descricao: 'História do Brasil desde o descobrimento até os dias atuais',
      cargaHoraria: 40,
      professorId: '5',
      professorNome: 'Prof. Pedro Lima',
      cor: '#8b5cf6',
      status: 'inativa'
    }
  ];
  
  export const AULAS_MOCK: Aula[] = [
    {
      id: '1',
      titulo: 'Introdução aos Limites',
      descricao: 'Conceitos básicos de limites e suas propriedades',
      materiaId: '1',
      materiaNome: 'Cálculo I',
      professorId: '1',
      professorNome: 'Dr. Carlos Silva',
      dataHora: '2024-12-05T14:00:00',
      duracao: 90,
      tipo: 'presencial',
      status: 'agendada'
    },
    {
      id: '2',
      titulo: 'Derivadas Fundamentais',
      descricao: 'Regras de derivação e aplicações práticas',
      materiaId: '1',
      materiaNome: 'Cálculo I',
      professorId: '1',
      professorNome: 'Dr. Carlos Silva',
      dataHora: '2024-11-28T14:00:00',
      duracao: 90,
      tipo: 'presencial',
      status: 'concluida'
    },
    {
      id: '3',
      titulo: 'Machado de Assis',
      descricao: 'Análise das obras de Machado de Assis',
      materiaId: '2',
      materiaNome: 'Literatura Brasileira',
      professorId: '2',
      professorNome: 'Profa. Ana Santos',
      dataHora: '2024-12-06T10:00:00',
      duracao: 60,
      tipo: 'online',
      status: 'agendada'
    },
    {
      id: '4',
      titulo: 'Leis de Newton',
      descricao: 'As três leis de Newton e suas aplicações',
      materiaId: '3',
      materiaNome: 'Mecânica Clássica',
      professorId: '3',
      professorNome: 'Prof. João Oliveira',
      dataHora: '2024-12-07T15:30:00',
      duracao: 90,
      tipo: 'presencial',
      status: 'agendada'
    },
    {
      id: '5',
      titulo: 'Hidrocarbonetos',
      descricao: 'Classificação e nomenclatura de hidrocarbonetos',
      materiaId: '4',
      materiaNome: 'Química Orgânica',
      professorId: '4',
      professorNome: 'Profa. Maria Costa',
      dataHora: '2024-11-25T13:00:00',
      duracao: 60,
      tipo: 'presencial',
      status: 'concluida'
    }
  ];
  
  export const PROVAS_MOCK: Prova[] = [
    {
      id: '1',
      titulo: 'Prova P1 - Cálculo I',
      descricao: 'Avaliação sobre limites e derivadas',
      materiaId: '1',
      materiaNome: 'Cálculo I',
      professorId: '1',
      professorNome: 'Dr. Carlos Silva',
      dataHora: '2024-12-15T14:00:00',
      duracao: 120,
      valorTotal: 10.0,
      status: 'agendada'
    },
    {
      id: '2',
      titulo: 'Prova P1 - Literatura',
      descricao: 'Avaliação sobre literatura romântica e realista',
      materiaId: '2',
      materiaNome: 'Literatura Brasileira',
      professorId: '2',
      professorNome: 'Profa. Ana Santos',
      dataHora: '2024-12-10T10:00:00',
      duracao: 90,
      valorTotal: 10.0,
      status: 'agendada'
    },
    {
      id: '3',
      titulo: 'Prova Final - Mecânica',
      descricao: 'Avaliação final de mecânica clássica',
      materiaId: '3',
      materiaNome: 'Mecânica Clássica',
      professorId: '3',
      professorNome: 'Prof. João Oliveira',
      dataHora: '2024-11-20T15:30:00',
      duracao: 150,
      valorTotal: 10.0,
      status: 'realizada'
    },
    {
      id: '4',
      titulo: 'Prova P2 - Química Orgânica',
      descricao: 'Avaliação sobre funções orgânicas',
      materiaId: '4',
      materiaNome: 'Química Orgânica',
      professorId: '4',
      professorNome: 'Profa. Maria Costa',
      dataHora: '2024-12-18T13:00:00',
      duracao: 90,
      valorTotal: 10.0,
      status: 'agendada'
    }
  ];
  