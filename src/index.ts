import * as Debug from 'debug';

import { Schema, model, connect } from 'mongoose';

import * as fs from 'fs';
import * as YAML from 'yaml';

const logD = Debug("[DEBUG]");
// const logI = Debug("[INFO]");
// const logW = Debug("[WARN]");
// const logE = Debug("[ERROR]");

// 定义集合接口
interface ITemp {
    foo: string;
}

// 定义集合字段
const tempSchema = new Schema<ITemp>({
    foo: { type: String, required: true },
});

/**
 * ORM 对象关系映射，将Temp对象映射到具体的数据库集合
 * 如果不指定第3个参数实际集合名字，会使用第一个参数+s的集合名字，就是temps,
 * 如果通过第三个参数指定实际集合名字, 将使用指定的名字
 */
const Temp = model<ITemp>('temp', tempSchema, 'temp');

// 连接并执行查询操作
run().catch(err => console.log(err));

async function run() {
    await connect(mongoUrlBuilder());
    // 查多条
    const bars  = await Temp.find({foo: "bar"}).lean().exec()
    logD(bars)

    // 查一条
    const bar = await Temp.findOne({foo: "bar"}).lean().exec()
    logD(bar?.foo)

    //   创建一条记录
    //   const temp = new Temp({
    //     foo: 'ikun',
    //   });
    //   await temp.save();

    // 更新
    // await Temp.findByIdAndUpdate
    // ...
}

function mongoUrlBuilder(filePath: string = "./config.yaml") {
    const file = fs.readFileSync(filePath, 'utf8');
    const cfg = YAML.parse(file);
    return `mongodb://${cfg.user}:${cfg.password}@${cfg.host}:${cfg.port}/${cfg.db}`
}