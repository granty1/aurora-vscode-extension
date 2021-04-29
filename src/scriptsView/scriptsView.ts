import * as vscode from 'vscode';
import * as os from "os";
import { ScriptsTree } from './scriptsTree';
import {FileUtil} from './fileUtil';

var NEXT_TERM_ID = 0;
const register = function(context: vscode.ExtensionContext){
    const scriptsTree = new ScriptsTree(context);
    vscode.window.registerTreeDataProvider('aurora.SctiptsView',scriptsTree);

    context.subscriptions.push(vscode.commands.registerCommand('aurora.addScripts',()=>{
        vscode.window.showOpenDialog(
            {
				canSelectFiles:true,
				canSelectFolders:false, 
				canSelectMany:true,
				defaultUri:vscode.Uri.file(""),
			}).then(function(files){
				console.log(JSON.stringify(files))
				if(files && files.length > 0){
					let userRoot = os.homedir();
					files.forEach((file)=>{                      
						FileUtil.addRomToResposity(userRoot,file.fsPath);
					});
					scriptsTree.refresh();
				}
			}
        )
    }));
	context.subscriptions.push(vscode.commands.registerCommand('aurora.refreshScripts', () => {
		scriptsTree.refresh();
	}));
	context.subscriptions.push(vscode.commands.registerCommand('aurora.deleteSctipts', (config) => {
		scriptsTree.deleteProcess(config);
	}));
	context.subscriptions.push(vscode.commands.registerCommand('aurora.execSctipts', (uri) => {
		//console.log("uri    ",uri.label)
		const terminal = vscode.window.createTerminal(`Ext Terminal #${NEXT_TERM_ID++}`);

		vscode.window.showInformationMessage(`执行的脚本是：${uri.label}`);
		terminal.sendText(`${uri.label}`);
    }));
}

export {
    register
}