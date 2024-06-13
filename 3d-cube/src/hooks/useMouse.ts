import { useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function useMouse() {
  const options = {
    damping: 20,
  }

  const mouse = {
    x: useSpring(useMotionValue(0), options),
    y: useSpring(useMotionValue(0), options)
  };

  const handleMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    const x = -.5 + (clientX / innerWidth);
    const y = -.5 + (clientY / innerHeight);

    mouse.x.set(x);
    mouse.y.set(y);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return mouse;
}
