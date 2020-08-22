require 'open-uri'
require 'json'
require 'zip'
require 'tempfile'

class Downloader
  # Extracts the latest full DB from Reta Vortaro (appx. 25 MB as of 2020-8-21), extracts it from its ZIP, then
  # passes it to block.  Should primarily be used to update the local DB, since there's a fair amount of 
  # extra data here not included in the app.  Also, should only be run daily in production.
  def self.get_package
    # get list of assets, find most recent release, copy sql_inx file url
    url = "https://api.github.com/repos/revuloj/revo-fonto/releases"
    list_headers = {
      "User-Agent" => "Relo-Reago",
      "Accept" => "application/vnd.github.v3+json"
    }

    releases = JSON.parse(URI.open(url, list_headers).read)
    select_sql_inx = 4
    recent_zip_url = releases[0]["assets"][select_sql_inx]["url"]

    # downlaod and extract the zip file
    download_headers = list_headers.merge({"Accept" => "application/octet-stream"})
    zip_stream = URI.open(recent_zip_url, download_headers)
    Zip::File.open_buffer(zip_stream) do |zip_file|
      puts zip_file
      zip_file.each do |entry|
        if entry.name == "revo.db"
          tempfile = Tempfile.create do |f|
            f << entry
            yield f
          end
        end
      end
    end

  end

end