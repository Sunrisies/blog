import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'user_name' })
  user_name: string;

  @Column({ type: 'varchar', name: 'pass_word' })
  pass_word: string;

  @Column({ type: 'varchar', name: 'image',default:null   })
  image: string;

  @Column({ type: 'varchar', name: 'phone',default:null  })
  phone: string;

  @Column({ type: 'varchar', name: 'email', unique: true,default:null  })
  email: string;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  create_time: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  update_time: Date;
}