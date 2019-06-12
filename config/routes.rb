Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "application#index"
  #auth
  namespace :api, defaults: {format: :json} do
     namespace :v01 do
       with_options only: [:index, :show, :create, :update, :destroy] do |option|
         option.resources :users
         option.resources :roles
         option.resources :sessions
       end
     end
  end
  #admincp
  namespace :admincp do
    root to: "auth/signin#index"
      with_options only: [:index, :show, :create, :update, :destroy] do |option|
        get 'sign_in', to: 'auth/signin#index'
        get 'sign_out', to: 'auth/signout#index'
        option.resources :users
      end
  end
end
