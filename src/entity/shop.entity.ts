import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Shop {
 @PrimaryGeneratedColumn()
 id: number;
 
 @Column()
 name: string;

 @Column()
 type: string;
 
 @Column()
 owner: string;
}