declare class Vector {
    public x: number;
    public y: number;
    public z: number;
    constructor(x: number, y: number, z: number);
    static times(k: number, v: Vector): Vector;
    static minus(v1: Vector, v2: Vector): Vector;
    static plus(v1: Vector, v2: Vector): Vector;
    static dot(v1: Vector, v2: Vector): number;
    static mag(v: Vector): number;
    static norm(v: Vector): Vector;
    static cross(v1: Vector, v2: Vector): Vector;
}
declare class Color {
    public r: number;
    public g: number;
    public b: number;
    constructor(r: number, g: number, b: number);
    static scale(k: number, v: Color): Color;
    static plus(v1: Color, v2: Color): Color;
    static times(v1: Color, v2: Color): Color;
    static white: Color;
    static grey: Color;
    static black: Color;
    static background: Color;
    static defaultColor: Color;
    static toDrawingColor(c: Color): {
        r: number;
        g: number;
        b: number;
    };
}
declare class Camera {
    public pos: Vector;
    public forward: Vector;
    public right: Vector;
    public up: Vector;
    constructor(pos: Vector, lookAt: Vector);
}
interface Ray {
    start: Vector;
    dir: Vector;
}
interface Intersection {
    thing: Thing;
    ray: Ray;
    dist: number;
}
interface Surface {
    diffuse: (pos: Vector) => Color;
    specular: (pos: Vector) => Color;
    reflect: (pos: Vector) => number;
    roughness: number;
}
interface Thing {
    intersect: (ray: Ray) => Intersection;
    normal: (pos: Vector) => Vector;
    surface: Surface;
}
interface Light {
    pos: Vector;
    color: Color;
}
interface Scene {
    things: Thing[];
    lights: Light[];
    camera: Camera;
}
declare class Sphere implements Thing {
    public center: Vector;
    public surface: Surface;
    public radius2: number;
    constructor(center: Vector, radius: number, surface: Surface);
    public normal(pos: Vector): Vector;
    public intersect(ray: Ray): {
        thing: Sphere;
        ray: Ray;
        dist: number;
    };
}
declare class Plane implements Thing {
    public surface: Surface;
    public normal: (pos: Vector) => Vector;
    public intersect: (ray: Ray) => Intersection;
    constructor(norm: Vector, offset: number, surface: Surface);
}
declare module Surfaces {
    var shiny: Surface;
    var checkerboard: Surface;
}
declare class RayTracer {
    private maxDepth;
    private intersections(ray, scene);
    private testRay(ray, scene);
    private traceRay(ray, scene, depth);
    private shade(isect, scene, depth);
    private getReflectionColor(thing, pos, normal, rd, scene, depth);
    private getNaturalColor(thing, pos, norm, rd, scene);
    public render(scene: any, ctx: any, screenWidth: any, screenHeight: any): void;
}
declare function defaultScene(): Scene;
declare function exec(): void;
