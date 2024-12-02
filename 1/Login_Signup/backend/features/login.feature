Feature: User Login
  Scenario: Successful login
    Given a user exists with email "user@example.com" and password "password123"
    When the user logs in with email "user@example.com" and password "password123"
    Then the login should be successful
