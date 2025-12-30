/**
 * Generates a random alphanumeric string to be used as a referral code.
 */
export const generateReferralCode = () => {
  // Generates a random string, converts it to base 36 (letters+numbers),
  // and takes a substring of 8 characters.
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};
