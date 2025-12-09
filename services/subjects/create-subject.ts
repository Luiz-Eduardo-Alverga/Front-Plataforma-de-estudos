import { CreateSubject } from "@/interfaces/subjects";
import api from "@/lib/axios";

export async function createSubject({
    name, description, workload_hours, teacher_id, color, active
}: CreateSubject) {
    const response = await api.post('/subjects', {
        name,
        description,
        workload_hours,
        teacher_id,
        color,
        active
    })

    return response.data
}