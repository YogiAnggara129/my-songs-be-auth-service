import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'uuid' })
  userId!: string;

  @Column('varchar')
  token!: string;

  @Column({ type: 'timestamp with time zone', default: () => 'NOW()' })
  createdAt?: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  revokedAt?: Date | null;

  @Column('boolean', { default: false })
  isRevoked!: boolean;

  @Column({ type: 'text', nullable: true })
  replacedByToken?: string | null;

  @ManyToOne(() => User, (user) => user.refreshTokens)
  @JoinColumn({ name: 'userId' })
  user?: User;
}
