const bcrypt = require('bcrypt');

const password = 'samrat2324$';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error('Error generating hash:', err);
        process.exit(1);
    }

    console.log('\n========================================');
    console.log('BCRYPT HASH FOR PASSWORD: samrat2324$');
    console.log('========================================');
    console.log(hash);
    console.log('========================================');
    console.log('\nCopy the hash above and paste it into:');
    console.log('backend/.env as ADMIN_PW_HASH=<hash>');
    console.log('========================================\n');

    process.exit(0);
});
