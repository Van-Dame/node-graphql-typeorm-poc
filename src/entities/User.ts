import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { Profile } from './Profile';
import { Post } from './Post';
import { Vote } from './Vote';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column('varchar', { length: 100 })
  firstName: string;

  @Column('varchar', { length: 100 })
  lastName: string;

  @Column('varchar', { length: 200, unique: true })
  email: string;

  @Column('boolean', { default: false })
  isAdmin: boolean;

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;

  @Column({ nullable: true })
  profileId: number;

  @OneToOne(type => Profile, { eager: true, cascadeAll: true })
  @JoinColumn()
  profile: Profile;

  @OneToMany(type => Post, post => post.user)
  posts: Post[];

  @OneToMany(type => Vote, vote => vote.user)
  votes: Vote[];
}
