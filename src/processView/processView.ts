import * as vscode from 'vscode';
import * as os from "os";
import { ProcessTree } from './processTree';
import {FileUtil} from './fileUtil';


const register = function(context: vscode.ExtensionContext){
    const processTree = new ProcessTree(context);
    vscode.window.registerTreeDataProvider('aurora.ProcessView',processTree);

    context.subscriptions.push(vscode.commands.registerCommand('aurora.addProcess',()=>{
        vscode.window.showOpenDialog(
            {
				canSelectFiles:true,
				canSelectFolders:false, 
				canSelectMany:true,
				defaultUri:vscode.Uri.file(""),
			}).then(function(files){
				console.log(JSON.stringify(files));
				if(files && files.length > 0){
					let userRoot = os.homedir();
					files.forEach((file)=>{                      
						FileUtil.addRomToResposity(userRoot,file.fsPath);
					});
					processTree.refresh();
				}
			}
        );
    }));
	context.subscriptions.push(vscode.commands.registerCommand('aurora.refreshProcess', () => {
		processTree.refresh();
	}));
	context.subscriptions.push(vscode.commands.registerCommand('aurora.deleteProcess', (config) => {
		processTree.deleteProcess(config);
	}));
	context.subscriptions.push(vscode.commands.registerCommand('aurora.openFile', (resource: vscode.Uri) => {
		vscode.window.showTextDocument(resource);
	}));
	setInterval(()=>{processTree.refresh()},1000);
};

export {
    register
};