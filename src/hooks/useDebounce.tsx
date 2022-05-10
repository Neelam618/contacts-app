import { useEffect, useState } from 'react'
import React from 'react'

function useDebounce(value: any, delay: number) {
    const [debouncedVal, setDebounceVal] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceVal(value)
        }, delay)
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedVal
}

export default useDebounce