js-postmessage
==============

Wrapper for window.postMessage functionality

```javascript
PostMessage.Subscriber.attach(function(messageData) {
    console.log(messageData);
});

PostMessage.Subscriber.addOriginToWhitelist('http://localhost.tld');

PostMessage.Publisher.send({property1: 'content'});
```
