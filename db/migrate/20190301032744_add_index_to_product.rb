class AddIndexToProduct < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :name, :string
    add_index :products, :name
  end
end
