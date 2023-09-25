import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Unique(['email'])
  @Column({ length: 60 })
  email: string;

  @Column({ length: 30 })
  password: string;
}
