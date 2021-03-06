import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert
} from 'typeorm';
import { Post } from './Post';
import { Comment } from './Comment';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
 
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @OneToMany(
    type => Post,
    post => post.author,
  )
  posts: Post[];

  @OneToMany(
    type => Comment,
    comment => comment.user,
  )
  comments: Comment[];

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
  
  toJSON() {
    delete this.password
    return this
  }

  validatePassword(password: string) {
    return bcrypt.compare(password, this.password)
  }

  @BeforeInsert()
  async updatePasswords() {
    const password =  await bcrypt.hashSync(this.password, 10);
    this.password = password
  }

}
