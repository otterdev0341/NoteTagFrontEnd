export function isValidUsername(username: string): boolean {
  // must be 8-15 characters long
  // can contain letter, numbers, underscores, and dashes
  // must start with a letter
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{8,14}$/;
  
  return usernameRegex.test(username);
}

export function isValidPassword(password: string): boolean {
  // must be 8-15 characters long
  // must contain at least one number
  // must contain at least one uppercase letter
  // must contain at least one lowercase letter
  // must contain at least one special character
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/;
  
  return passwordRegex.test(password);
}

export function isFirsttNameLastName(context: string): boolean {
  // must be 2-15 characters long
  // must contain only letters
  const firstNameRegex = /^[a-zA-Z]{2,15}$/;

  return firstNameRegex.test(context);
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+(?:\.[a-zA-Z0-9._%+-]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  return emailRegex.test(email);
}

export function isGenderValid(gender: string, genderList: string[]): boolean {
  return genderList.includes(gender);
}