import * as vscode from 'vscode';
import {Uri} from 'vscode'

const register = function(context: vscode.ExtensionContext){
    context.subscriptions.push(vscode.commands.registerCommand('aurora.getQuestion', () => {
        vscode.window.showInformationMessage('很高兴为您解决问题！！！');
        vscode.env.openExternal(Uri.parse("https://huanle.feishu.cn/sheets/shtcnLb4hXzn6RvVRDwnxxWcUye"));
    }));
}

export {
    register
}