const pm2 = require('pm2');

pm2.connect((err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  pm2.start({
    script: 'index.js', // Replace with your main application file
    name: 'bot',   // Give your application a name
  }, (err, apps) => {
    pm2.disconnect();
    if (err) {
      console.error(err);
    }
  });
});