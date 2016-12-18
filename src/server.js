var Imap = require('imap');
var config = require('config');
var blink = require('gpio-misc').blink;

// Create an IMAP object
var imap = new Imap({
  user: config.get('auth.email'),
  password: config.get('auth.password'),

  host: config.get('imap.host'),
  port: config.get('imap.port'),
  tls: config.get('imap.tls'),
});

// Open your Inbox
imap.once('ready', () => {
  imap.openBox('INBOX', true, () => {
    console.log(`successfully connected to ${config.get('auth.email')}`);
  });
});

// Display errors
imap.once('error', err => {
  console.error(`error: ${err.textCode}`);
});

// On new mail blink
imap.on('mail', () => {
  // Blink on GPIO24, 42 time
  blink(24,42);
})

imap.connect();
