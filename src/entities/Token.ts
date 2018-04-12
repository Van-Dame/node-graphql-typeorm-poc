import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne
} from 'typeorm';
import { User } from './User';

@Entity()
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() value: string;

  @CreateDateColumn() createdAt: Date;

  @Column() userId: number;

  @ManyToOne(type => User, user => user.tokens, { cascadeRemove: true })
  @JoinColumn()
  user: User;
}
