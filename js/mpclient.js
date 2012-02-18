// Copyright 2012 Mashup Potatoes

var MPClient = new Class({
    
    name: 'MPClient',
    applicationKey: PUSHER_APP_KEY,
    options: {},
    channelName: PUSHER_GLOBAL_GAME_CHANNEL,
    
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
        
        var that = this;
        this.pusher.connection.bind('connected', function() {
            console.log(that.name + ": pusher connected");
            that.register();
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
        var channel = this.pusher.subscribe(this.channelName);
        if (channel)
        {
            console.log(this.name + ': Connected to channel: ' + this.channelName);
            
            var events = {
                'mp:game_start': function () {
                    console.log('mp:game_start');
                },
                'mp:game_end': function () {
                    console.log('mp:game_end');
                },
                'mp:game_waiting': function () {
                    console.log('mp:game_waiting');
                },
                'pusher:subscription_succeeded': function () {
                    console.log('pusher:subscription_succeeded');
                },
                'pusher:member_removed': function () {
                    console.log('pusher:member_removed');
                }
            };
            for (var e in events)
            {
                if (events.hasOwnProperty(e))
                {
                    console.log(this.name + ': bind: ' + e);
                    channel.bind(e, events[e]);
                }
            }
            
            return true;
        }
        else
        {
            console.log(this.name + ': Channel failed to connect');
        }
        return false;
    },
    
    send: function sendFn(event, args)
    {
        var sendReq = new Request({url: PUSHER_TRIGGER_URL});
        
        if (event == 'ready')
        {
            sendReq.post('event=0');
            return true;
        }
        
        if (event == 'matched')
        {
            sendReq.post('event=1');
            return true;
        }
        
        return false;
    },
    
    receive: function receiveFn(fn)
    {
        //Register for callback  
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

