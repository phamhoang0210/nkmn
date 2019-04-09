Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
     namespace :v01 do
       with_options only: [:index, :show, :create, :update, :destroy] do |option|
         option.resources :users
         option.resources :roles
         option.resources :sessions
       end
     end
  end
end
