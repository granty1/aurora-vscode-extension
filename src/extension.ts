import * as vscode from 'vscode';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import * as regQues from './question';
import * as regTscancode from './tscancode';
import * as regLcov from './lcov';
import * as processView from './processView/processView';
import * as scriptsView from './scriptsView/scriptsView';

export function activate(context: vscode.ExtensionContext) {
	const userRoot = os.homedir();
	if(!pathExists(path.join(userRoot, '.cprocess'))) {
		fs.mkdirSync(path.join(userRoot, '.cprocess'));
	}
	regQues.register(context);
	regTscancode.register(context);
	processView.register(context);
	scriptsView.register(context);
	regLcov.register(context);
}
function pathExists(p: string){
	try {
		fs.accessSync(p);
	} catch (err) {
		return false;
	}
	return true;
}
export function deactivate() { }
