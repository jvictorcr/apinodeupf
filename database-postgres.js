import sql from './db.js'
import { randomUUID } from 'node:crypto'

export class DatabasePostgresSQL {
    async list(search = '') {
        let alunos
        if (search) {
            alunos = await sql`select * from students where name ilike
        ${'%' + search + '%'}`
        } else {
            alunos = await sql`select * from students order by name asc`
        }
        return alunos
    }
    async create(aluno) {
        const alunoID = randomUUID()
        await sql`insert into students (id,name,email,age)
        values (${alunoID},${aluno.name}, ${aluno.email}, ${aluno.age})`
    }
    async update(id, aluno) {
        const { name, email, age } = aluno
        await sql`update students set name = ${name} , email = ${email} , age =
        ${age} where id = ${id}`
    }
    async delete(id) {
        await sql`delete from students where id = ${id}`
    }
}