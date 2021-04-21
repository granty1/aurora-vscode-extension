import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "aurora-vscode-extension" is now active!');

	let disposable = vscode.commands.registerCommand('aurora.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from aurora-vscode-extension!');
	});

	context.subscriptions.push(disposable);

	context.subscriptions.push(vscode.commands.registerCommand('aurora.ask', () => {
		vscode.window.showInformationMessage('Good day?', 'good', 'bad')
	}))
}

export function deactivate() { }
