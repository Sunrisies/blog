export class CreateArticleDto {
  // 文章名称
  title: string;

  // 文章内容
  content: string;

  // 文章分类

  category: string;

  // 文章标签

  tags: string;

  // 文章封面

  cover: string;

  // 文章状态

  status: string;

  // 文章作者

  author: string;

  // 文章发布时间

  publish_time: Date;

  // 文章更新时间

  update_time: Date;

  // 文章浏览量

  views: number;

  // 文章是否置顶

  is_top: boolean;

  // 文章是否推荐

  is_recommend: boolean;

  // 文章是否删除

  is_delete: boolean;

  // 文章是否发布

  is_publish: boolean;

  // 文章是否隐藏

  is_hide: boolean;
}
