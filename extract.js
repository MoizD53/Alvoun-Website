const fs = require('fs');
const text = fs.readFileSync('C:/Users/Moizd/.gemini/antigravity/brain/4cd3a2df-895c-4ba7-a9c5-879faff48889/.system_generated/logs/transcript_full.jsonl', 'utf-8');
const lines = text.trim().split('\n');
lines.forEach((line, idx) => {
    // Extract CSS
    if (line.includes('/* RESET & BASE */')) {
        console.log('Found CSS in line', idx);
        let start = line.indexOf('/* RESET & BASE */');
        let end = line.lastIndexOf('}'); // Just find the last brace
        if (end !== -1) {
            let css = line.substring(start, end + 1);
            css = css.replace(/\\n/g, '\n').replace(/\\"/g, '"');
            fs.writeFileSync('extracted_' + idx + '.css', css);
        }
    }
    
    // Extract JS
    if (line.includes('IntersectionObserver')) {
        console.log('Found JS in line', idx);
        let start = line.indexOf('document.addEventListener');
        if (start === -1) start = line.indexOf('const observerOptions');
        if (start !== -1) {
            let end = line.lastIndexOf('});');
            if (end !== -1) {
                let js = line.substring(start, end + 3);
                js = js.replace(/\\n/g, '\n').replace(/\\"/g, '"');
                fs.writeFileSync('extracted_' + idx + '.js', js);
            }
        }
    }
});
