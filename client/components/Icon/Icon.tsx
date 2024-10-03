import { IconProps } from "interface"

export const IconXS = ({ Icon, color }: IconProps) => {
  return <Icon className={`${color} w-3 h-3`} />
}

export const IconSM = ({ Icon, color }: IconProps) => {
  return <Icon className={`${color} w-5 h-5`} />
}

export const IconMD = ({ Icon, color }: IconProps) => {
  return <Icon className={`${color} w-5 h-5 sm:w-7 sm:h-7`} />
}
