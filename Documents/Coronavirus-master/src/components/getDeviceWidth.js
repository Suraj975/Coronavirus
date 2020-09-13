import React, { useState, useEffect } from 'react'

const useDeviceWidth = () => {
    const isClient = typeof window === 'object';
    const [windowSize, setWindowSize] = useState(getWindowSize);

    function getWindowSize() {
        return {
            width: isClient ? window.innerWidth : null,
            height: isClient ? window.innerHeight : null
        }
    }

    useEffect(() => {
        setWindowSize(getWindowSize)
    }, [])
    return windowSize
        ;
}

export default useDeviceWidth;