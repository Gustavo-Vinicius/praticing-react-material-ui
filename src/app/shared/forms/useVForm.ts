import { FormHandles } from "@unform/core"
import { useRef } from "react"

export const useVForm = () => {
    const fromRef = useRef<FormHandles>()

    return{fromRef}
}