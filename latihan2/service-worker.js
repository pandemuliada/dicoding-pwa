self.addEventListener('notificationclick', function(event) {
  // Menutup notifikasi setelah di klik
  event.notification.close();
  if (!event.action) {
    console.log('Notification Click.');
    return;
  }

  switch (event.action) {
    case 'yes-action':
      console.log('Pengguna memilih action yes.');
      // buka tab baru
      clients.openWindow('https://google.com');
      break;
    case 'no-action':
      console.log('Pengguna memilih action no');
      break;
    default:
      console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
      break;
  }
})


// Mengaktifkan Fitur Push Notification
self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text() 
  } else {
    body = 'Push message kosong!'
  }

  var options = {
    body: body,
    icon: '/icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  }

  event.waitUntil(self.registration.showNotification('Push notification', options))
})