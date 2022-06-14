function r(tag, params, ...children) {
    const dom = document.createElement(tag);
    params && params.classNames && dom.classList.add(...params.classNames.split(' '));
    Object.entries(params)
        .filter(([key]) => !['classNames'].includes(key))
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
