'use client'

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GraduationCap, UserCircle, FileText, CheckCircle, BarChart3 } from "lucide-react";
import { ImageWithFallback } from "@/components/images/imageWithFallback";
import Link from "next/link";

interface LandingPageProps {
  onLogin: () => void;
  onRegister: () => void;
}

export default function LandingPage({ onLogin }: LandingPageProps) {
  const features = [
    {
      icon: BookOpen,
      title: "Matérias",
      description: "Organize e gerencie todas as matérias do curso de forma centralizada",
    },
    {
      icon: GraduationCap,
      title: "Aulas",
      description: "Acompanhe o cronograma e conteúdo de cada aula ministrada",
    },
    {
      icon: UserCircle,
      title: "Professores",
      description: "Gerencie informações e disciplinas dos professores",
    },
    {
      icon: FileText,
      title: "Provas",
      description: "Controle datas, horários e resultados das avaliações",
    },
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "Gestão Simplificada",
      description: "Interface intuitiva para gerenciar todo o conteúdo educacional",
    },
    {
      icon: BarChart3,
      title: "Acompanhamento",
      description: "Visualize o progresso e desempenho de forma clara e objetiva",
    },
    {
      icon: GraduationCap,
      title: "Organização",
      description: "Mantenha todas as informações organizadas em um só lugar",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8" />
            <span className="text-xl">EduPlataforma</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="relative cursor-pointer px-3 py-2 text-foreground transition-colors hover:text-primary after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100"
            >
              Entrar
            </Link>
            <Link
              href="/registrar"
              className="relative cursor-pointer px-3 py-2 text-foreground transition-colors hover:text-primary after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100"
            >
              Registrar
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl">
              Plataforma de Estudos Completa
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl">
              Gerencie matérias, aulas, professores e provas em um único lugar. 
              Simplifique a gestão educacional e foque no que realmente importa: o aprendizado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={"/login"}>
                <Button size="lg" onClick={onLogin}>
                  Começar Agora
                </Button>
              </Link>
              <Button size="lg" variant="outline" onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Conhecer Funcionalidades
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-4/3 rounded-lg overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1596247290824-e9f12b8c574f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwb25saW5lfGVufDF8fHx8MTc2NDc3Njk3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Estudantes usando plataforma online"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted/50 py-16 sm:py-24">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl mb-4">Funcionalidades</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar uma plataforma educacional completa
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-12 w-12 mb-4 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-4/3 rounded-lg overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2NDc0MTM2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Tecnologia educacional"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl mb-4">Por que escolher nossa plataforma?</h2>
                <p className="text-muted-foreground text-lg">
                  Desenvolvida para facilitar a gestão educacional com eficiência e simplicidade
                </p>
              </div>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <benefit.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50  py-16 sm:py-24">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl text-center">
          <h2 className="text-3xl sm:text-4xl mb-4">Pronto para começar?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Acesse agora e comece a gerenciar sua plataforma de estudos de forma eficiente
          </p>
          <Link href={"/login"}>
            <Button size="lg" variant="default" onClick={onLogin}>
              Acessar Plataforma
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl text-center text-muted-foreground">
          <p>&copy; 2025 EduPlataforma. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
