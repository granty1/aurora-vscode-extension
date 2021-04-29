import * as vscode from 'vscode';
import * as regQues from './question'
import * as regTscancode from './tscancode'
import * as processView from './processView/processView'
import * as scriptsView from './scriptsView/scriptsView'

export function activate(context: vscode.ExtensionContext) {
	regQues.register(context);
	regTscancode.register(context);
	processView.register(context);
	scriptsView.register(context);
}

export function deactivate() { }
