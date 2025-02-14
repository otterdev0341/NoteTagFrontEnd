export class Option<T> {
    private constructor(private readonly value: T | null) {}

    // Create an Option<T> from a value
    public static Some<T>(value: T): Option<T> {
        return new Option(value);
    }

    // Create an Option<T> from null (equivalent to None in Rust)
    public static None<T>(): Option<T> {
        return new Option<T>(null);
    }

    // Create an Option<T> from a nullable value
    static from<T>(value: T | null): Option<T> {
        return new Option(value);
    }

    // Check if Option contains a value
    isSome(): boolean {
        return this.value !== null;
    }

    isNone(): boolean {
        return this.value === null;
    }

    // Apply a function if value exists
    map<R>(fn: (value: T) => R): Option<R> {
        return this.isSome() ? Option.Some(fn(this.value as T)) : Option.None();
    }

    // Apply an async function if value exists
    async mapAsync<R>(fn: (value: T) => Promise<R>): Promise<Option<R>> {
        return this.isSome() ? Option.Some(await fn(this.value as T)) : Option.None();
    }

    // Return value or default
    unwrapOr(defaultValue: T): T {
        return this.isSome() ? (this.value as T) : defaultValue;
    }

    // Return value or execute a function
    unwrapOrElse(fn: () => T): T {
        return this.isSome() ? (this.value as T) : fn();
    }

    // Async: Return value or execute async function
    async unwrapOrAsync(defaultValue: Promise<T>): Promise<T> {
        return this.isSome() ? (this.value as T) : await defaultValue;
    }

    // Async: Return value or execute async function
    async unwrapOrElseAsync(fn: () => Promise<T>): Promise<T> {
        return this.isSome() ? (this.value as T) : await fn();
    }

    // Rust-like match function
    match<R>(onSome: (value: T) => R, onNone: () => R): R {
        return this.isSome() ? onSome(this.value as T) : onNone();
    }

    // Async match function
    async matchAsync<R>(onSome: (value: T) => Promise<R>, onNone: () => Promise<R>): Promise<R> {
        return this.isSome() ? await onSome(this.value as T) : await onNone();
    }
}
