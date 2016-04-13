var projectNotifications = {
    socket: undefined,
    notificationsElement: undefined,
    previousNotifications: undefined,

    init: function(websocketUrl) {
        if (typeof websocketUrl === 'string' || websocketUrl instanceof String) {
            this.socket = new WebSocket(websocketUrl);
        } else {
            this.socket = new WebSocket('ws://www.localhost:8080/notifications');
        }
        this.socket.onmessage = this.getNotifications;

        return this;
    },

    getNotifications: function (notifications) {
        var parsedNotifications = JSON.parse(notifications.data);
        if (parsedNotifications !== undefined) {
            if (this.previousNotifications === undefined) {
                this.previousNotifications = parsedNotifications;
            }

            var parentElement = document.getElementById('glo2003-project-notifications');
            parentElement.innerHTML = '';
            this.previousNotifications.forEach(function (notification) {
                    parentElement.insertAdjacentHTML(
                        'afterBegin',
                        '<div class="notification-box">' +
                            '<h1 class="notification-title">' +
                                notification.title +
                            '</h1>' +

                            '<div class="notification-infos">' +
                                '<p class="notification-type">' +
                                    notification.type +
                                '</p>' +

                                '<p class="notification-reason">' +
                                    notification.reason +
                                '</p>' +
                            '</div>' +

                            '<p class="notification-repository">' +
                                notification.repository_name +
                            '</p>' +
                        '</div>'
                );
            });
        }
    }
};

projectNotifications.init('ws://glo-2003.herokuapp.com/notifications');
