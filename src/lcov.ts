import * as vscode from 'vscode';
import * as exec from 'child_process';
import * as fs from 'fs';
const register = function(context: vscode.ExtensionContext){
    context.subscriptions.push(vscode.commands.registerCommand('aurora.lcovResult', () => {
        vscode.window.showInformationMessage('开始代码覆盖率分析');
        // const address = fs.readFileSync('/data/THK/lcov_scripts/address').toString();
        // vscode.env.openExternal(vscode.Uri.parse(address));
        const cmd = `/data/THK/lcov_scripts/start.sh`;
        try{
            exec.exec(cmd,(err ,stdout ,stderr)=>{
                vscode.window.showInformationMessage('代码覆盖率分析完毕');
                if(!pathExists('/data/THK/lcov_scripts/address')){
                    vscode.window.showInformationMessage('还未配置代码覆盖率地址');
                    return;
                }
                const address = fs.readFileSync('/data/THK/lcov_scripts/address').toString();
                vscode.env.openExternal(vscode.Uri.parse(address));
                vscode.window.showInformationMessage(address);
            });
        }catch(e){
            vscode.window.showInformationMessage(e);
        }

    }));
};
function pathExists(p: string){
	try {
		fs.accessSync(p);
	} catch (err) {
		return false;
	}
	return true;
}
export {
    register
};