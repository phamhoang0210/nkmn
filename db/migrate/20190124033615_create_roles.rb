class CreateRoles < ActiveRecord::Migration[5.2]
  def change
    create_table :roles do |t|
      t.string :name, limit:80
      t.string :title
      t.string :description
      t.timestamps
    end
  end
end
