import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { User } from './User';
import { Post } from './Post';

@Entity()
export class Vote extends BaseEntity {
  @PrimaryColumn() userId: number;
  @PrimaryColumn() postId: number;

  @Column({ default: 1 })
  value: number;

  @ManyToOne(type => User, user => user.votes, { cascadeRemove: true })
  @JoinColumn()
  user: User;

  @ManyToOne(type => Post, post => post.votes, { cascadeRemove: true })
  @JoinColumn()
  post: Post;
}
