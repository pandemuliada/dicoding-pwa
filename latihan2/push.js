var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BOa7CXZa6dIUvw6lcNkOi_FbMIDU9UoN6mmZtjUY2F1_4dIP_nPzAb6_qygqB8ZBPiHsnXv8Y7Z3WHqPpUb3iio",
   "privateKey": "Z1vTfgxoYVaaOW3nK8RHt4lZTv9uoi-Fqtkkf2DmH48"
};
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dSE7xvKeT-Y:APA91bGH1mE_8NY4-5TCr-PZXdAQhqz__nQgmxI4hKz4QJoE0uqbmJmaRVtkiOi5LWBsa13zfK_nz6cSULjbJJETt0ZdjkwyJBZ1cvu-rRm6BsWeqwgbvJvG0EoC5hYZS_a4aTiCKvF_",
   "keys": {
      "p256dh": "BIpQSCrmQzXWuPPFs0+W4DvU3Bdkis6t5MsWyYbHKbm6Bawy8+0SFjdG8X8QnXPRda4GQWQCrz0kTgDtLQSFUo8=",
      "auth": "pZnOl955KP2W+bag6f+l/Q=="
   }
}
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '184666305488',
   TTL: 60
}

webPush.sendNotification(
   pushSubscription,
   payload,
   options
)