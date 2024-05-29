/* eslint-disable */
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import * as _ from 'lodash';
const YAML_CONFIG_FILENAME = 'config/config.yml';
const filePath = join(__dirname, '../', YAML_CONFIG_FILENAME);
const envfilePath = join(
  __dirname,
  '../',
  `config/config.${process.env.NODE_ENV || 'development'}.yml`,
);
const commonConfig = yaml.load(readFileSync(filePath, 'utf8'));
const envConfig = yaml.load(readFileSync(envfilePath, 'utf8'));
// 为什么要导出一个函数呢？
// 因为在Nestjs中，我们一般会将配置信息放在一个模块中，然后在其他模块中通过一个函数来获取配置信息。
// 这样做的好处是可以将配置信息和业务逻辑分离，使得代码更加清晰。
// 另外，在Nestjs中，我们一般会将配置信息放在一个单独的文件中，比如config.yml。
// 而在其他模块中，我们只需要调用这个函数就可以获取到配置信息。
export default () => {
  return _.merge(commonConfig, envConfig); // 读取yaml配置文件并解析为json对象返回
};
