export const parseMarkdown = (text) => {
    const lines = text.split('\n');
    const result = {};
    
    lines.forEach(line => {
        // 解析标题 (以 # 开头的行)
        if (line.startsWith('# ')) {
            result.name = line.replace('# ', '').trim();
        } 
        // 解析加粗键值对
        else if (line.includes('**Price**:')) {
            result.price = line.split('**Price**:')[1].trim();
        } else if (line.includes('**Category**:')) {
            result.type = line.split('**Category**:')[1].trim();
        } else if (line.includes('**Image**:')) {
            result.image = line.split('**Image**:')[1].trim();
        } else if (line.includes('**Description**:')) {
            result.desc = line.split('**Description**:')[1].trim();
        }
    });
    return result;
};