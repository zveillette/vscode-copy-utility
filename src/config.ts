import { workspace } from 'vscode';

type CopyFileNameConfig = 'Hidden' | 'File name' | 'File name & extension';

export class Config {
    static getCopyFileName(): CopyFileNameConfig {
        return this.getConfig('copyFileName') as CopyFileNameConfig;
    }

    private static getConfig(configName: string): unknown {
        return  workspace.getConfiguration('zv-copy-utilities').get(configName);
    }
}