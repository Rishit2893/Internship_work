Feature: User Create Profile
    Scenario: creating a new user
        Given the following user data:
            | email            | name      | password    |
            | test@example.com | Test User | password123 |
        When I send a POST request to "/user" with the user data
        Then the response status code should be 201 
        and the response should contain :
        """
        {
            email: "test@example.com",
            name: "Test User",
            password: "hashedPassword"
        }
        """

    Scenario: Fail to create a user when email already exists
        Given an existing user with the following data:
        | email           | name      | password  |
        | test@example.com | Test User | password123 |
        When I send a POST request to "/user" with:
        | email           | name      | password  |
        | test@example.com | Test User | password123 |
        And the response should contain:
        """
        {
            "error": "User with email already exists."
        }
        """

