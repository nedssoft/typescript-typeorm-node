import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Generated,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm';
import {User} from './User'
import { Post } from './Post'

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @Generated('uuid')
    uuid: string;
  
    @Column({ type: 'text'})
    comment: string;
    
    @ManyToOne(type => Post, post => post.comments, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    post: Post

    @ManyToOne(type => User, user => user.comments, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    user: User

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;
}
