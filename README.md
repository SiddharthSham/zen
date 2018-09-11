# zen

The first production-ready build of Zen, a blogging engine.
-----------------------------------------------------------
The site is a complete Progressive Web App, with a perfect score of 100 in Lighthouse's audits.

A blogging platform built, the web-app features::
--------------------------------------------------------------
  
    Featured posts section (Specify in YAML front-matter)
    Comments (powered by Disqus)
    Mailing List (powered by MailChimp)
    Google Analytics (Offline Analytics coming soon!)
    ...and more!

The service worker currently included only performs caching and error handling. Routing when offline is tricky (how many blog posts offlined is too many?) so has not been deployed for now. May be included in future updates, though rebuilding with an PWA framework would be easier.

NOTE::
------
This project is being released under the MIT License. I won't be actively developing this further, due to issues with college management. You are however, free to use this in your personal projects. I will not be held responsible for any usage of this software until explicitly mentioned by me. Good Luck. :)

Built with::
-------------

    HTML5/CSS3/JS
    Jekyll Templating Engine
    Mediumish theme by Sal
    Workbox-SW

Run local server::
------------------
    
    $ git clone https://github.com/SiddharthSham/zen.git
    $ cd zen
    $ gem install jekyll-paginate
    $ gem install jekyll-archives
    $ gem install github-pages
    $ jekyll build   
    $ jekyll serve

Contributing::
-------------

    Fork the repo
    Make your changes in the fork
    Commit your changes
    Test integrity of said changes
    Submit a pull-request
