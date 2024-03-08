/**
 * Sleep for a given number of seconds, supporting await syntax.
 * @module sleep
 */
/**
 * Sleep for a given number of seconds, supporting await syntax.
 * @example await sleep(1) // sleep for 1 second
 */
export const sleep = async (seconds: number) =>
  new Promise<void>(resolve => setTimeout(resolve, seconds * 1000))
