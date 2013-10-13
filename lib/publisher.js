/**
 * Object in charge of sending post messages.
 * @class PostMessage.Publisher
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.postMessage
 */

// Initialize the namespace
var PostMessage = PostMessage || {};

var PostMessage = (function(namespace) {

    /**
     * @constructor
     */
    var Publisher = function() {
    };

    /**
     * @method send
     * @param {Object} messageData
     * @param {undefined|DOMElement} target
     * @param {undefined|Object} targetOrigin
     * @public
     */
    Publisher.prototype.send = function(messageData, target, targetOrigin) {

        if (typeof target === 'undefined') {
            target = window;
        }

        // It's recommended to always specify targetOrigin if you know where
        // the target's document should be located
        if (typeof targetOrigin === 'undefined') {
            targetOrigin = '*';
        }

        target.postMessage(messageData, targetOrigin);

    };

    // Only one instance is allowed
    namespace.Publisher = new Publisher();

    return namespace;

})(PostMessage || {});
