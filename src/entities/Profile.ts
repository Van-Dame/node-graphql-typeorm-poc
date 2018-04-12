import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

enum Gender {
  Male = 'Male',
  Female = 'Female'
}

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column('varchar', { length: 100 })
  firstName: string;

  @Column('varchar', { length: 100 })
  lastName: string;

  @Column('varchar') gender: Gender;

  @Column('varchar', { nullable: true })
  photo: string;

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;
}
