import { useEffect, useRef, useState, useCallback } from 'react';
import Matter from 'matter-js';
import { Car, Sword, Banknote, Users, MessageCircle, Copy, Gamepad2 } from 'lucide-react';

interface PhysicsBody {
    id: number;
    type: 'button' | 'icon' | 'logo';
    label: string;
    icon?: React.ReactNode;
    action?: () => void;
}

const PhysicsHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const bodiesRef = useRef<Map<number, Matter.Body>>(new Map());
    const [bodyPositions, setBodyPositions] = useState<Map<number, { x: number; y: number; angle: number }>>(new Map());
    const [dimensions, setDimensions] = useState({ width: 0, height: 600 });
    const [copied, setCopied] = useState(false);

    const SERVER_IP = 'connect cfx.re/join/sprp';
    const DISCORD_URL = 'https://discord.gg/sprp';

    const copyIP = useCallback(() => {
        navigator.clipboard.writeText(SERVER_IP);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, []);

    const openDiscord = useCallback(() => {
        window.open(DISCORD_URL, '_blank');
    }, []);

    const physicsItems: PhysicsBody[] = [
        { id: 1, type: 'button', label: 'Discord', icon: <MessageCircle size={20} />, action: openDiscord },
        { id: 2, type: 'button', label: 'Copiar IP', icon: <Copy size={20} />, action: copyIP },
        { id: 3, type: 'button', label: 'Whitelist', icon: <Users size={20} />, action: openDiscord },
        { id: 4, type: 'button', label: 'Jogar', icon: <Gamepad2 size={20} />, action: copyIP },
        { id: 5, type: 'icon', label: 'car1', icon: <Car size={40} /> },
        { id: 6, type: 'icon', label: 'car2', icon: <Car size={35} /> },
        { id: 7, type: 'icon', label: 'weapon1', icon: <Sword size={38} /> },
        { id: 8, type: 'icon', label: 'weapon2', icon: <Sword size={32} /> },
        { id: 9, type: 'icon', label: 'money1', icon: <Banknote size={36} /> },
        { id: 10, type: 'icon', label: 'money2', icon: <Banknote size={42} /> },
        { id: 11, type: 'icon', label: 'money3', icon: <Banknote size={30} /> },
        { id: 12, type: 'logo', label: 'SPRP' },
    ];

    useEffect(() => {
        if (!containerRef.current) return;

        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: Math.min(700, window.innerHeight * 0.8),
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current || dimensions.width === 0) return;

        const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;

        // Create engine with low gravity for floating effect
        const engine = Engine.create();
        engine.gravity.y = 0.3;
        engine.gravity.x = 0;
        engineRef.current = engine;

        // Create renderer (invisible - we render with React)
        const render = Render.create({
            canvas: canvasRef.current,
            engine: engine,
            options: {
                width: dimensions.width,
                height: dimensions.height,
                wireframes: false,
                background: 'transparent',
                pixelRatio: window.devicePixelRatio,
            },
        });

        // Create walls
        const wallThickness = 60;
        const walls = [
            // Top
            Bodies.rectangle(dimensions.width / 2, -wallThickness / 2, dimensions.width + 100, wallThickness, {
                isStatic: true,
                render: { visible: false }
            }),
            // Bottom
            Bodies.rectangle(dimensions.width / 2, dimensions.height + wallThickness / 2, dimensions.width + 100, wallThickness, {
                isStatic: true,
                render: { visible: false }
            }),
            // Left
            Bodies.rectangle(-wallThickness / 2, dimensions.height / 2, wallThickness, dimensions.height + 100, {
                isStatic: true,
                render: { visible: false }
            }),
            // Right
            Bodies.rectangle(dimensions.width + wallThickness / 2, dimensions.height / 2, wallThickness, dimensions.height + 100, {
                isStatic: true,
                render: { visible: false }
            }),
        ];

        Composite.add(engine.world, walls);

        // Create physics bodies for each item
        const newBodies = new Map<number, Matter.Body>();

        physicsItems.forEach((item, index) => {
            let body: Matter.Body;
            const startX = 100 + (index % 4) * (dimensions.width - 200) / 4 + Math.random() * 50;
            const startY = 100 + Math.floor(index / 4) * 150 + Math.random() * 50;

            if (item.type === 'button') {
                body = Bodies.rectangle(startX, startY, 140, 50, {
                    restitution: 0.6,
                    friction: 0.1,
                    frictionAir: 0.02,
                    render: { visible: false },
                    label: `button-${item.id}`,
                });
            } else if (item.type === 'logo') {
                body = Bodies.rectangle(dimensions.width / 2, 200, 160, 100, {
                    restitution: 0.5,
                    friction: 0.1,
                    frictionAir: 0.015,
                    render: { visible: false },
                    label: `logo-${item.id}`,
                });
            } else {
                body = Bodies.circle(startX, startY, 30, {
                    restitution: 0.7,
                    friction: 0.05,
                    frictionAir: 0.01,
                    render: { visible: false },
                    label: `icon-${item.id}`,
                });
            }

            // Add initial velocity for floating effect
            Matter.Body.setVelocity(body, {
                x: (Math.random() - 0.5) * 4,
                y: (Math.random() - 0.5) * 2,
            });

            newBodies.set(item.id, body);
            Composite.add(engine.world, body);
        });

        bodiesRef.current = newBodies;

        // Mouse constraint for dragging
        const mouse = Mouse.create(canvasRef.current);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false },
            },
        });

        // Fix mouse offset for scrolling
        mouse.element.removeEventListener('mousewheel', (mouse as unknown as { mousewheel: EventListener }).mousewheel);
        mouse.element.removeEventListener('DOMMouseScroll', (mouse as unknown as { mousewheel: EventListener }).mousewheel);

        Composite.add(engine.world, mouseConstraint);

        // Sync render with mouse
        render.mouse = mouse;

        // Update positions on each frame
        Events.on(engine, 'afterUpdate', () => {
            const positions = new Map<number, { x: number; y: number; angle: number }>();
            newBodies.forEach((body, id) => {
                positions.set(id, {
                    x: body.position.x,
                    y: body.position.y,
                    angle: body.angle,
                });
            });
            setBodyPositions(new Map(positions));
        });

        // Run engine and renderer
        const runner = Runner.create();
        Runner.run(runner, engine);
        Render.run(render);

        return () => {
            Render.stop(render);
            Runner.stop(runner);
            Composite.clear(engine.world, false);
            Engine.clear(engine);
            render.canvas.remove();
        };
    }, [dimensions]);

    const handleBodyClick = (item: PhysicsBody, e: React.MouseEvent) => {
        e.stopPropagation();
        if (item.action) {
            item.action();
        }
    };

    return (
        <section className="relative w-full overflow-hidden bg-sprp-dark" style={{ height: dimensions.height }}>
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-sprp-darker via-sprp-dark to-sprp-accent opacity-80" />

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Canvas for physics (invisible) */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-10"
                style={{ touchAction: 'none' }}
            />

            {/* Container for measuring */}
            <div ref={containerRef} className="absolute inset-0 physics-container">
                {/* Render React elements synced with physics */}
                {physicsItems.map((item) => {
                    const pos = bodyPositions.get(item.id);
                    if (!pos) return null;

                    if (item.type === 'button') {
                        return (
                            <button
                                key={item.id}
                                onClick={(e) => handleBodyClick(item, e)}
                                className="absolute physics-button flex items-center gap-2 px-5 py-3 rounded-lg glass neon-border text-white font-semibold hover:bg-sprp-neon-blue/20 transition-colors z-20"
                                style={{
                                    left: pos.x - 70,
                                    top: pos.y - 25,
                                    transform: `rotate(${pos.angle}rad)`,
                                    pointerEvents: 'auto',
                                }}
                            >
                                <span className="text-sprp-neon-blue">{item.icon}</span>
                                {item.label === 'Copiar IP' && copied ? 'Copiado!' : item.label}
                            </button>
                        );
                    }

                    if (item.type === 'logo') {
                        return (
                            <div
                                key={item.id}
                                className="absolute physics-button flex items-center justify-center z-20"
                                style={{
                                    left: pos.x - 80,
                                    top: pos.y - 50,
                                    transform: `rotate(${pos.angle}rad)`,
                                }}
                            >
                                <img
                                    src="/sprp-logo.png"
                                    alt="SPRP Logo"
                                    className="w-40 h-auto drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]"
                                    draggable={false}
                                />
                            </div>
                        );
                    }

                    // Icon type
                    return (
                        <div
                            key={item.id}
                            className="absolute physics-button flex items-center justify-center w-16 h-16 rounded-full glass text-sprp-neon-gold z-20"
                            style={{
                                left: pos.x - 32,
                                top: pos.y - 32,
                                transform: `rotate(${pos.angle}rad)`,
                                boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
                            }}
                        >
                            {item.icon}
                        </div>
                    );
                })}
            </div>

            {/* Hero Text */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-30 pointer-events-none">
                <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-2 animate-neon-flicker">
                    SÃO PAULO <span className="text-sprp-neon-blue">ROLEPLAY</span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl">
                    Arraste os elementos • Clique nos botões para jogar
                </p>
            </div>
        </section>
    );
};

export default PhysicsHero;
