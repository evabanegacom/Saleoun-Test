Rails.application.routes.draw do
  root 'static#index'
  namespace :api do
    namespace :v1 do
      resources :users # only: %i[create index]
      # resources :students do
      #   collection {post :import}
      # end
      resources :students
      post 'login', to: 'users#login'
      get 'auto_login', to: 'users#auto_login'
    end
  end
end
