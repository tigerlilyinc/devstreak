class ReplaceSubmissionVideoWithEssay < ActiveRecord::Migration
  def up
    remove_column :submissions, :video
    add_column :submissions, :essay_self, :text
    rename_column :submissions, :essay, :essay_treehouse
  end

  def down
    rename_column :submissions, :essay_treehouse, :essay
    remove_column :submissions, :essay_self
    add_column :submissions, :video, :string
  end
end

