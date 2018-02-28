define([
        'jquery',
        './core',
        'ko',
    ], function ($, Core, ko) {
        'use strict';

        const removeNotification = function (notifications, id) {
            for (let i = 0; i < notifications().length; i++) {
                if (notifications()[i]._id === id) {
                    const tmpMessages = notifications();
                    tmpMessages.splice(i, 1);
                    notifications(tmpMessages);
                }
            }
        };

        return Core.extend({
            initialize: function () {
                this._super();
                this.notifications = ko.observableArray([]);
            },
            handleNewMessage: function (response) {
                const newMsg = response.newMsg;

                /**
                 * Only the owner of account should see new message
                 */
                if (this.accountId == newMsg.accountId) {
                    this.notifications.push(newMsg);

                    setTimeout(() => {
                        this.handleRemoveMsg(newMsg);
                    }, this.options.timeout);
                }


            },
            handleRemoveMsg: function (data) {
                $('#' + data._id).fadeOut(this.options.fadeOutTime, () => {
                    removeNotification(this.notifications, data._id);
                });
            }
        });
    }
);
