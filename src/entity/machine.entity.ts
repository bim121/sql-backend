import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Machine {
 @PrimaryGeneratedColumn()
 id: number;
 
 @Column()
 name: string;

 @Column()
 model: string;
 
 @Column()
 brand: string;
}