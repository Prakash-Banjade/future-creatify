const emptyNodes = [
    `<p class="leading-7 [&amp;:not(:first-child)]:mt-6"><br></p>`,
    `<p><br></p>`,
    `<p></p>`,
]

/**
 * Checks if the HTML is empty
 */
export default function isEmptyHTML(html: string) {
    return emptyNodes.includes(html?.trim());
}