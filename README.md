## What is this project?
Front end code of katuma.org

## Participate!
Want to know more and participate? Please visit http://community.coopdevs.org

## DEBUG Node

Put `debugger` in the server code you want to debug and then run this on a Terminal.

```
./node_modules/node-inspector/bin/node-debug.js --debug-port=5999
```

---

## Development on Mac OS X

### Via Vagrant

    $ cd ~/Sites/coopdevs/katuma-provisioning
    $ vagrant up

#### Backend (Ruby on Rails)

    $ vagrant ssh
    $ cd katuma/
    $ bundle exec rails s --binding 0.0.0.0
    $ localhost:3000

#### Frontend (Node JS)

    $ vagrant ssh
    $ cd katuma-web/
    $ npm run dev
    $ localhost:8000

---

### Via Local "a pelo"

    $ cd ~/Sites/coopdevs/
    $ mkdir katuma
    $ cd katuma/
    $ git clone https://github.com/coopdevs/katuma.git api
    $ git clone https://github.com/coopdevs/katuma-web.git web

#### Backend (Ruby on Rails)

    $ cd ~/Sites/coopdevs/katuma/api
    $ bundle exec rails s
    $ localhost:3000

#### Frontend (Node JS)

    $ cd ~/Sites/coopdevs/katuma/web
    $ nvm use 4.5
    $ npm run dev
    $ localhost:8000

---

### Dependencies

#### PostgreSQL

    $ brew update
    $ brew doctor
    $ brew install postgresql
    $ initdb /usr/local/var/postgres -E utf8
    $ gem install lunchy
    $ mkdir -p ~/Library/LaunchAgents
    $ cp /usr/local/Cellar/postgresql/9.2.1/homebrew.mxcl.postgresql.plist ~/Library/LaunchAgents/

    $ lunchy start postgres
    $ lunchy stop postgres

More info: https://www.moncefbelyamani.com/how-to-install-postgresql-on-a-mac-with-homebrew-and-lunchy/

#### Redis

    $ brew install redis
    $ brew services start redis
