import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class UserEntity
{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', {
        length: 50,
        nullable: false
    })
    username: string;

    @Column('varchar', {
        length: 100,
        nullable: false,
        select: true
    })
    password: string;

    @Column('varchar', {
        length: 50,
        nullable: true
    })
    firstName: string;

    @Column('varchar', {
        length: 50,
        nullable: true
    })
    lastName: string;

    @Column({ default: true })
    isActive: boolean;
}