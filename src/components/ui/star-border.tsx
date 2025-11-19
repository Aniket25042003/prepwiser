import { cn } from "../../lib/utils"
import { ElementType, ComponentPropsWithoutRef } from "react"

const DEFAULT_COLOR = "#131445"

function parseColorChannels(value: string | undefined) {
  const fallback: [number, number, number] = [19, 20, 69]
  if (!value) return fallback

  const color = value.trim()

  if (color.startsWith("#")) {
    const hex = color.slice(1)
    if (hex.length === 3) {
      const r = parseInt(hex[0] + hex[0], 16)
      const g = parseInt(hex[1] + hex[1], 16)
      const b = parseInt(hex[2] + hex[2], 16)
      return [r, g, b] as [number, number, number]
    }
    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16)
      const g = parseInt(hex.slice(2, 4), 16)
      const b = parseInt(hex.slice(4, 6), 16)
      if ([r, g, b].every((channel) => !Number.isNaN(channel))) {
        return [r, g, b] as [number, number, number]
      }
    }
    return fallback
  }

  const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i)
  if (rgbMatch) {
    return [
      Number(rgbMatch[1]),
      Number(rgbMatch[2]),
      Number(rgbMatch[3])
    ] as [number, number, number]
  }

  return fallback
}

const toRgba = (channels: [number, number, number], alpha: number) =>
  `rgba(${channels[0]}, ${channels[1]}, ${channels[2]}, ${alpha})`

interface StarBorderProps<T extends ElementType> {
  as?: T
  color?: string
  speed?: string
  className?: string
  children: React.ReactNode
}

export function StarBorder<T extends ElementType = "button">({
  as,
  className,
  color,
  speed = "6s",
  children,
  ...props
}: StarBorderProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof StarBorderProps<T>>) {
  const Component = as || "button"
  const defaultColor = color || "rgb(168, 85, 247)" // purple-500 to match the theme

  return (
    <Component 
      className={cn(
        "relative inline-block py-[1px] overflow-hidden rounded-[20px]",
        className
      )} 
      {...props}
    >
      <div
        className={cn(
          "absolute w-[300%] h-[50%] bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0",
          "opacity-30" 
        )}
        style={{
          background: `radial-gradient(circle, ${defaultColor}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className={cn(
          "absolute w-[300%] h-[50%] top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0",
          "opacity-30"
        )}
        style={{
          background: `radial-gradient(circle, ${defaultColor}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className={cn(
        "relative z-1 border text-white text-center text-base py-4 px-6 rounded-[20px]",
        "bg-transparent border-purple-500/40 backdrop-blur-sm",
        "hover:bg-purple-500/10 transition-all duration-300"
      )}>
        {children}
      </div>
    </Component>
  )
} 