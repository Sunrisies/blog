import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  publish_time: string;

  @Column()
  update_time: string;

  @Column()
  views: number;

  @Column()
  is_top: boolean;

  @Column()
  is_recommend: boolean;

  @Column()
  is_delete: boolean;

  @Column()
  is_publish: boolean;

  @Column()
  is_hide: boolean;
}
