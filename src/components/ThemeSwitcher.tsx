"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { FC, useState } from "react"
import { Button } from "./ui/button"
import { Theme } from "@/types/theme"

interface Props {
    theme: Theme | undefined
}

export const ThemeSwitcher: FC<Props> = ({ theme }) => {

    const [_theme, setTheme] = useState<Theme>(theme ?? Theme.light)

    const toogleTheme = () => {

        const root = document.getElementsByTagName('html')[0]
        root.classList.toggle(Theme.dark)
        if (root.classList.contains(Theme.dark)) {
            setTheme(Theme.dark)
            document.cookie = `theme=${Theme.dark}`
        } else {
            setTheme(Theme.light)
            document.cookie = `theme=${Theme.light}`
        }

    }

    return (
        <Button size='icon' variant='ghost' onClick={toogleTheme}>
            {
                _theme == Theme.dark ?
                    <SunIcon className="h-6 w-6" />
                    :
                    <MoonIcon className="h-6 w-6" />
            }
        </Button>
    )}