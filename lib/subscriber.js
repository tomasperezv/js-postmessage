/**
 * Object in charge of receiving post messages.
 * @class PostMessage.Subscriber
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.postMessage
 */

// Initialize the namespace
var PostMessage = PostMessage || {};

PostMessage = (function(namespace) {

    var Subscriber = function() {
        this._initialized = false;
        this._listeners = [];
    };

    /**
     * @method _listenForMessages
     * @private
     */
    Subscriber.prototype._listenForMessages = function() {
        if (!this._initialized) {
            window.addEventListener('message', this._onMessage, false);
            this._initialized = true;
        }
    };

    /**
     * A message has been received from window.onMessage event,
     * we will iterate over the list of listeners and send the
     * data after applying some security filters.
     *
     * @method _onMessage
     * @private
     */
    Subscriber.prototype._onMessage = function() {
        for (var i = 0; i < this._listeners; i++) {
            if (typeof this._listeners === 'function') {
                this._listeners();
            }
        }
    };

    /**
     * @param {Object} messageData
     * @method attach
     * @public
     */
    Subscriber.prototype.attach = function(messageData) {

        // Lazy load initialization for the post messages listener
        if (this._listeners.length === 0) {
            this._listenForMessages();
        }

    };

    // Only one instance of PostMessage is allowed
    namespace.Subscriber = new Subscriber();

    return namespace;

})(PostMessage || {});
