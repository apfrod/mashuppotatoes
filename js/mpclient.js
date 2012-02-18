// Copyright 2012 Mashup Potatoes

var MPClient = new Class({
    
    name: 'MPClient',
    applicationKey: PUSHER_APP_KEY,
    options: {},
    
    states:
    {
        connected: "connected"
    },
    
    initialize: function initializeFn(params)
    {
        console.log(this.name + " init");
        this.pusher = new Pusher(this.applicationKey, this.options);
        if (!this.pusher)
        {
            console.log(this.name + ": pusher init failed");
            return false;
        }
        
        this.pusher.connection.bind('connected', function() {
            console.log(this.name + ": pusher connected");
          });
        
        return true;
    },
    
    isConnected: function isConnectedFn()
    {
        if (this.pusher && this.pusher.connection)
        {
            var state = this.pusher.connection.state;
            if (state === this.states.connected)
            {
                return true;
            }
        }
        return false;
    },
    
    register: function registerFn()
    {
        
    },
    
    disconnect: function disconnectFn()
    {
        console.log(this.name + " disconnect");
        if (this.pusher)
        {
            this.pusher.disconnect();
        }
    }
});

