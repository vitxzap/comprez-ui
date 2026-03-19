import { DeepPartial } from "react-hook-form"
import {
    advancedFormDefaultValues,
    AdvancedFormType,
    basicFormDefaultValues,
    BasicFormType,
    Forms
} from "./validation"
import { create } from "zustand"

interface OptionsFormStore {
    form: Forms
    basicFormData: Partial<BasicFormType>
    isBasicFormValid: boolean,
    advancedFormData: DeepPartial<AdvancedFormType>
    isAdvancedFormValid: boolean
    setForm: (form: Forms) => void
    setIsBasicFormValid: (state: boolean) => void,
    setIsAdvancedFormValid: (state: boolean) => void,
    setBasicFormData: (data: Partial<BasicFormType>) => void
    setAdvancedFormData: (data: DeepPartial<AdvancedFormType>) => void
    resetStoreValues: () => void
}

export const useOptionsFormStore = create<OptionsFormStore>((set) => ({
    form: 'basic',
    isAdvancedFormValid: true,
    isBasicFormValid: true,
    advancedFormData: advancedFormDefaultValues,
    basicFormData: basicFormDefaultValues,
    setBasicFormData: (data) => set({ basicFormData: data }),
    setAdvancedFormData: (data) => set({ advancedFormData: data }),
    setForm: (form) => set({ form: form }),
    setIsAdvancedFormValid: (state) => set({ isAdvancedFormValid: state }),
    setIsBasicFormValid: (state) => set({ isBasicFormValid: state }),
    resetStoreValues: () => set({
        form: 'basic',
        advancedFormData: advancedFormDefaultValues,
        basicFormData: basicFormDefaultValues
    })
}))