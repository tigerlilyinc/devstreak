module ApplicationHelper
  def body_class
    classes = [*controller.controller_path.split('/'),
               controller.controller_name,
               controller.action_name]
    classes.uniq.compact.join(' ')
  end
end

