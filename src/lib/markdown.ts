import * as marked from 'marked';
import * as highlightjs from 'highlight.js';


export function markdownToHtml(markdown: string): string {
    return marked(markdown);
}

export function markdownToHtmlWithCodeHighlighting(markdown: string): string {
    marked.setOptions({
        highlight: (code: string): string => {
            return highlightjs.highlightAuto(code).value;
        }
    });

    return marked(markdown);
}
