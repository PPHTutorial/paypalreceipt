/**
 * Utility to prepare the receipt HTML for email delivery.
 * Inlines critical styles and ensures the structure is compatible with email clients.
 */
export const getEmailHTML = (element) => {
    if (!element) return "";

    // Clone the element to avoid mutating the live DOM
    const clone = element.cloneNode(true);

    // Basic inlining logic: Move critical styles to inline style attributes
    // In a real-world scenario, a much more robust inliner would be used.
    // Here we focus on the core layout properties.

    const processStyles = (original, cloned) => {
        const originalNodes = original.querySelectorAll("*");
        const clonedNodes = cloned.querySelectorAll("*");

        // Also handle the root element
        const rootStyle = window.getComputedStyle(original);
        cloned.style.cssText = `
      background-color: ${rootStyle.backgroundColor};
      width: 100%;
      max-width: 640px;
      margin: 0 auto;
      font-family: ${rootStyle.fontFamily};
      padding: 20px;
    `;

        for (let i = 0; i < originalNodes.length; i++) {
            const orig = originalNodes[i];
            const copy = clonedNodes[i];
            const style = window.getComputedStyle(orig);

            // Inline common layout/style properties
            copy.style.cssText = `
        color: ${style.color};
        background-color: ${style.backgroundColor};
        font-size: ${style.fontSize};
        font-weight: ${style.fontWeight};
        line-height: ${style.lineHeight};
        padding: ${style.padding};
        margin: ${style.margin};
        border: ${style.border};
        border-radius: ${style.borderRadius};
        display: ${style.display};
        text-align: ${style.textAlign};
        width: 100%;
      `;

            // Special handling for labels/values
            if (orig.classList.contains('detail-label')) copy.style.fontWeight = 'bold';
        }
    };

    processStyles(element, clone);

    // Return the outerHTML of the processed clone
    return `
    <html>
      <body style="margin: 0; padding: 0; background-color: #f6f9fc;">
        <div style="width: 100%; table-layout: fixed; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
          ${clone.innerHTML}
        </div>
      </body>
    </html>
  `;
};
