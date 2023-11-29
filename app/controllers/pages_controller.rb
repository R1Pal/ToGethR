class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home]

  def home
    set_user
    set_couple
    set_partner
  end

  def score
    home
    @user_mood = mood_summary(@user)
    @partner_mood = mood_summary(@partner)
    @task_split = "TO DO"
    @reward_split = "TO DO"
    # raise
  end

  private

#------------ 1. set user, partner, couple------------------------------------

  def set_user
    @user = current_user
  end

  def set_couple
    @couple = current_user.couple
  end

  def set_partner
    set_couple
    @partner = (@couple.users - [current_user])[0]
  end

  #------------ 2. Set variables for score--------------------------------------

  def mood_summary(user)
    opening_date = (Date.today - 7).to_time
    status_scope = user.statues.all.where('created_at > ?', opening_date)
    statuses_duration = {"stormy"=>0, "rainy"=>0, "cloudy"=>0, "sunny"=>0}
    cumul_duration = 0
    status_scope.each do |status|
      mood = status.mood_category.title
      start_date = [status.created_at, opening_date].max
      end_date = status.end_date == nil ? Time.now : status.end_date
      mood_duration = end_date - start_date
      cumul_duration =+ mood_duration
      statuses_duration[mood] = statuses_duration[mood]&. + mood_duration
    end
    return [statuses_duration, cumul_duration]
  end

  def couple_task_split
    "hello"
  end

  def couple_reward_split
    "hello"
  end

end
