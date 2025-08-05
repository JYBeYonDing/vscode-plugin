import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    console.log('Notebook Creator 插件已激活');

    // 注册dailyNote命令
    let dailyDisposable = vscode.commands.registerCommand('notebook-creator.dailyNote', async () => {
        try {
            await dailyNote();
        } catch (error) {
            vscode.window.showErrorMessage(`创建笔记失败: ${error}`);
        }
    });

    // 注册weeklyNote命令
    let weeklyDisposable = vscode.commands.registerCommand('notebook-creator.weeklyNote', async () => {
        try {
            await weeklyNote();
        } catch (error) {
            vscode.window.showErrorMessage(`创建周记失败: ${error}`);
        }
    });

    context.subscriptions.push(dailyDisposable);
    context.subscriptions.push(weeklyDisposable);
}

async function dailyNote() {
    // 获取配置的笔记目录
    const config = vscode.workspace.getConfiguration('notebookCreator');
    let notebookDir = config.get<string>('notebookDirectory');

    // 如果没有配置目录，提示用户设置
    if (!notebookDir || notebookDir.trim() === '') {
        const result = await vscode.window.showInputBox({
            prompt: '请输入笔记存储目录的绝对路径',
            placeHolder: '例如: /Users/username/Documents/notes'
        });

        if (!result) {
            return; // 用户取消了输入
        }

        notebookDir = result.trim();
        
        // 保存到配置中
        await config.update('notebookDirectory', notebookDir, vscode.ConfigurationTarget.Global);
    }

    // 确保目录存在
    if (!fs.existsSync(notebookDir)) {
        try {
            fs.mkdirSync(notebookDir, { recursive: true });
        } catch (error) {
            throw new Error(`无法创建目录 ${notebookDir}: ${error}`);
        }
    }

    // 生成文件名
    const fileName = generateFileName(notebookDir);
    const filePath = path.join(notebookDir, fileName);

    // 创建文件
    try {
        const initialContent = `# ${fileName.replace('.md', '')}\n\n创建时间: ${new Date().toLocaleString()}\n\n---\n\n`;
        fs.writeFileSync(filePath, initialContent, 'utf8');
        
        // 打开文件
        const document = await vscode.workspace.openTextDocument(filePath);
        await vscode.window.showTextDocument(document);
        
        vscode.window.showInformationMessage(`笔记文件已创建: ${fileName}`);
    } catch (error) {
        throw new Error(`无法创建文件 ${filePath}: ${error}`);
    }
}

async function weeklyNote() {
    // 获取配置的笔记目录
    const config = vscode.workspace.getConfiguration('notebookCreator');
    let notebookDir = config.get<string>('notebookDirectory');

    // 如果没有配置目录，提示用户设置
    if (!notebookDir || notebookDir.trim() === '') {
        const result = await vscode.window.showInputBox({
            prompt: '请输入笔记存储目录的绝对路径',
            placeHolder: '例如: /Users/username/Documents/notes'
        });

        if (!result) {
            return; // 用户取消了输入
        }

        notebookDir = result.trim();
        
        // 保存到配置中
        await config.update('notebookDirectory', notebookDir, vscode.ConfigurationTarget.Global);
    }

    // 确保目录存在
    if (!fs.existsSync(notebookDir)) {
        try {
            fs.mkdirSync(notebookDir, { recursive: true });
        } catch (error) {
            throw new Error(`无法创建目录 ${notebookDir}: ${error}`);
        }
    }

    // 生成周记文件名
    const fileName = generateWeeklyFileName();
    const filePath = path.join(notebookDir, fileName);

    // 检查文件是否已存在
    if (fs.existsSync(filePath)) {
        // 如果文件已存在，直接打开
        const document = await vscode.workspace.openTextDocument(filePath);
        await vscode.window.showTextDocument(document);
        vscode.window.showInformationMessage(`周记文件已存在，已打开: ${fileName}`);
        return;
    }

    // 创建文件
    try {
        const mondayDate = getMondayOfCurrentWeek();
        const initialContent = `# ${fileName.replace('.md', '')}\n\n创建时间: ${new Date().toLocaleString()}\n周一日期: ${mondayDate.toLocaleDateString()}\n\n---\n\n`;
        fs.writeFileSync(filePath, initialContent, 'utf8');
        
        // 打开文件
        const document = await vscode.workspace.openTextDocument(filePath);
        await vscode.window.showTextDocument(document);
        
        vscode.window.showInformationMessage(`周记文件已创建: ${fileName}`);
    } catch (error) {
        throw new Error(`无法创建文件 ${filePath}: ${error}`);
    }
}

function getMondayOfCurrentWeek(): Date {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = 周日, 1 = 周一, ..., 6 = 周六
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // 如果是周日，则往前6天；否则往前到周一
    
    const monday = new Date(today);
    monday.setDate(today.getDate() + daysToMonday);
    monday.setHours(0, 0, 0, 0); // 设置为当天的开始时间
    
    return monday;
}

function generateWeeklyFileName(): string {
    const monday = getMondayOfCurrentWeek();
    const year = monday.getFullYear();
    const month = String(monday.getMonth() + 1).padStart(2, '0');
    const day = String(monday.getDate()).padStart(2, '0');
    
    return `${year}${month}${day}_week.md`;
}

function generateFileName(directory: string): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    const datePrefix = `${year}${month}${day}`;
    
    let counter = 1;
    let fileName: string;
    
    do {
        fileName = `${datePrefix}_${counter}.md`;
        counter++;
    } while (fs.existsSync(path.join(directory, fileName)));
    
    return fileName;
}

export function deactivate() {}