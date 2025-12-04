import { MateriaForm } from "@/components/materias/materia-form-page"

export default async function MateriaEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  return <MateriaForm mode="edit" />
}
