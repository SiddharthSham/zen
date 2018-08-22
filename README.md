# zen

The first production-ready build of Zen, a blogging engine.
-----------------------------------------------------------
The site is a complete Progressive Web App, with a perfect score of 100 in Lighthouse's audits.

A blogging platform built for Amritians, the web-app features::
--------------------------------------------------------------
  
    Featured posts section (Specify in YAML front-matter)
    Comments (powered by Disqus)
    Mailing List (powered by MailChimp)
    Google Analytics (Offline Analytics coming soon!)
    ...and more!

The service worker currently included only performs caching and error handling. Routing when offline is tricky (how many blog posts offlined is too many?) so has not been deployed for now. May be included in future updates, though rebuilding with an PWA framework would be easier.

Built with::
-------------

    HTML5/CSS3/JS
    Jekyll Templating Engine
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
