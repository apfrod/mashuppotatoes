#!/usr/bin/env python
#
import cgi

from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
import pusher

try:
  import config
except ImportError:
  raise Exception("refer to the README on creating a config.py file")

class TriggerHandler(webapp.RequestHandler):
    def get(self):
	    
	    p = pusher.Pusher(app_id=config.app_id, key=config.app_key, secret=config.app_secret)

	    p['mp_game_global'].trigger('mp:game_waiting',{'msg': 'Waiting for players to join'})
	    self.response.out.write('Event sent');
	    
    def post(self):
	    p = pusher.Pusher(app_id=config.app_id, key=config.app_key, secret=config.app_secret)
	    
	    success = False
	    event = cgi.escape(self.request.get('event'))
	    if event is not None:
	      if event == '0':
		p['mp_game_global'].trigger('mp:game_waiting',{'msg': 'Waiting for players to join'})
		success = True
		
	    if success:
	      self.response.out.write('<html><body>You sent event:<pre>')
	      self.response.out.write(event)
	      self.response.out.write('</pre></body></html>')
	    
	    
	    

def main():
    application = webapp.WSGIApplication([('/trigger', TriggerHandler)],
                                         debug=True)
    util.run_wsgi_app(application)


if __name__ == '__main__':
    main()
