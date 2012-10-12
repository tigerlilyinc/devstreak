Devstreak::Application.routes.draw do
  resources :submissions, :only => [:new, :create]

  match '/details' => 'home#details'
  match '/team' => 'home#team'
  match '/contact' => 'home#contact'
  match '/apply' => 'submissions#new'

  match '/participate' => 'home#participate'

  match '/parallax' => 'home#parallax'

  root :to => 'home#index'
end

