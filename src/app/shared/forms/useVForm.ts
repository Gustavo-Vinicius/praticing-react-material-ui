import { FormHandles } from "@unform/core"
import { useCallback, useRef } from "react"

export const useVForm = () => {
    const formRef = useRef<FormHandles>(null)

    const isSavingAndNew = useRef(false)
    const isSavingAndClose = useRef(false)

    const handleSave = useCallback(() => {
        isSavingAndClose.current = false
        isSavingAndNew.current = false
        formRef.current?.submitForm()
    },[])

    const handleSaveAndNew = useCallback(() => {
        isSavingAndClose.current = false
        isSavingAndNew.current = true
        formRef.current?.submitForm()
    },[])

    const handleSaveAndClose = useCallback(() => {
        isSavingAndClose.current = true
        isSavingAndNew.current = false
        formRef.current?.submitForm()
    },[])
    
    const handleSaveIsSaveAndNew = useCallback(() => {
        return isSavingAndNew.current
    },[])
    
    const handleSaveIsSaveAndClose = useCallback(() => {
        return isSavingAndNew.current
    },[])
    
    return{
        formRef,
        save: handleSave, 
        saveAndNew: handleSaveAndNew,
        saveAndClose: handleSaveAndClose,
        isSaveAndNew: handleSaveIsSaveAndNew,
        isSaveAndClose: handleSaveIsSaveAndClose


    }
}