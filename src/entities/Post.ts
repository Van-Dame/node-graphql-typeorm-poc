import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { User } from './User';
import { Vote } from './Vote';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() title: string;

  @Column() contents: string;

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;

  @Column() userId: number;

  @ManyToOne(type => User, user => user.posts, { cascadeRemove: true })
  @JoinColumn()
  user: User;

  @ManyToOne(type => Vote, vote => vote.user, { eager: true })
  votes: Vote[];
}
