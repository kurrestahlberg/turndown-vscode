'use strict'
import * as vscode from 'vscode'
const TurnDown = require('turndown')

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.turndown',() => {
			const editor = vscode.window.activeTextEditor
			editor.edit((edit) => {
                const t = vscode.window.activeTextEditor.document.getText(editor.selection)
                const config = vscode.workspace.getConfiguration('turndown')
				edit.replace(editor.selection, replaceText(t, config.get('useSpecialImage')))
			})
		},
	)

	context.subscriptions.push(disposable)
}

export function deactivate() {

}

export function replaceText(text: string, specialImage: boolean) {
    const td = new TurnDown()
    if(specialImage) {
        td.addRule('image', {
            filter: 'img',
            replacement: function(content, node) {
                const rv = '{{' + node.outerHTML + '}}'
                return rv
            },
        })
    }
	return td.turndown(text)
}
