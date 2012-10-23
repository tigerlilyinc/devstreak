class AddDiscountCodeToSubmission < ActiveRecord::Migration
  def up
    add_column :submissions, :discount_code, :text
  end

  def down
    remove_column :submissions, :discount_code
  end
end
