module RubyFeApiTools
  module Concerns
    module FeApiTools
      extend ActiveSupport::Concern

      included do
        class_attribute :feapi_timing_enabled, default: false
        def self.feapi_config options = {}
          self.feapi_timing_enabled = options[:timing_enabled] if options[:timing_enabled].nil? == false
        end
      end

      def api_wrapper
        start = Process.clock_gettime(Process::CLOCK_MONOTONIC, :millisecond) if self.feapi_timing_enabled
        begin
          status = yield || {}
          status[:status] = "success"
          status[:time_ms] = Process.clock_gettime(Process::CLOCK_MONOTONIC, :millisecond) - start if self.feapi_timing_enabled
          status
        rescue Pundit::NotAuthorizedError => err
          status = {}
          status[:status] = "error"
          status[:status_message] = "Not Authorized"
          status[:time_ms] = Process.clock_gettime(Process::CLOCK_MONOTONIC, :millisecond) - start if self.feapi_timing_enabled
          status
        rescue => err
          status = {}
          status[:status] = "error"
          status[:status_message] = err.message
          status[:time_ms] = Process.clock_gettime(Process::CLOCK_MONOTONIC, :millisecond) - start if self.feapi_timing_enabled
          skip_authorization
          status
        end
      end

      def return_obj_with_errors(object_key, obj)
        ret = { object_key=>obj.as_json }
        if obj.respond_to?(:valid?) && (!obj.valid?)
          ret[:errors] = obj.errors.map { |error| [ error.attribute, error.full_message ] }.to_h
        end
        ret
      end

    end
  end
end