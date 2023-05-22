import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class User {
 @PrimaryGeneratedColumn()
 id: number;
 
 @Column()
 name: string;

 @Column()
 password: string;
 
 @Column()
 email: string;
 
 @OneToMany(() => Post, post => post.user)
  posts: Post[];
}