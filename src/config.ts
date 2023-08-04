import { workspace } from 'vscode';

type CopyFileNameConfig = 'Hidden' | 'File name' | 'File name & extension';
type CopyParentDirConfig = 'Hidden' | 'Parent directory';

export class Config {
    static getCopyFileName(): CopyFileNameConfig {
        return this.getConfig('copyFileName') as CopyFileNameConfig;
    }

    static getCopyParentDir(): CopyParentDirConfig {
        return this.getConfig('copyParentDir') as CopyParentDirConfig;
    }

    private static getConfig(configName: string): unknown {
        return  workspace.getConfiguration('zv-copy-utilities').get(configName);
    }
}