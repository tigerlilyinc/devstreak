Devstreak::Application.routes.draw do
  match '/details' => 'home#details'
  match '/team' => 'home#team'
  match '/contact' => 'home#contact'
  match '/apply' => 'home#apply'

  root :to => 'home#index'
end

