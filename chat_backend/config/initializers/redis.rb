require 'redis'

## Added rescue condition if Redis connection is failed
begin
  $redis = Redis.new(:host => Rails.configuration.redis_host, :port => 6379) 
rescue Exception => e
  puts e
end
