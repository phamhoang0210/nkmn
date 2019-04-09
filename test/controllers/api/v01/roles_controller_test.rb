require 'test_helper'

class Api::V01::RolesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v01_roles_index_url
    assert_response :success
  end

  test "should get show" do
    get api_v01_roles_show_url
    assert_response :success
  end

  test "should get create" do
    get api_v01_roles_create_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v01_roles_destroy_url
    assert_response :success
  end

end
