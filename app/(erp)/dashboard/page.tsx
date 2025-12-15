'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Video, Users, FileText, Calendar, Clock } from 'lucide-react'
import {
  MATERIAS_MOCK,
  AULAS_MOCK,
  PROFESSORES_MOCK,
  PROVAS_MOCK,
} from '@/utils/mock/mock-data'

export default function Dashboard() {
  const totalMaterias = MATERIAS_MOCK.length
  const totalAulas = AULAS_MOCK.length
  const totalProfessores = PROFESSORES_MOCK.length
  const totalProvas = PROVAS_MOCK.length

  const proximasAulas = AULAS_MOCK.filter((aula) => aula.status === 'agendada')
    .sort(
      (a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime(),
    )
    .slice(0, 3)

  const proximasProvas = PROVAS_MOCK.filter(
    (prova) => prova.status === 'agendada',
  )
    .sort(
      (a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime(),
    )
    .slice(0, 3)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm sm:text-base">
              Total de Matérias
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMaterias}</div>
            <p className="text-xs text-muted-foreground mt-1">
              matérias cadastradas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm sm:text-base">
              Total de Aulas
            </CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAulas}</div>
            <p className="text-xs text-muted-foreground mt-1">
              aulas cadastradas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm sm:text-base">
              Total de Professores
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProfessores}</div>
            <p className="text-xs text-muted-foreground mt-1">
              professores cadastrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm sm:text-base">
              Total de Provas
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProvas}</div>
            <p className="text-xs text-muted-foreground mt-1">
              provas cadastradas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Próximas Aulas e Provas */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Próximas Aulas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {proximasAulas.length > 0 ? (
                proximasAulas.map((aula) => (
                  <div
                    key={aula.id}
                    className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Video className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate text-sm">
                        {aula.titulo}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {aula.materiaNome}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-muted-foreground text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(aula.dataHora)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTime(aula.dataHora)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  Nenhuma aula agendada
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Próximas Provas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {proximasProvas.length > 0 ? (
                proximasProvas.map((prova) => (
                  <div
                    key={prova.id}
                    className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0"
                  >
                    <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-destructive" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate text-sm">
                        {prova.titulo}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {prova.materiaNome}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-muted-foreground text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(prova.dataHora)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTime(prova.dataHora)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  Nenhuma prova agendada
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
