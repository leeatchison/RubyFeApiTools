# frozen_string_literal: true

require 'active_support'
require 'active_record'
require 'active_support/concern'
require "ruby_fe_api_tools/version"
require "ruby_fe_api_tools/concerns/fe_api_tools"

module RubyFeApiTools
  class Error < StandardError; end
end
