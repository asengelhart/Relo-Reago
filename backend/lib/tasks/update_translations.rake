namespace :db do
  desc "Add new translations from Reta Vortaro"

  task :update_translations do
    Translation.load_from_package()
  end
end