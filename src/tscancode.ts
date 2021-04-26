import * as vscode from 'vscode';
import * as path from 'path'
var NEXT_TERM_ID = 0
const getFilePath = function (path:string){
    let index = path.lastIndexOf("/");
    if(index < 0){
        index = -1;
    }
    return path.substr(0,index+1);
}

const register = function(context: vscode.ExtensionContext){
	context.subscriptions.push(vscode.commands.registerCommand('aurora.getCurrentFilePath', (uri) => {
		const terminal = vscode.window.createTerminal(`Ext Terminal #${NEXT_TERM_ID++}`);

		var path = getFilePath(uri.path)
		vscode.window.showInformationMessage(`${path}  当前文件(夹)路径是：${uri ? uri.path : '空'}`);
		terminal.sendText(`/usr/local/bin/tscancode ${uri.path}  > ${path}tscancodeResult.out  2>&1`);
    }));
}

export {
    register
}