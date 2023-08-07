import { workspace } from 'vscode';

type CopyFileNameConfig = 'Hidden' | 'File name' | 'File name & extension';
type CopyParentDirConfig = 'Hidden' | 'Parent directory';
type CopySelectionAsMd = 'Hidden' | 'Code' | 'Code & language' | 'Code, language & file';

export class Config {
    static getCopyFileName(): CopyFileNameConfig {
        return this.getConfig('copyFileName') as CopyFileNameConfig;
    }

    static getCopyParentDir(): CopyParentDirConfig {
        return this.getConfig('copyParentDirectory') as CopyParentDirConfig;
    }

    static getCopySelectionAsMd(): CopySelectionAsMd {
        return this.getConfig('copySelectionAsMarkdown') as CopySelectionAsMd;
    }  

    private static getConfig(configName: string): unknown {
        return  workspace.getConfiguration('zv-copy-utilities').get(configName);
    }
}