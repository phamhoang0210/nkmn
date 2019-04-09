class RemoveNameFromProduct < ActiveRecord::Migration[5.2]
  def change
    remove_index :products, :name
    remove_column :products, :name, :string
  end
end
