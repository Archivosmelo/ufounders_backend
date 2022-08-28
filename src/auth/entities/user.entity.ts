import { Column, Entity, ObjectIdColumn, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: string; // TypeORM needs this for mongo to differenciate from _id

    @Column()
    username: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {
        select: false
    })
    password: string;

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

}
