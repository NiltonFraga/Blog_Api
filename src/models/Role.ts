import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    create_at: Date;

    @CreateDateColumn()
    update_at: Date;
}