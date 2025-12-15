// Quick script to generate bcrypt hash for admin password
// Run: node generate-hash.js

const bcrypt = require("bcryptjs");

async function generateHash() {
	const password = "admin123";
	const hash = await bcrypt.hash(password, 10);

	console.log("\n========================================");
	console.log("PASSWORD HASH GENERATED");
	console.log("========================================");
	console.log("Password:", password);
	console.log("Hash:", hash);
	console.log("\nCopy this SQL and run in Supabase:");
	console.log("========================================\n");
	console.log(`DELETE FROM users WHERE email = 'admin@chh.com';

INSERT INTO users (email, name, password, role)
VALUES (
  'admin@chh.com',
  'Admin User',
  '${hash}',
  'superadmin'
);

SELECT * FROM users WHERE email = 'admin@chh.com';`);
	console.log("\n========================================\n");
}

generateHash();
