function r(tag, params, ...children) {
    const dom = document.createElement(tag);
    Object.entries(params)
        .forEach(([key, value]) => dom[key] = value);
    children
        .filter(Boolean)
        .forEach(child => {
            try {
                dom.appendChild(child)
            } catch (e) {
                console.warn(child);
            }
        });
    return dom;
}