# -*- encoding: utf-8 -*-
# stub: cri 2.6.1 ruby lib

Gem::Specification.new do |s|
  s.name = "cri".freeze
  s.version = "2.6.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Denis Defreyne".freeze]
  s.date = "2014-05-27"
  s.description = "Cri allows building easy-to-use commandline interfaces with support for subcommands.".freeze
  s.email = "denis.defreyne@stoneship.org".freeze
  s.extra_rdoc_files = ["LICENSE".freeze, "README.adoc".freeze, "NEWS.md".freeze]
  s.files = ["LICENSE".freeze, "NEWS.md".freeze, "README.adoc".freeze]
  s.homepage = "http://stoneship.org/software/cri/".freeze
  s.licenses = ["MIT".freeze]
  s.rdoc_options = ["--main".freeze, "README.adoc".freeze]
  s.rubygems_version = "3.0.3".freeze
  s.summary = "a library for building easy-to-use commandline tools".freeze

  s.installed_by_version = "3.0.3" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<colored>.freeze, ["~> 1.2"])
      s.add_development_dependency(%q<bundler>.freeze, ["~> 1.6"])
    else
      s.add_dependency(%q<colored>.freeze, ["~> 1.2"])
      s.add_dependency(%q<bundler>.freeze, ["~> 1.6"])
    end
  else
    s.add_dependency(%q<colored>.freeze, ["~> 1.2"])
    s.add_dependency(%q<bundler>.freeze, ["~> 1.6"])
  end
end
