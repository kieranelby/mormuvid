Ember.Application.initializer({
  name: "listenForNotifications",
  initialize: function(container, application) {
    var woof = container.lookup('woof:main');
    var ws_notification_url = "ws://" + location.host + "/notifications";
    var ws = new ReconnectingWebSocket(ws_notification_url);
    var sendPing = function() {
      ws.send("ping");
    }
    ws.onopen = function() {
      sendPing();
    };
    ws.onmessage = function (evt) {
        console.log(evt.data);
        msgObj = JSON.parse(evt.data);
        if ('notification' in msgObj) {
          var notification = msgObj.notification;
          woof.info(notification);
        }
    };
    window.setInterval(sendPing, 15 * 1000);
  }
});
