/**
 * Object in charge of receiving post messages.
 * @class PostMessage.Subscriber
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.postMessage
 */

// Initialize the namespace
var PostMessage = PostMessage || {};

PostMessage = (function(namespace) {

    /**
     * @constructor
     */
    var Subscriber = function() {
        this._initialized = false;
        this._listeners = [];
        this._validOrigins = [];
    };

    /**
     * @param {String} origin
     * @method addOriginToWhitelist
     * @public
     */
    Subscriber.prototype.addOriginToWhitelist = function(origin) {
        this._validOrigins.push(origin);
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
     * Checks message against the whitelist of valid messages sources.
     *
     * @param {String} origin
     * @return {Boolean}
     * @method _hasValidOrigin
     * @private
     */
    Subscriber.prototype._hasValidOrigin = function(origin) {
        return (this._validOrigins.length === 0 ||
            this._validOrigins.indexOf(origin) > -1);
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
        if (this._hasValidOrigin(messageData.origin)) {
            for (var i = 0; i < this._listeners.length; i++) {
                if (typeof this._listeners[i] === 'function') {
                    this._listeners[i](messageData.data);
                }
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
