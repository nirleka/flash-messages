/**
 * flashMessages
 * { message: String,
 *   style: String,
 *   seen: Boolean }
 */
flashMessages = new Mongo.Collection(null);

FlashMessages = {
    // Deprecated, use sendWarning instead. sendWarning is more consistent with Boostrap classes.
    sendAlert: function(message, options) {
        sendMessage(message, '', options);
        console.log('Deprecated, use sendWarning instead of sendAlert');
    },
    sendWarning: function(message, options) {
        sendMessage(message, 'alert-warning', options);
    },
    sendError: function(message, options) {
        sendMessage(message, 'alert-error alert-danger', options);
    },
    sendSuccess: function(message, options) {
        sendMessage(message, 'alert-success', options);
    },
    sendInfo: function(message, options) {
        sendMessage(message, 'alert-info', options);
    },
    clear: function() {
        flashMessages.remove({
            seen: true
        });
    },
    configure: function(options) {
        this.options = this.options || {};
        _.extend(this.options, options);
    },
    options: {
        autoHide: true,
        hideDelay: 5000,
        autoScroll: true
    }
};

sendMessage = function(message, style, options) {
    options = options || {};
    options.autoHide = options.autoHide === undefined ? FlashMessages.options.autoHide : options.autoHide;
    options.hideDelay = options.hideDelay || FlashMessages.options.hideDelay;

    if (typeof options.block === 'undefined') {
        options.autoScroll = true;
        FlashMessages.configure({
            autoScroll: true
        });
        flashMessages.insert({
            message: message,
            style: style,
            seen: false,
            block: "__default__",
            options: options
        });
    } else {
        var name = options.name;
        options.autoScroll = false;
        FlashMessages.configure({
            autoScroll: false
        });

        flashMessages.insert({
            message: message,
            style: style,
            seen: false,
            block: options.block,
            options: options
        });
    }
};
