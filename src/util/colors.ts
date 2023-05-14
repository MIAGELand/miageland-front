import { RGB_COLORS } from './constants';

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

export function getRandomColor() {
    return RGB_COLORS[Math.floor(Math.random() * RGB_COLORS.length)];
}

export function getDifferentColors(count: number) {
    // Generate count nb of different colors from RGB_COLORS
    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(RGB_COLORS[i % RGB_COLORS.length]);
    }
    return colors;
}
