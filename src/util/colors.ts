export function generatePastelRGB() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let mix = Math.floor(Math.random() * 256);

    // mix the color with white to create pastel
    r = (r + mix) / 2;
    g = (g + mix) / 2;
    b = (b + mix) / 2;

    return "rgb(" + r + ", " + g + ", " + b + ")";
}
