import { window, commands, ExtensionContext, Uri, env, workspace } from 'vscode';
import * as path from 'path';
import { Config } from './config';
import { stripIndentation } from './text-utilities';

export function activate(context: ExtensionContext) {
	context.subscriptions.push(
		commands.registerCommand('zv-copy-utilities.copyFileName', copyFileName),
		commands.registerCommand('zv-copy-utilities.copyParentDir', copyParentDirectory),
		commands.registerCommand('zv-copy-utilities.copySelectionAsMd', copySelectionAsMd)
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

async function copyParentDirectory() {
	const copyType = Config.getCopyParentDir();
	if (copyType === 'Hidden') {
		return;
	}

	const fpath = window.activeTextEditor?.document.fileName;
	if (!fpath) {
		return;
	}

	const dirPath = path.parse(fpath).dir;
	await env.clipboard.writeText(path.parse(dirPath).name);
}

async function copySelectionAsMd() {
	const copyType = Config.getCopySelectionAsMd();
	if (copyType === 'Hidden') {
		return;
	}

	const activeTextEditor = window.activeTextEditor;
	if (!activeTextEditor) {
		return;
	}

	const selection = activeTextEditor.selection;
	const selectionText = stripIndentation(activeTextEditor.document.getText(selection));
	const lang = activeTextEditor.document.languageId;
	const relativePath = workspace.asRelativePath(activeTextEditor.document.fileName);

	let code = '';
	switch (copyType) {
		case 'Code':
			code = `\`\`\`\n${selectionText}\n\`\`\``;
			break;
		case 'Code & language':
			code = `\`\`\`${lang}\n${selectionText}\n\`\`\``;
			break;
		case 'Code, language & file':
			code = `\`\`\`${lang}\n${selectionText}\n\`\`\`\n${relativePath} - line [${selection.start.line + 1}, ${selection.end.line + 1}]`;
			break;
	}

	await env.clipboard.writeText(code);
}