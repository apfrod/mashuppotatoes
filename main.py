#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import os

from google.appengine.ext import webapp
from google.appengine.ext.webapp import util, template



class MainHandler(webapp.RequestHandler):
    def get(self):
        template_values = {
        }
        
        path = os.path.join(os.path.dirname(__file__), 'app.html')
        self.response.out.write(template.render(path, template_values))
        #self.response.out.write('<!DOCTYPE html><head><title>Pusher Test</title><script src="http://js.pusher.com/1.11/pusher.min.js" type="text/javascript"></script><script type="text/javascript">' \
        #    'Pusher.log = function(message) {if (window.console && window.console.log) window.console.log(message);};WEB_SOCKET_DEBUG = true;var pusher = new Pusher("db86cd103d83f97e5a29");var channel = pusher.subscribe("test_channel");channel.bind("my_event", function(data) {alert(data);});</script></head>')


def main():
    application = webapp.WSGIApplication([('/', MainHandler)],
                                         debug=True)
    util.run_wsgi_app(application)


if __name__ == '__main__':
    main()
