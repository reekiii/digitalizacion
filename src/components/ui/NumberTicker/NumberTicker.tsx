import { useEffect, useState } from "react";
import { animate, useInView } from "framer-motion";
import { useRef } from "react";

interface NumberTickerProps {
    value: number;
    direction?: "up" | "down";
    delay?: number; // in seconds
    className?: string;
    prefix?: string;
    suffix?: string;
}

export default function NumberTicker({
    value,
    direction = "up",
    delay = 0,
    className,
    prefix = "",
    suffix = ""
}: NumberTickerProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [displayValue, setDisplayValue] = useState(
        direction === "down" ? value : 0
    );

    useEffect(() => {
        if (isInView) {
            setTimeout(() => {
                const start = direction === "down" ? value : 0;
                const end = direction === "down" ? 0 : value;
                const duration = 2; // Fixed duration for smoother feel

                animate(start, end, {
                    duration: duration,
                    ease: "easeOut",
                    onUpdate(current) {
                        setDisplayValue(Math.round(current));
                    },
                });
            }, delay * 1000);
        }
    }, [isInView, value, direction, delay]);

    return (
        <span ref={ref} className={className}>
            {prefix}{displayValue}{suffix}
        </span>
    );
}
