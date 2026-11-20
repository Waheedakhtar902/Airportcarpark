/** Small in-memory cache with a time-to-live and a size cap (oldest entries are evicted first). */
export class TtlCache<T> {
  private readonly entries = new Map<string, { value: T; expires: number }>();

  constructor(private readonly ttlMs: number, private readonly maxEntries = 500) {}

  get(key: string): T | undefined {
    const entry = this.entries.get(key);
    if (!entry) return undefined;
    if (entry.expires <= Date.now()) {
      this.entries.delete(key);
      return undefined;
    }
    return entry.value;
  }

  set(key: string, value: T): void {
    if (this.ttlMs <= 0) return;
    this.entries.delete(key);
    this.entries.set(key, { value, expires: Date.now() + this.ttlMs });
    while (this.entries.size > this.maxEntries) {
      const oldest = this.entries.keys().next().value;
      if (oldest === undefined) break;
      this.entries.delete(oldest);
    }
  }
}

/** Sliding one-minute window that caps how many calls may be made. */
export class MinuteBudget {
  private readonly calls: number[] = [];

  constructor(private readonly perMinute: number) {}

  /** Records a call and returns true if it fits in the budget. */
  take(): boolean {
    const now = Date.now();
    while (this.calls.length && this.calls[0]! <= now - 60_000) this.calls.shift();
    if (this.calls.length >= this.perMinute) return false;
    this.calls.push(now);
    return true;
  }
}
