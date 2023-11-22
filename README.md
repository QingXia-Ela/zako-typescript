# zako-typescript

让你的 ts server/compiler 变成雌小鬼

> 有笨蛋在变量“a”被声明之前就使用了喵，不被允许的行为却还要强制执行，好丢人喵~

## 实现原理

`ts server`: 调用原 ts 服务器自带的设置错误提示语言文件方法，并使用新的内容进行替换；VSCode 手动指定 ts 服务器目录，让其指向本包创建服务器的 js 文件。

`tsc`: 还没想好怎么做

## 安装

### 覆盖IDE错误提示 (比如 VSCode IntelliSense)

以 VSCode 为例，有三种方式可以替换 TS 错误提示：

#### 使用独立仓库（推荐）

- 克隆本仓库
- 使用你喜欢的包管理器安装依赖 `npm i` / `pnpm i`
- 在 VSCode 设置中找到 `typescript.tsdk` 选项，并将他指向仓库文件夹内的 `/lib` 文件夹
- 重启 IDE，或重启 TS 语言服务器，就可以看到效果了

你可以定期同步本仓库获取最新的语句更替

#### 作为项目依赖

- 下载依赖：`npm i --save-dev zako-typescript`
- 在 VSCode 设置中找到 `typescript.tsdk` 选项，并将他指向 `node_modules` 下的 `zako-typescript/lib` 文件夹
  
  举例：`./node_modules/zako-typescript/lib/`

  **注意：** 本项可能会因为使用的包管理器不同而发生变更，具体请参考自己使用的包管理器的管理模式
  
- 重启 IDE，或重启 TS 语言服务器，就可以看到效果了

**注意：** 假如提示找不到 `typescript` 包可以尝试 `npm i --save-dev typescript` 对包进行手动补充

#### 覆盖 VSCode 本地文件（不推荐）

这种做法暂时还没想到一个比较合理的解决方案，等以后更新喵

## 修改预设的语言

可以到本包下的 `config.json` 进行修改

```json
{
  "lang": "zako/zh-cn",
  "basicLang": "zh-cn"
}
```

- `lang` 字段是预设字段，这里可以前往文件夹 `lang/` 下查看所有可选语言
- `basicLang` 字段是基础语言，即 ts 内置预设的语言选择，可以前往 [这里](https://github.com/microsoft/TypeScript/tree/main/src/loc/lcl) 查看所有可选语言

### 自行设定语句

在包根目录下面有个 `customLang.js`，此处的语句优先级为最高，直接进行增加即可，其附带类型提示

## 贡献本项目

贡献方向分为以下几种：

- 语言文件内容补充
- ts 周边相关服务内容替换
- tsc 内容替换实现
- 查找本项目所有包含 `TODO!` 声明的地方进行修补

## 免责声明

**本项目纯属娱乐，请勿用在任何与生产环境有关的地方！！**

## LICENSE

[Apache 2.0](./LICENSE)

原仓库 [Typescript](https://github.com/microsoft/TypeScript)
