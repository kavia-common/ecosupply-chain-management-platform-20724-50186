export const pct = (v) => `${Number(v || 0).toFixed(0)}%`;
export const num = (v) => new Intl.NumberFormat().format(v || 0);
export const date = (d) => new Date(d).toLocaleDateString();
