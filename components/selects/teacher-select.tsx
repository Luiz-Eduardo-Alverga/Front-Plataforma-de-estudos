'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { Teacher } from '@/interfaces/teacher'
import { useInfiniteTeachers } from '@/hooks/teachers/use-infinite-teachrs'

type TeacherSelectProps = {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  onlyActive?: boolean
  disabled?: boolean
}

export function TeacherSelect({
  value,
  onChange,
  placeholder = 'Selecione um professor',
  onlyActive = true,
  disabled = false,
}: TeacherSelectProps) {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteTeachers()

  const teachers = data?.pages.flatMap((p) => p.data) ?? []

  const filtered = onlyActive
    ? teachers.filter((t: Teacher) => t.active === 1 || t.active)
    : teachers

  const canLoadMore = Boolean(hasNextPage && !isFetchingNextPage)

  return (
    <Select
      value={value ?? undefined}
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent
        onScroll={(e) => {
          const el = e.currentTarget
          const nearBottom =
            el.scrollHeight - el.scrollTop - el.clientHeight < 60

          if (nearBottom && canLoadMore) {
            fetchNextPage()
          }
        }}
      >
        {isLoading ? (
          <SelectItem value="__loading__" disabled>
            Carregando...
          </SelectItem>
        ) : filtered.length === 0 ? (
          <SelectItem value="__empty__" disabled>
            Nenhum professor encontrado
          </SelectItem>
        ) : (
          filtered.map((prof: Teacher) => (
            <SelectItem key={prof.id} value={String(prof.id)}>
              {prof.name}
            </SelectItem>
          ))
        )}

        {hasNextPage && (
          <div className="p-1">
            <Button
              type="button"
              variant="ghost"
              className="w-full justify-center"
              disabled={isFetchingNextPage}
              onClick={() => fetchNextPage()}
            >
              {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
            </Button>
          </div>
        )}
      </SelectContent>
    </Select>
  )
}

type TeacherSelectFieldProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  placeholder?: string
  onlyActive?: boolean
  disabled?: boolean
}

export function TeacherSelectField<T extends FieldValues>({
  control,
  name,
  placeholder,
  onlyActive,
  disabled,
}: TeacherSelectFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TeacherSelect
          value={field.value}
          onChange={field.onChange}
          placeholder={placeholder}
          onlyActive={onlyActive}
          disabled={disabled}
        />
      )}
    />
  )
}
