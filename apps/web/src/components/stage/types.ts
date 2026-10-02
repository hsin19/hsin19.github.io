export interface StageOptions {
    reducedMotion: boolean;
}

/**
 * A stage is the decorative scene behind the hero. It owns the canvas, must
 * render a sensible still frame when `reducedMotion` is set, should pause
 * itself when off-screen, and returns a cleanup function.
 *
 * Swap `fireflies` for a WebGPU / three.js scene by writing another `Stage`
 * and pointing HeroStage at it — nothing else on the page needs to change.
 */
export type Stage = (canvas: HTMLCanvasElement, options: StageOptions) => () => void;
