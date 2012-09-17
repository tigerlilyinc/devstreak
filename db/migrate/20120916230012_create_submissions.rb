class CreateSubmissions < ActiveRecord::Migration
  def up
    create_table :submissions do |t|
      t.string  :name
      t.string  :email
      t.string  :video
      t.text    :essay
    end
  end

  def down
    drop_table :submissions
  end
end

