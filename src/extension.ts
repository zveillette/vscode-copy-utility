import { window, commands, ExtensionContext, Uri, env } from 'vscode';
import * as path from 'path';
import { Config } from './config';

export function activate(context: ExtensionContext) {
	context.subscriptions.push(
		commands.registerCommand('zv-copy-utilities.copyFileName', copyFileName)
	);
}

// This method is called when your extension is deactivated
export function deactivate() { }


async function copyFileName(uri?: Uri) {
	const copyType = Config.getCopyFileName();
	if (copyType === 'Hidden') {
		return;
	}

	let fpath = uri?.fsPath;
	if (!fpath) {
		fpath = window.activeTextEditor?.document.fileName;
	}

	if (!fpath) {
		return;
	}

	const parsedPath = path.parse(fpath);
	switch (copyType) {
		case 'File name':
			await env.clipboard.writeText(parsedPath.name);
			break;
		case 'File name & extension':
			await env.clipboard.writeText(parsedPath.base);
			break;
	}
}