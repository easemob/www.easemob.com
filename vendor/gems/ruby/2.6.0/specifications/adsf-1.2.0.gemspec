# -*- encoding: utf-8 -*-
# stub: adsf 1.2.0 ruby lib

Gem::Specification.new do |s|
  s.name = "adsf".freeze
  s.version = "1.2.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Denis Defreyne".freeze]
  s.date = "2013-11-29"
  s.description = "A web server that can be spawned in any directory".freeze
  s.email = "denis.defreyne@stoneship.org".freeze
  s.executables = ["adsf".freeze]
  s.files = ["bin/adsf".freeze]
  s.homepage = "http://github.com/ddfreyne/adsf/".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 1.8.5".freeze)
  s.rubygems_version = "3.0.3".freeze
  s.summary = "a tiny static file server".freeze

  s.installed_by_version = "3.0.3" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<rack>.freeze, [">= 1.0.0"])
    else
      s.add_dependency(%q<rack>.freeze, [">= 1.0.0"])
    end
  else
    s.add_dependency(%q<rack>.freeze, [">= 1.0.0"])
  end
end
