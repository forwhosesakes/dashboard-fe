import { useEffect, useState } from "react"

export function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  )

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    window.addEventListener("resize", handleResize)
    
    // Call handler right away so state gets updated with initial window size
    handleResize()

    //remove
    return () => window.removeEventListener("resize", handleResize)
  }, [breakpoint])

  return isMobile
}