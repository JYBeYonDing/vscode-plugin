# 安装和使用指南

## 快速开始

### 方法一：开发模式测试

1. 在VSCode中打开此项目文件夹
2. 按 `F5` 键启动插件开发模式
3. 在新打开的VSCode窗口中测试插件功能

### 方法二：打包安装

1. 安装vsce工具（如果还没有安装）：
   ```bash
   npm install -g vsce
   ```

2. 在项目目录中打包插件：
   ```bash
   vsce package
   ```

3. 安装生成的 `.vsix` 文件：
   - 在VSCode中按 `Cmd+Shift+P`
   - 输入 "Extensions: Install from VSIX"
   - 选择生成的 `.vsix` 文件

## 使用方法

1. 按 `Cmd+Shift+P` 打开命令面板
2. 输入相应命令：
   - `DailyNote` - 创建每日笔记
   - `WeeklyNote` - 创建周记
3. 首次使用时会提示设置笔记存储目录
4. 插件会自动创建并打开新的markdown文件

## 文件命名示例

### 每日笔记 (DailyNote)
- 今天是2025年1月6日，第一个文件：`20250106_1.md`
- 同一天的第二个文件：`20250106_2.md`
- 同一天的第三个文件：`20250106_3.md`

### 周记 (WeeklyNote)
- 如果今天是2025年8月6日（周三），但周一是8月4日：`20250804_week.md`
- 每周只创建一个周记文件，如果已存在则直接打开

## 配置笔记目录

可以在VSCode设置中预先配置笔记目录：

1. 打开VSCode设置 (`Cmd+,`)
2. 搜索 "notebook creator"
3. 设置 "Notebook Directory" 为你想要的目录路径

或者直接在 `settings.json` 中添加：
```json
{
  "notebookCreator.notebookDirectory": "/Users/你的用户名/Documents/notes"
}
```

## 故障排除

如果遇到问题：

1. 确保设置的目录路径是绝对路径
2. 确保VSCode有权限访问指定目录
3. 检查目录路径是否正确（不要有拼写错误）

## 功能特性

- ✅ 自动生成带日期的文件名
- ✅ 处理文件名冲突（自动递增序号）
- ✅ 可配置存储目录
- ✅ 自动创建目录（如果不存在）
- ✅ 自动打开新创建的文件
- ✅ 添加基本的文件头信息