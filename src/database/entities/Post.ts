import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Generated,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany
  } from 'typeorm';
import {User } from './User'
import { Comment } from './Comment'

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @Generated('uuid')
    uuid: string;
  
    @Column()
    title: string;
  
    @Column({ type: 'text'})
    body: string;

    @ManyToOne(type => User, user => user.posts, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    } )
    user: User;

    @OneToMany(type => Comment, comment => comment.post)
    comments: Comment[];

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @Column({ type: 'timestamp', default: null})
    publishedAt: Date;
}
