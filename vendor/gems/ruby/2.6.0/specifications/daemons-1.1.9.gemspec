# -*- encoding: utf-8 -*-
# stub: daemons 1.1.9 ruby lib

Gem::Specification.new do |s|
  s.name = "daemons".freeze
  s.version = "1.1.9"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Thomas Uehlinger".freeze]
  s.date = "2012-08-10"
  s.description = "Daemons provides an easy way to wrap existing ruby scripts (for example a self-written server)  to be run as a daemon and to be controlled by simple start/stop/restart commands.  You can also call blocks as daemons and control them from the parent or just daemonize the current process.  Besides this basic functionality, daemons offers many advanced features like exception  backtracing and logging (in case your ruby script crashes) and monitoring and automatic restarting of your processes if they crash.".freeze
  s.email = "th.uehlinger@gmx.ch".freeze
  s.extra_rdoc_files = ["README".freeze, "Releases".freeze, "TODO".freeze]
  s.files = ["README".freeze, "Releases".freeze, "TODO".freeze]
  s.homepage = "http://daemons.rubyforge.org".freeze
  s.rubygems_version = "3.0.3".freeze
  s.summary = "A toolkit to create and control daemons in different ways".freeze

  s.installed_by_version = "3.0.3" if s.respond_to? :installed_by_version
end
