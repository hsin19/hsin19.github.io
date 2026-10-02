import type { Stage } from "./types";

interface Mote {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    phase: number;
    pulse: number;
    sprite: 0 | 1;
}

const MAX_DPR = 2;
const POINTER_RADIUS = 140;

/** Drifting motes: ink-dust pollen on paper, glowing fireflies at night. */
export const fireflies: Stage = (canvas, { reducedMotion }) => {
    const context = canvas.getContext("2d");
    if (!context) return () => {};
    const ctx = context;

    let width = 0;
    let height = 0;
    let dark = false;
    let motes: Mote[] = [];
    let sprites: HTMLCanvasElement[] = [];
    let frame = 0;
    let visible = true;
    const pointer = { x: -1e4, y: -1e4 };

    // Custom properties built on light-dark() read back unresolved, so resolve them through a probe.
    const probe = document.createElement("span");
    probe.style.display = "none";
    canvas.parentElement?.append(probe);
    const resolveColor = (token: string) => {
        probe.style.color = `var(${token})`;
        const [r = 0, g = 0, b = 0] = getComputedStyle(probe).color.match(/[\d.]+/g)?.map(Number) ?? [];
        return { r, g, b };
    };
    type Rgb = ReturnType<typeof resolveColor>;
    const rgba = ({ r, g, b }: Rgb, alpha: number) => `rgb(${r} ${g} ${b} / ${alpha})`;

    function makeSprite(color: Rgb) {
        const size = 64;
        const sprite = document.createElement("canvas");
        sprite.width = sprite.height = size;
        const g = sprite.getContext("2d");
        if (!g) return sprite;
        const gradient = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        gradient.addColorStop(0, rgba(color, 1));
        gradient.addColorStop(dark ? 0.12 : 0.35, rgba(color, 1));
        gradient.addColorStop(dark ? 0.35 : 0.5, rgba(color, 0.25));
        gradient.addColorStop(1, rgba(color, 0));
        g.fillStyle = gradient;
        g.fillRect(0, 0, size, size);
        return sprite;
    }

    function readTheme() {
        const { r, g, b } = resolveColor("--bg");
        dark = 0.2126 * r + 0.7152 * g + 0.0722 * b < 128;
        sprites = [makeSprite(resolveColor("--glow")), makeSprite(resolveColor("--glow-2"))];
    }

    function spawn(): Mote {
        const speed = 0.08 + Math.random() * 0.18;
        const angle = Math.random() * Math.PI * 2;
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 0.05,
            size: 1 + Math.random() * 2.4,
            phase: Math.random() * Math.PI * 2,
            pulse: 0.4 + Math.random() * 1.2,
            sprite: Math.random() < 0.72 ? 0 : 1,
        };
    }

    function resize() {
        const dpr = Math.min(devicePixelRatio || 1, MAX_DPR);
        width = canvas.clientWidth;
        height = canvas.clientHeight;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const count = Math.min(110, Math.round((width * height) / 12_000));
        motes = Array.from({ length: count }, (_, i) => motes[i] ?? spawn());
    }

    function draw(time: number) {
        ctx.clearRect(0, 0, width, height);
        ctx.globalCompositeOperation = dark ? "lighter" : "source-over";
        const t = time / 1000;
        for (const mote of motes) {
            const flicker = 0.5 + 0.5 * Math.sin(t * mote.pulse + mote.phase);
            const alpha = dark ? 0.15 + 0.85 * flicker ** 2 : 0.18 + 0.32 * flicker;
            const scale = dark ? 7 : 2.4;
            const size = mote.size * scale;
            const sprite = sprites[mote.sprite];
            if (!sprite) continue;
            ctx.globalAlpha = alpha;
            ctx.drawImage(sprite, mote.x - size / 2, mote.y - size / 2, size, size);
        }
        ctx.globalAlpha = 1;
    }

    function step(time: number) {
        const t = time / 1000;
        for (const mote of motes) {
            // Wander: a slow sinusoidal nudge so paths curve instead of running straight.
            mote.vx += Math.cos(t * 0.3 + mote.phase) * 0.004;
            mote.vy += Math.sin(t * 0.25 + mote.phase * 1.3) * 0.004;

            const dx = mote.x - pointer.x;
            const dy = mote.y - pointer.y;
            const distance = Math.hypot(dx, dy);
            if (distance < POINTER_RADIUS && distance > 0) {
                const push = (1 - distance / POINTER_RADIUS) * 0.08;
                mote.vx += (dx / distance) * push;
                mote.vy += (dy / distance) * push;
            }

            mote.vx *= 0.985;
            mote.vy *= 0.985;
            mote.x += mote.vx;
            mote.y += mote.vy;

            const margin = 24;
            if (mote.x < -margin) mote.x = width + margin;
            if (mote.x > width + margin) mote.x = -margin;
            if (mote.y < -margin) mote.y = height + margin;
            if (mote.y > height + margin) mote.y = -margin;
        }
    }

    function loop(time: number) {
        step(time);
        draw(time);
        frame = requestAnimationFrame(loop);
    }

    function start() {
        if (reducedMotion || frame || !visible || document.hidden) return;
        frame = requestAnimationFrame(loop);
    }

    function stop() {
        cancelAnimationFrame(frame);
        frame = 0;
    }

    const onPointerMove = (event: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        pointer.x = event.clientX - rect.left;
        pointer.y = event.clientY - rect.top;
    };
    const onPointerLeave = () => {
        pointer.x = pointer.y = -1e4;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onTheme = () => {
        readTheme();
        draw(performance.now());
    };

    const resizeObserver = new ResizeObserver(() => {
        resize();
        draw(performance.now());
    });
    const intersection = new IntersectionObserver(([entry]) => {
        visible = entry?.isIntersecting ?? true;
        if (visible) start();
        else stop();
    });

    readTheme();
    resize();
    draw(0);
    resizeObserver.observe(canvas);
    intersection.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("themechange", onTheme);
    start();

    return () => {
        stop();
        resizeObserver.disconnect();
        intersection.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerleave", onPointerLeave);
        document.removeEventListener("visibilitychange", onVisibility);
        document.removeEventListener("themechange", onTheme);
        probe.remove();
    };
};
