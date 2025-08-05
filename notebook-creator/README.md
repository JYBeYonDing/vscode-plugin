# Notebook Creator VSCode 插件

这是一个VSCode插件，可以快速创建带时间戳的markdown笔记文件。

## 功能特性

- 通过命令面板快速创建笔记文件
- 支持两种笔记类型：
  - **DailyNote**: 创建每日笔记，格式：`YYYYMMDD_N.md`
  - **WeeklyNote**: 创建周记，格式：`YYYYMMDD_week.md`（基于当周周一日期）
- 自动处理文件名冲突，递增序号（仅限每日笔记）
- 可配置笔记存储目录
- 自动打开新创建的笔记文件
- 周记文件如已存在则直接打开，避免重复创建

## 使用方法

1. 按 `Cmd+Shift+P` (macOS) 或 `Ctrl+Shift+P` (Windows/Linux) 打开命令面板
2. 输入相应命令：
   - `DailyNote`: 创建每日笔记
   - `WeeklyNote`: 创建周记
3. 首次使用时会提示设置笔记存储目录
4. 插件会自动创建新的markdown文件并打开

## 文件命名规则

### 每日笔记 (DailyNote)
- 格式：`YYYYMMDD_N.md`
- 例如：`20250106_1.md`, `20250106_2.md`, `20250106_3.md`
- 如果当天已有笔记文件，会自动递增序号

### 周记 (WeeklyNote)
- 格式：`YYYYMMDD_week.md`（基于当周周一的日期）
- 例如：如果今天是2025年8月6日（周三），但周一是8月4日，则创建 `20250804_week.md`
- 每周只创建一个周记文件，如果已存在则直接打开

## 配置

可以在VSCode设置中配置笔记存储目录：

```json
{
  "notebookCreator.notebookDirectory": "/path/to/your/notes"
}
```

## 安装和开发

1. 克隆或下载此项目
2. 在项目目录中运行 `npm install`
3. 运行 `npm run compile` 编译TypeScript代码
4. 按 `F5` 在新的VSCode窗口中测试插件

## 打包安装

1. 安装vsce工具：`npm install -g vsce`
2. 在项目目录中运行：`vsce package`
3. 安装生成的 `.vsix` 文件

## 许可证

MIT License