import { AuthOptions, CallbacksOptions } from "next-auth"

export type GetServerSessionOptions = Partial<Omit<AuthOptions, "callbacks">> & {
    callbacks?: Omit<AuthOptions["callbacks"], "session"> & {
        session?: (...args: Parameters<CallbacksOptions["session"]>) => any
    }
}