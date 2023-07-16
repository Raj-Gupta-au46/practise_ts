import crypto from "crypto";

// generate slug name
function generateSlugName(name: string): string {
  let randomNumber = Math.floor(Math.random() * 9000) + 1000;
  let slug = name.replace(/\s+/g, "_") + "_" + randomNumber;
  return slug.toLowerCase();
}

// generate token
function generateVerificationToken(): {
  token: string;
  verifyToken: string;
} {
  const token = crypto.randomBytes(20).toString("hex");
  const verifyToken = crypto.createHash("sha256").update(token).digest("hex");
  return { token, verifyToken };
}

// verify token
function tokenVerify(token: string): string {
  const verifyToken = crypto.createHash("sha256").update(token).digest("hex");
  return verifyToken;
}

export { generateSlugName, generateVerificationToken, tokenVerify };
