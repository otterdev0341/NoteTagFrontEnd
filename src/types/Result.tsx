export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

export class ResultUtils {
    // Create a Result with success
    static Ok<T, E>(value: T): Result<T, E> {
        return { ok: true, value };
    }

    // Create a Result with error
    static Err<T, E>(error: E): Result<T, E> {
        return { ok: false, error };
    }

    // Match function (like Rust)
    static match<T, E, R>(
        result: Result<T, E>,
        onOk: (value: T) => R,
        onErr: (error: E) => R
    ): R {
        return result.ok ? onOk(result.value) : onErr(result.error);
    }

    // Async match function (like Rust)
    static async matchAsync<T, E, R>(
        result: Result<T, E>,
        onOk: (value: T) => Promise<R>,
        onErr: (error: E) => Promise<R>
    ): Promise<R> {
        return result.ok ? await onOk(result.value) : await onErr(result.error);
    }
}
