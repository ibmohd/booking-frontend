import {create} from 'zustand'

enum STEPS {
    PROFESSIONAL = 0,
    SERVICES = 1,
    TIME = 2,
    RESERVE = 3
}

type Props = {
    step: STEPS;
    next: () => void;
    previous: () => void;
    reset: () => void;
    set: (value: number) => void;
}

const useStepState = create<Props>((set) => ({
    step: STEPS.PROFESSIONAL,
    next: () => set((state) => ({step: state.step + 1})),
    previous: () => set((state) => ({step: state.step - 1})),
    reset: () => set({step:0}),
    set: (value:number) => set({step:value})
}))

export default useStepState