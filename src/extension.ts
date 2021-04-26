import * as vscode from 'vscode';
import * as regQues from './question'
import * as regTscancode from './tscancode'
import * as processView from './processView'

export function activate(context: vscode.ExtensionContext) {
	regQues.register(context);
	regTscancode.register(context);
	processView.register(context);
}

export function deactivate() { }
