require 'mina/bundler'
require 'mina/git'

set :domain, '10.0.3.52' # TODO: remove hardcoded IP
set :deploy_to, '/opt/app/katuma-web'
set :repository, 'https://github.com/coopdevs/katuma-web.git'
set :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }

# Manually create these paths in shared/ (eg: shared/config/database.yml) in your server.
# They will be linked in the 'deploy:link_shared_paths' step.
set :shared_paths, ['log']

# SSH settings:
set :user, 'katuma'
set :forward_agent, true

# This task is the environment that is loaded for most commands, such as
# `mina deploy` or `mina rake`.
task :environment do
  queue '. /etc/default/katuma'
end

desc "Deploys the current version to the server."
task :deploy => :environment do
  to :before_hook do
    # Put things to run locally before ssh
  end
  deploy do
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    queue 'npm install'
    queue 'npm run build'
    invoke :'deploy:cleanup'

    to :launch do
      # Start or re-start express_katuma init.d script
    end
  end
end
