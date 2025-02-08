export function validateUsername(username: string): boolean {
    if (username.length < 8) {
      return false;
    }
    return true;
  }