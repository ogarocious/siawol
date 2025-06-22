class PagesController < ApplicationController
  def home
    render inertia: 'Home'
  end

  def movies
    render inertia: 'Movies'
  end

  def movies_test
    render inertia: 'MoviesTest'
  end 
end
