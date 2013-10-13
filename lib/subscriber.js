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
            window.addEventListener('message', this._onMessage.bind(this), false);
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
    Subscriber.prototype._onMessage = function(messageData) {
        for (var i = 0; i < this._listeners.length; i++) {
            if (typeof this._listeners[i] === 'function') {
                this._listeners[i](messageData.data);
            }
        }
    };

    /**
     * @param {Function} callback
     * @method attach
     * @public
     */
    Subscriber.prototype.attach = function(callback) {

        // Lazy load initialization for the post messages listener
        if (this._listeners.length === 0) {
            this._listenForMessages();
        }

        if (typeof callback === 'function') {
            this._listeners.push(callback);
        }

    };

    // Only one instance of PostMessage is allowed
    namespace.Subscriber = new Subscriber();

    return namespace;

})(PostMessage || {});
