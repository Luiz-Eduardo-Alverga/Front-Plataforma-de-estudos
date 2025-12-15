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
import { useInfiniteSubjects } from '@/hooks/subjects/use-infinite-subjects'
import { Subject } from '@/interfaces/subject'

type SubjectSelectProps = {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  onlyActive?: boolean
  disabled?: boolean
}

export function SubjectSelect({
  value,
  onChange,
  placeholder = 'Selecione uma matéria',
  onlyActive = true,
  disabled = false,
}: SubjectSelectProps) {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteSubjects()

  const subjects = data?.pages.flatMap((p) => p.data) ?? []

  const filtered = onlyActive
    ? subjects.filter((t: Subject) => t.active === 1 || t.active)
    : subjects

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
            Nenhuma matéria encontrado
          </SelectItem>
        ) : (
          filtered.map((subject: Subject) => (
            <SelectItem key={subject.id} value={String(subject.id)}>
              {subject.name}
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

type SubjectSelectFieldProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  placeholder?: string
  onlyActive?: boolean
  disabled?: boolean
}

export function SubjectSelectField<T extends FieldValues>({
  control,
  name,
  placeholder,
  onlyActive,
  disabled,
}: SubjectSelectFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <SubjectSelect
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
