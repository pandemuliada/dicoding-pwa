var webPush = require('web-push')
 
const vapidKeys = {
   "publicKey": "BCAaufkVbpiXRcCj2dko4_wLO4V7cANgdlPUglHJmwfEl6VqU2M8lu4vkEKtl3xjZYbjeSf8nneckXeNv0hOTnw",
   "privateKey": "SewMHyDciW0nSqWQAhypZGkE7Z9NLG9KNB742BHEkms"
}
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eCArnM9B9Qs:APA91bFl6ioumZ0JJD8uOQoGKJwSTKRwaLdue1PwXr1goiZ0WC8TzMKeei62yJTuWW7F94TMRbaeZUGbTTzp53VJ0nxQ183AO1WQmcS5eT_tPdEbN_Ee1AlRJqyzrPXawYWC4f1VG_jL",
   "keys": {
      "p256dh": "BG0OZiFYORmVxIeMST67YIvI6fx1gCfmoNDpnvn0Z6SxYTgOQmnw8ut5Yk7cd1X9YbsqCdUWUSXFv/wbYOPzZEE=",
      "auth": "5AitTFp9b+JJFv7YECipHQ=="
   }
}
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!'
 
var options = {
   gcmAPIKey: '1064086746363',
   TTL: 60
}

webPush.sendNotification(
   pushSubscription,
   payload,
   options
)