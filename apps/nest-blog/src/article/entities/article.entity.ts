import { Entity, Column, PrimaryGeneratedColumn,UpdateDateColumn } from 'typeorm';

@Entity()
export class Article {
  // 文章名称
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
  // 文章内容 内容比较多，longtext 类型

  @Column('longtext')
  content: string;

  @Column()
  category: string;

  @Column()
  tags: string;

  @Column()
  cover: string;

  @Column()
  status: string;

  @Column()
  author: string;

  @UpdateDateColumn()
  publish_time: Date;

  @UpdateDateColumn()
  update_time: Date;

  @Column()
  views: number;

  @Column({ default: false })
  is_top: boolean;

  @Column({ default: false })
  is_recommend: boolean;

  @Column({ default: false })
  is_delete: boolean;

  @Column({ default: false })
  is_publish: boolean;

  @Column({ default: false })
  is_hide: boolean;
}
