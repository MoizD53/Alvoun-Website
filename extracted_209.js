document.addEventListener');
        if (start === -1) start = line.indexOf('const observerOptions');
        if (start !== -1) {
            let end = line.lastIndexOf('});');
            if (end !== -1) {
                let js = line.substring(start, end + 3);
                js = js.replace(/\\\
/g, '\
').replace(/\\\\"/g, '"');
                fs.writeFileSync('extracted_' + idx + '.js', js);
            }
        }
    }
});