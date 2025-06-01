import { useEffect, useRef } from "react";

export default function useEffectAfterMount(effect: () => void, deps?: any[]) {
    const hasMounted = useRef(false);

    useEffect(() => {
        if (hasMounted.current) {
            effect();
        } else {
            hasMounted.current = true;
        }
    }, deps);
}