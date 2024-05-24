import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Code, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { title } from 'process';
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

 async create(createArticleDto: CreateArticleDto) {
    if (!createArticleDto.cover || !createArticleDto.title || !createArticleDto.author || !createArticleDto.content) {
      throw new Error('cover, title, author, and content are required');
    }
    // createArticleDto 中的cover跟title,author ,content都是必填项,创建时间和更新时间由数据库自动生成
    // createArticleDto.publish_time = new Date();
    const article =await this.articleRepository.create(createArticleDto);
    const result =await this.articleRepository.save(article);
    if(result){
      return {
        code: 200,
        message: '创建成功',
        data: result,
      };
    }else{
      return {
        code: 500,
        message: '创建失败',
        data: null,
      };
    }
  }

  async updateArticle(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.articleRepository.findOneBy({ id });
    if (!article) {
      throw new Error('文章不存在');
    }
    if (updateArticleDto.cover) {
      article.cover = updateArticleDto.cover;
    }
    if (updateArticleDto.title) {
      article.title = updateArticleDto.title;
    }
    if (updateArticleDto.author) {
      article.author = updateArticleDto.author;
    }
    if (updateArticleDto.content) {
    }
    return this.articleRepository.save(article);
  }

  async findAll() {
    const articles = await this.articleRepository.find();
    const data = [];
    articles.forEach((article) => {
      data.push({
        id: article.id,
        title: article.title,
        author: article.author,
        cover: article.cover,
      });
    });
    console.log(data, '===');
    return {
      data: data,
      total: articles.length,
      page: 1,
      pageSize: 10,
      code: 200,
      message: 'success',
    };
  }

  async findOne(id: number) {
    const article = await this.articleRepository.findOneBy({ id });
    if (article) {
      return {
        data: { ...article },
        code: 200,
        message: 'success',
      };
    } else {
      return {
        code: 404,
        message: 'not found',
        data: null,
      };
    }
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  async remove(id: number) {
    const article = await this.articleRepository.findOneBy({ id });
    if (article) {
      await this.articleRepository.delete(id);
      return {
        code: 200,
        message: '删除成功',
      };
    } else {
      return {
        code: 404,
        message: '文章不存在',
      };
    }
  }
}
