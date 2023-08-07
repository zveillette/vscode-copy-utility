export function stripIndentation(code: string) {
    const spaceTabs = code.match(/^[\r\n]?(\s+)/);

    if (!spaceTabs || !spaceTabs?.[0]) {
        return code;
    }

    const indent = spaceTabs[0];
    return code.replace(new RegExp('^' + indent, 'gm'), '');
}