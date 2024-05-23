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

  create(createArticleDto: CreateArticleDto) {
    const article = this.articleRepository.create(createArticleDto);
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
      Code: 200,
      message: 'success',
    };
  }

  async findOne(id: number) {
    const article = await this.articleRepository.findOneBy({ id });
    console.log(article, '===');
    if (article) {
      return {
        id: article.id,
        title: article.title,
        author: article.author,
        cover: article.cover,
        content: article.content,
        Code: 200,
        message: 'success',
      };
    } else {
      return {
        Code: 404,
        message: 'not found',
      };
    }
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
