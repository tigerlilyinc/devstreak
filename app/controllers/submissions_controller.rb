class SubmissionsController < ApplicationController
  def new; end

  def create
    @submission = Submission.new(params[:submission])
    @submission.save!
    render :nothing => true
  end
end

