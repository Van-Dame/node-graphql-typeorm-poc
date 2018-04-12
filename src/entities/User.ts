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
import { Token } from './Token';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column('varchar', { length: 200, unique: true })
  email: string;

  @Column() salt: string;

  @Column() passwordHash: string;

  @Column('boolean', { default: false })
  isAdmin: boolean;

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;

  @Column({ nullable: true })
  profileId: number;

  @OneToOne(type => Profile, { cascadeAll: true })
  @JoinColumn()
  profile: Profile;

  @OneToMany(type => Post, post => post.user)
  posts: Post[];

  @OneToMany(type => Vote, vote => vote.user)
  votes: Vote[];

  @OneToMany(type => Token, token => token.user)
  tokens: Token[];
}
